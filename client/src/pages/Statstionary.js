import { useEffect,useState } from "react"
import { AutoComplete, Flex, Table, Typography, Row, Col, Button, Form, Select, InputNumber, Collapse } from "antd"
import { useForm } from "antd/es/form/Form"
import ResultsModal from "../components/statstionary/ResultsModal"
import { TEAM_ABBR_TO_TEAM } from "../utils/constants"
import "./Statstionary.css"
import seedrandom from 'seedrandom'
import useMessage from "antd/es/message/useMessage"
const allTeams = ['All teams', 'Atlanta Hawks', 'Boston Celtics', 'Cleveland Cavaliers', 'New Orleans Pelicans', 'Chicago Bulls', 'Dallas Mavericks', 'Denver Nuggets', 'Golden State Warriors', 'Houston Rockets', 'Los Angeles Clippers', 'Los Angeles Lakers', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'Brooklyn Nets', 'New York Knicks', 'Orlando Magic', 'Indiana Pacers', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Oklahoma City Thunder', 'Toronto Raptors', 'Utah Jazz', 'Memphis Grizzlies', 'Washington Wizards', 'Detroit Pistons', 'New Jersey Nets', 'Charlotte Hornets']

const Home = () => {
  const [form] = useForm()
  const [mode, setMode] = useState('DAILY_CHALLENGE')
  const [tries, setTries] = useState(2)
  const [player, setPlayer] = useState('')
  const [playerData, setPlayerData] = useState([])
  const [options, setOptions] = useState([])
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [answer, setAnswer] = useState()
  const [showModal, setShowModal] = useState(false)
  const [message, contextHolder] =useMessage()
  const [autocomplete, setAutocomplete] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (data.length) return
      const res = await fetch('./data.json', { headers: { 'ContentType': 'application/json' }})
      if (res.status === 200) {
        const json = await res.json()
        setData(json)
      }
    }

    const setChallenge = async () => {
      if (player) return
      const res = await fetch('./challenges.json', { headers: { 'ContentType': 'application/json' }})
      if (res.status === 200) {
        const challenges = await res.json()
        const seed = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', })
        const rng = seedrandom(seed)
        const idx = Math.floor(rng() * Object.keys(challenges).length)
        const player = Object.keys(challenges)[idx]
        const playerData = Object.values(challenges)[idx].map((_, i) => ({ ..._, key: i }))
        setPlayer(player)
        const columns = [ 
          { title: 'Season', dataIndex: 'Season', key: 'Season', width: 20, fixed: 'left' },
          ...Object.keys(playerData[0]).filter(k => k !== 'Season' && k !== 'key')
            .map(k => ({ title: k, dataIndex: k, key: k, width: 10 }))
        ]
        setPlayerData(playerData)
        setColumns(columns)
      }
    }
    fetchData()
    setChallenge()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  
  const handleSearch = (searchText) => {
    if (!searchText) {
      setOptions([])
      return
    }
    setOptions(Object.keys(data).filter(p => p.toLowerCase().includes(searchText.toLowerCase())).map(value => ({ value })))
  }


  const handleFilter = async () => {
    let { teams, from, to } = form.getFieldsValue()

    if (!from) from = 2000
    if (!to) to = 2024
    if (!teams || !teams.length) teams = ['All teams']

    const teamAbbrs = teams && teams.length && !teams.includes('All teams') ? teams.map(t => TEAM_ABBR_TO_TEAM[t]) : allTeams.map(t => TEAM_ABBR_TO_TEAM[t])
    const filteredData = {}
    Object.entries(data).forEach((value) => {
      const [name, stats] = value
      const teamValid = stats.some(s => teamAbbrs.includes(s['Tm']))
      const yearsValid = stats.some(s => {
        const start = parseInt(s['Season'].slice(0, 4))        
        return start >= from && start <= to
      })
      if (teamValid && yearsValid) {
        filteredData[name] = stats
      }
    })
    if (!Object.keys(filteredData).length) {
      await message.error('Invalid parameters! No players with criteria found.')
      return
    }
    let randomPlayer, playerData
    randomPlayer = Object.keys(filteredData)[Math.floor(Math.random()*Object.keys(filteredData).length)]
    playerData = filteredData[randomPlayer].map((obj, key) => ({ key, ...obj }))
    setPlayer(randomPlayer)
    setPlayerData(playerData)
    setMode('CUSTOM')
  }

  const onCloseModal = () => {
    setShowModal(false)
    handleFilter()
    setAnswer()
    setAutocomplete('')
    setTries(2)
  }

  const FilterForm = () => (
    <Form form={form}>
      <Form.Item name="teams" className="mb-3" label="Teams">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '200px'}}
          placeholder="Enter team name"
          options={allTeams.map(t => ({ value: t, label: t}))}
        />
      </Form.Item>
      <Row align={"middle"}>
        <Form.Item name="from" className="mx-1" label="From">
          <InputNumber min={2000} max={new Date().getFullYear()} width={100} />
        </Form.Item>
        <Form.Item name="to" className="mx-1" label="To">
          <InputNumber min={2000} max={new Date().getFullYear()} width={100} />
        </Form.Item>
      </Row>
      <Flex justify="center"><Button type="primary" onClick={handleFilter}>Filter</Button></Flex>
    </Form>
  )
  return (
    <div>
      {contextHolder}
      <Flex align="center" justify="center" className="mt-1 mx-3">
        <Typography.Title level={5} className="text-white">Can you guess the player based on their stats?</Typography.Title>
      </Flex>
      <Row justify="center" align="middle">
        <Col xs={{ span: 5, offset: 1 }} md={{ span: 6 }}>
        {mode === 'DAILY_CHALLENGE' ?
          <Flex align="center" justify="center" className="mb-1">
            <Typography.Text className="text-white">Solve daily challenge or</Typography.Text>
          </Flex>
          :
          <Flex align="center" justify="center" className="mb-1">
            <Typography.Text className="text-white">Refresh to go to daily challenge or</Typography.Text>
          </Flex>
        }
        </Col>
        <Col xs={{ span: 15 }} md={{ span: 6 }}>
          <Collapse 
            items={[{ key: 1, label: 'Create Custom Game', children: <FilterForm />}]} 
            onChange={(arr) => { arr.length && form.setFieldsValue({ to: new Date().getFullYear(), from: 2000, teams: 'All teams' })        }} 
            className="ml-3" 
            />
        </Col>
      </Row>
      <ResultsModal showModal={showModal} onClose={onCloseModal} guess={answer} answer={player} />
      <Flex align="center" justify="center" className="my-5">
        <AutoComplete value={autocomplete} onChange={v => setAutocomplete(v)} onSelect={p => setAnswer(p)} onSearch={handleSearch} options={options} className="w-1/2" />
      </Flex>
      <Flex align="center" justify="center" className="my-3">
        <Button type="primary" 
          onClick={async () => {
            if (answer === player || tries === 1) {
              setTries(0)
              setShowModal(true)
            } else {
              setTries(tries - 1)
              await message.error('Incorrect! You have 1 more try!')
            }
          }} 
          disabled={!answer}>
            Submit
        </Button>
      </Flex>
      <Row justify="center my-5">
        <Col span={20}>
          <Table dataSource={playerData} columns={columns} pagination={false} scroll={{ x: 1300 }} />
        </Col>
      </Row>
    </div>
  )
}

export default Home