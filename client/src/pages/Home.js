import './Home.css'
import { Row, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BFS from '../assets/bfs.png'
import Knapsack from '../assets/knapsack.png'
import Network from '../assets/network.png'
import Statstionary from '../assets/statstionary.png'


const App = () => {
  const navigate = useNavigate()
  return (
    <>
      <Row className="justify-around mt-5">
        <Col xs={{ span: 3 }}>
          <div className="app-box" onClick={() => navigate(('/knapsack'))}>
            <h3>NBA Knapsack</h3>
            <Image src={BFS} width={400}>
            </Image>
            <div>Accumulate the maximum number of points while being under the cap.</div>
          </div>
        </Col>
        <Col xs={{ span: 3 }}>
          <div className="app-box" onClick={() => navigate('/bfs')}>
            <h3>NBA Breadth-First Search</h3>
            <Image src={Knapsack} width={300}>
            </Image>
            <div>Find the shortest path between two players.</div>
          </div>
        </Col>
      </Row>
      <Row className="justify-around my-5">
        <Col xs={{ span: 3 }}>
          <div className="app-box" onClick={() => navigate('/network')}>
            <h3>The NBA Network</h3>
            <Image src={Network} width={300}>
            </Image>
            <div>Visualize the network of NBA players</div>
          </div>
        </Col>
        <Col xs={{ span: 3 }}>
          <div className="app-box" onClick={() => navigate('/statstionary')}>
            <h3>Statstionary</h3>
            <Image src={Statstionary} width={300}>
            </Image>
            <div>Guess a player just by looking at their stats</div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default App
