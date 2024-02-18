import { useEffect, useState, useRef } from "react"
import { ForceGraph3D } from 'react-force-graph'
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap'
import Select from 'react-select'
import './Network.css'


const Network = () => {
  const allTeams = ['Atlanta Hawks', 'Boston Celtics', 'Cleveland Cavaliers', 'New Orleans Pelicans', 'Chicago Bulls', 'Dallas Mavericks', 'Denver Nuggets', 'Golden State Warriors', 'Houston Rockets', 'Los Angeles Clippers', 'Los Angeles Lakers', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'Brooklyn Nets', 'New York Knicks', 'Orlando Magic', 'Indiana Pacers', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Oklahoma City Thunder', 'Toronto Raptors', 'Utah Jazz', 'Memphis Grizzlies', 'Washington Wizards', 'Detroit Pistons', 'New Jersey Nets', 'Charlotte Hornets']
  const years = Array(new Date().getFullYear() - 1950 + 1).fill().map((_, idx) => 1950 + idx)
  const [data, setData] = useState({ nodes: [], links: [] })
  const [graphData, setGraphData] = useState({ nodes: [], links: [] })
  const [fromYear, setFromYear] = useState(new Date().getFullYear())
  const [toYear, setToYear] = useState(new Date().getFullYear())
  const [teams, setTeams] = useState(allTeams)
  const [playerMap, setPlayerMap] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showError, setShowError] = useState(false)
  const fgRef = useRef()

  useEffect(() => {    
    fetch('./network.json', { headers: {
      "Content-Type": "application/json",
    }}).then(res => res.json()).then(graph => {
      setData(graph)
      const playerMap = new Array(graph.nodes.length).fill()
      Object.entries(graph.nodes).forEach(el => {
        playerMap[el[1]] = el[0]
      })
      setPlayerMap(playerMap)
    })
    
  }, [])

  useEffect(() => {  
    const links = data.links.filter(d => {
      const { years, teams: _teams } = d
      for (let i = 0; i < years.length; i++) {
        const y = years[i]
        if (y >= fromYear && y <= toYear && teams.indexOf(_teams[i]) !== -1) {
          return true
        }
      }
      return false
    }).map(l => ({ source: l.source, target: l.target }))
    
    const nodes = new Set()
    links.forEach(l => {
      nodes.add(l.source)
      nodes.add(l.target)
    })  
    setGraphData({ links, nodes: Array.from(nodes).map(id => ({ id })) })

  }, [fromYear, toYear, teams, data])

  const handleChange = (selected) => {
    setTeams(selected.map(el => el.value))
  }

  const handleSearch = () => {
    const node = graphData.nodes.find(n => {
      const name = playerMap[n.id]
      return name.toLowerCase() === searchValue.toLowerCase()
    })
    if (!node) {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
      return
    }
    const distance = 40
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z)
    console.log(fgRef)
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    )
  }

  return (
    <div>
      <Row className="justify-around">
        <Col xs={6}>
          <Row className="text-center mt-3">
            <h3>NBA Player Network</h3>
            <p>Players link if they played on one of the filtered teams during the span selected span inclusive.</p>
            <p>Hover/click on nodes to see the player's name. Zoom in/zoom out by pinching.</p>
            <p>Customize your filter for your desired team and years.</p>
          </Row>
          <Form>
            <Form.Label>From:</Form.Label>
            <Form.Control as="select" value={fromYear} onChange={(e) => setFromYear(parseInt(e.target.value))}>
              {years.map(y => {
                return <option key={y} value={y}>{y}</option>
              })}
            </Form.Control>
            <Form.Label>To:</Form.Label>
            <Form.Control as="select" value={toYear} onChange={(e) => setToYear(parseInt(e.target.value))}>
              {years.map(y => {
                return <option key={y} value={y}>{y}</option>
              })}
            </Form.Control>
            <Form.Label>Teams: </Form.Label>
            <Select
              isMulti
              defaultValue={allTeams.map(el => ({ value: el, label: el }))}
              onChange={handleChange}
              options={allTeams.map(el => ({ value: el, label: el }))}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: 'grey',
                  backgroundColor: 'rgb(43,48,53)'
                }),
                multiValueRemove: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'grey',
                  "&:hover"  : {
                    borderColor: "#CCCCCC",
                    background: "#0087FB",
                    color: "#FFFFFF",
                  },
                }),
                menu: (baseStyles) => {
                  return {
                  ...baseStyles,
                  backgroundColor: 'rgb(43,48,53)',
                  
                }},
                option: (base) => ({
                  ...base,
                  "&:hover"  : {
                      borderColor: "#CCCCCC",
                      background: "#0087FB",
                      color: "#FFFFFF",
                  },
                  background: 'rgb(43,48,53)'
              }),
                
              }}
            />
            <InputGroup className="my-3">
              <Form.Control
                placeholder="Search for player"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              <Button onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
            {showError && <p className="text-red-600">Player not found!</p>}
          </Form>
        </Col>
      </Row>
      <Row style={{ marginLeft: 50 }}>
        <ForceGraph3D 
          ref={fgRef}
          width={window.innerWidth - 100}
          nodeColor={() => "#0087FB"}
          cooldownTicks={100} 
          d3AlphaDecay={0.05} 
          graphData={graphData} 
          nodeLabel={({ id }) => playerMap[id]} 
        />
      </Row>
    </div>
  )
}

export default Network