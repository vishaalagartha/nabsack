import { Image, Row, Col } from "react-bootstrap"
import { PLAYER_TO_LABEL } from "../../utils/constants"
import { IoIosCloseCircle } from "react-icons/io"
import './Player.css'

const Player = ({ name, onClick, idx, label }) => {
  const fixedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const id = PLAYER_TO_LABEL[fixedName]
  const src = `https://www.basketball-reference.com/req/202106291/images/headshots/${id}.jpg`


  return (
    <Row className="justify-center">
      {idx !== -2 && <div><i className="arrow flex justify-center"></i><div className="flex justify-center"><div className="vl"></div></div></div>}
      <Col className="player-bfs">
        {label && <div>{label}</div>}
        <Image src={src} width={100} roundedCircle />
        <div className="flex align-middle">
          <div>
          {name}
          </div>
            <div className="ml-2 text-lg cursor-pointer" onClick={() => onClick && onClick(idx)}>
              {idx > -1 && <IoIosCloseCircle />}
            </div>
        </div>
      </Col>
    </Row>
  )
}

export default Player
