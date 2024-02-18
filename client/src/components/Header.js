import { useState } from 'react'
import { Button, Navbar, Container, Image } from 'react-bootstrap'
import Logo from '../assets/logo.png'
import NabsackInstructionsModal from './knapsack/NabsackInstructionsModal'
import BFSInstructionsModal from './bfs/BFSInstructionsModal'

const Header = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-between">
        <Container>
          <Navbar.Brand href="/" className="flex items-center">
            <Image
              alt=""
              src={Logo}
              width={100}
              className="d-inline-block align-top"
            />{' '}
            <h1>nab sack</h1>
          </Navbar.Brand>
        </Container>
        <Button className="instructions-button" variant={"secondary"} onClick={() => setShowModal(true)}>
          ?
        </Button>
      </Navbar>
      {window.location.pathname.includes('knapsack') && <NabsackInstructionsModal showModal={showModal} setShowModal={setShowModal} />}
      {window.location.pathname.includes('bfs') && <BFSInstructionsModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  )
}

export default Header
