import './BFS.css'
import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { GRAPH, CANDIDATES } from '../utils/constants'
import { Form, Row, Col, Alert, Button } from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Player from '../components/bfs/Player'
import ChooseNodeModal from '../components/bfs/ChooseNodeModal'
import bfs from '../utils/bfs'


const BFS = () => {
  const players = Object.keys(GRAPH).sort()
  const [source, setSource] = useState()
  const [destination, setDestination] = useState()
  const [optimalPath, setOptimalPath] = useState([])
  const [path, setPath] = useState([])
  const [state, setState] = useState('INCOMPLETE')
  const [error, showError] = useState(false)
  const [autocomplete, setAutocomplete] = useState([])
  const [showChooseNodeMoal, setShowChooseNodeModal] = useState(false)
  const prev = path.length ? path[0] : source

  useEffect(() => {
    let s = source
    let d = destination
    let p = optimalPath
    while (s === d || p.length === 0) {
      s = CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)]
      d = CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)]
      if (d !== s) {
        p = bfs(s, d).slice(1, -1).reverse()

      }
    }
    setSource(s)
    setDestination(d)
    setOptimalPath(p)
  }, [])


  const handleDelete = (idx) => {
    if (state === 'COMPLETE') return
    setPath(path.filter((_, i) => i !== idx))
  }

  if (!source || !destination || !optimalPath.length) return null

  return (
    <div>
      <Alert variant={'danger'} show={error} transition={true} className="text-center">Invalid path! {autocomplete[0]} is not connected to {prev}.</Alert>
      <Row className="text-center mt-3 justify-center">
        <h3>NBA Breadth-First-Search</h3>
        <p>How many steps do you need to get from the source to destination?</p>
        <p>Choose any player who was or is a teammate of the source. Repeat until you reach the destination.</p>
        <p>Refresh to reset the source and destination</p>
        {state === 'INCOMPLETE' && 
          <Col xs={3} className="flex justify-center">
            <Button onClick={() => setShowChooseNodeModal(true)}>Choose your own source and destination</Button>
          </Col>
        }
      </Row>
      <ChooseNodeModal 
        showModal={showChooseNodeMoal} 
        setShowModal={setShowChooseNodeModal} 
        players={players} 
        setSource={setSource}
        setDestination={setDestination}
        setOptimalPath={setOptimalPath}
      />
      {state === 'INCOMPLETE' &&
      <Row className="justify-center mt-5">
        <Col xs={8} md={6}>
          <Form>
            <Typeahead
              id="autocomplete"
              clearButton={true}
              onChange={(selected) => {
                setAutocomplete(selected)
                if (!selected.length) return
                if (GRAPH[prev].indexOf(selected[0]) === -1) {
                  showError(true)
                  setTimeout(() => showError(false), 2000)
                  return
                } 
                setAutocomplete([])
                if (selected[0] === destination) {
                  setState('COMPLETE')
                } else {
                  setPath([selected[0], ...path])
                }
              }}
              selected={autocomplete}
              options={players}
              placeholder={'Choose a player'}
            />
          </Form>
        </Col>
      </Row>
      }
      {state === 'COMPLETE' &&
        <div className="text-center my-auto mx-1">
          <h3>Congratulations! You made it.</h3>
          <h4>Your path was {path.length} steps long.</h4>
          <h4>The optimal path is {optimalPath.length} steps.</h4>
          <h5>(Note that there may be multiple paths of length {optimalPath.length})</h5>
        </div>
      }
      <div className="flex justify-around mt-5">
        <div className="flex flex-col justify-around ml-5">
          <Player label={"Destination"}  name={destination} idx={-2} />
          {path.map((n, i) => {
            return <Player name={n} idx={i} key={i} onClick={handleDelete}/>
          })}
          <Player label={"Source"}  name={source} idx={-1} />
        </div>
        {state === 'COMPLETE' &&
          <div className="flex flex-col justify-around mt-5 mr-5">
            <Player label={"Destination"} name={destination} idx={-2} />
            {optimalPath.map((n, i) => {
              return <Player name={n} idx={i} key={i} />
            })}
            <Player label={"Source"} name={source} idx={-1} />
          </div>
        }
      </div>
      <Row className="justify-center my-5">
        {state === 'INCOMPLETE' && 
          <Col xs={3} className="text-center" onClick={() => setState('COMPLETE')}>
            <Button>I Give Up!</Button>
          </Col>
        }
      </Row>
    </div>
  )
}

export default BFS;