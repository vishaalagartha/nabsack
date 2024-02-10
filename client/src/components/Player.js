import { Image, Row, Col } from "react-bootstrap"
import { PLAYER_TO_ID } from "../utils/constants"
import './Player.css'

const Player = ({ name, cost, profit, selected, onClick, idx, optimal, showSolution }) => {
  const fixedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const id = PLAYER_TO_ID[fixedName]
  const src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`

  let className = "player"
  if (showSolution) {
    if (selected && optimal) {
      className += " selected"
    } else {
      className += " incorrect"
    }
  } else if (selected) {
    className += " selected"
  }


  return (
    <Col xs={4} md={2} className={className} onClick={() => onClick && onClick(idx)}>
      <Image src={src} className="w-2/3" />
      <Row>
        {name}
      </Row>
      <Row>
        {cost !== undefined && `$${cost.toLocaleString()}`}
      </Row>
      <Row>
        {profit !== undefined && `+${profit}`}
      </Row>
    </Col>
  )
}

export default Player
