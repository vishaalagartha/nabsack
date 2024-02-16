import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import bfs from "../../utils/bfs"

const ChooseNodeModal = ({ showModal, setShowModal, setSource, setDestination, setOptimalPath, players }) => {
  
  const [localSource, setLocalSource] = useState([])
  const [localDest, setLocalDest] = useState([])
  const [showError, setShowError] = useState(false)

  const handleSubmit = () => {
    const source = localSource[0]
    const destination = localDest[0]
    if (source === destination) {
      setShowError(true)
      return
    }
    const path = bfs(source, destination).slice(1, -1).reverse()
    if (!path.length) {
      setShowError(true)
      return
    }
    setSource(source)
    setDestination(destination)
    setOptimalPath(path)
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Choose your own source and destination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="m-5">
            <Form.Label>Source</Form.Label>
            <Typeahead
                id="source"
                clearButton={true}
                onChange={(selected) => {
                  setLocalSource(selected)
                }}
                selected={localSource}
                options={players}
                placeholder={'Choose a source'}
              />
          </div>
          <div className="m-5">
            <Form.Label>Destination</Form.Label>
            <Typeahead
              id="destination"
              clearButton={true}
              onChange={(selected) => {
                setLocalDest(selected)
              }}
              selected={localDest}
              options={players}
              placeholder={'Choose a destination'}
            />
          </div>
          {showError && <div className="text-red-600">No path exists between source and destination!</div>}
          <div className="flex justify-center">
            <Button disabled={localSource.length === 0 || localDest.length === 0} onClick={() => handleSubmit()}>Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )

}

export default ChooseNodeModal