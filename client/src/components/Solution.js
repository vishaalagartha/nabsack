import { Row } from 'react-bootstrap'
import Player from './Player'

const Solution = ({ solution, amount, points }) => {
  return (
    <div>
      <Row className="justify-center m-5">
        {solution.players.map((p, i) => {
          return <Player key={i} name={p} selected={true} optimal={true} />
        })}
      </Row>
      <h3>Optimal number of points: {solution.profit}. You were off by {(solution.profit - points).toFixed(2)}.</h3>
      <h3>Optimal solution costs ${solution.cost.toLocaleString()}</h3>
    </div>
  )
}

export default Solution
