import './Knapsack.css'
import { useEffect, useState } from 'react'
import Player from '../components/knapsack/Player'
import { Row, Alert, Button, Col } from 'react-bootstrap'
import Solution from '../components/knapsack/Solution'

const Knapsack = () => {
  const [data, setData] = useState([])
  const [solution, setSolution] = useState([])
  const [amount, setAmount] = useState(0)
  const [points, setPoints] = useState(0)
  const [showError, setShowError] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://nabsack.s3.us-west-1.amazonaws.com/data.json')
      if (res.status === 200) {
        const json = await res.json()
        const optimalPlayers = json.optimal.players
        setData(json.options.map(j => ({ ...j, selected: false, optimal: optimalPlayers.indexOf(j.name) !== -1 })))
        setSolution(json.optimal)
        setAmount(json.cap)
      }
    }
    fetchData()
  }, [])

  const handleClick = (idx) => {
    const { selected, profit, cost } = data[idx]
    if (selected) {
      setAmount(amount + cost)
      setPoints(parseFloat((points - profit).toFixed(2)))
      setData(data.map((d, i) => {
        if (i === idx) {
          return { ...d, selected: false }
        }
        return d
      }))
    } else {
      if (cost > amount) {
        setShowError(true)
        setTimeout(() => setShowError(false), 5000)
        return
      }
      setAmount(amount - cost)
      setPoints(parseFloat((points + profit).toFixed(2)))
      setData(data.map((d, i) => {
        if (i === idx) {
          return { ...d, selected: true }
        }
        return d
      }))
    }

    
  }


  return (
    <div>
      <Alert variant={'danger'} show={showError} transition={true} className="text-center">Insufficient Funds!</Alert>
      <div className="my-10">
        <div className="text-center">
          <p>Click on individual players to accumulate points. Try to maximize your points while staying under the cap.</p>
          <h2>${amount.toLocaleString()} Remaining</h2>
          <h2>+ {points} Accumulated</h2>
          <Row className="justify-center m-5">
            {data.map((d, i) => {
              const props = { key: i, idx: i, onClick: handleClick, showSolution, ...d }
              return <Player {...props} />
            })}
          </Row>
          <Row className="justify-around">
            {showSolution ?
            <Solution solution={solution} amount={amount} points={points} />
            :
            <Col xs={2}>
              <Button onClick={() => setShowSolution(true)} disabled={showSolution}>Submit</Button>
            </Col>
            }
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Knapsack