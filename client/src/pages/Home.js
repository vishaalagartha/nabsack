import './Home.css'
import { Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BFS from '../assets/bfs.png'
import Knapsack from '../assets/knapsack.png'


const App = () => {
  const navigate = useNavigate()
  return (
    <Row className="justify-around mt-5">
      <Col xs={{ span: 4 }}>
        <div className="app-box" onClick={() => navigate(('/knapsack'))}>
          <h3>NBA Knapsack</h3>
          <Image src={BFS} width={400}>
          </Image>
          <div>Accumulate the maximum number of points while being under the cap.</div>
        </div>
      </Col>
      <Col xs={{ span: 4 }}>
        <div className="app-box" onClick={() => navigate('/bfs')}>
          <h3>NBA Breadth-First Search</h3>
          <Image src={Knapsack} width={300}>
          </Image>
          <div>Find the shortest path between two players.</div>
        </div>
      </Col>
    </Row>
  )
}

export default App
