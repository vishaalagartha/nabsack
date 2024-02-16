import { Modal } from "react-bootstrap"

const InstructionsModal = ({ showModal, setShowModal }) => {

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>How to play NBA Breadth First Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="pb-3 border-b-2">
          TL;DR - Search for any NBA player and devise the shortest path from the source to the destination player.
        </p>
        <divider />
        <p>
          NBA breadth first search utilizes the common{' '}
          <a href="https://en.wikipedia.org/wiki/Breadth-first_search">Breadth First Search (BFS) algorithm</a> to find the shortest path between
          two nodes in an unweighted graph.
        </p>
        <p>
          Your goal is to find the minimum number of hops or players to get from the source to the destination. Where a player is connected
          to another if they were ever teammates.
        </p>
        <p>
          For example, let's say the source is Stephen Curry and the destination is Kobe Bryant.
        </p>
        <p>
          One path is <br/> Stephen Curry --{'>'} Monta Ellis --{'>'} Stephen Jackson --{'>'} Metta World Peace --{'>'} Kobe Bryant
        </p>
        <p>
          But the shortest path is <br /> Stephen Curry --{'>'} Steve Blake --{'>'} Kobe Bryant
        </p>
        <p>
          Can you get the shortest path?
        </p>
        <p>
          (Refresh to reset the source and destination)
        </p>
      </Modal.Body>
    </Modal>
  )

}

export default InstructionsModal