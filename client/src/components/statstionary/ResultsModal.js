import { Modal, Image, Flex, Typography } from "antd"
import { PLAYER_TO_PLAYER_ID } from "../../utils/constants"
import Crown from '../../assets/crown.png'

const ResultsModal = ({ showModal, onClose, answer, guess }) => {
  if (!answer) return null
  const title = answer === guess ? 'Congratulations!' : 'Nice try!'
  const Content = answer === guess ? 
    () => (
      <p>The correct answer was {answer}! You did it!</p>
    ) :
    () => (
      <p>The correct answer was {answer}.</p>
    )
  const id = PLAYER_TO_PLAYER_ID[answer].split('/')[3].replace('.html', '')
  const playerUrl = `https://www.basketball-reference.com/req/202106291/images/headshots/${id}.jpg`
  return (
    <Modal 
      title={<Flex justify="center"><Typography.Title level={3}>{title}</Typography.Title></Flex>}
      open={showModal}
      footer={null}
      className="text-center"
      onCancel={() => onClose()}>
      <Content />
      <Flex justify="center" className="mt-20">
        <Image src={playerUrl} preview={false} />
        <div style={{ transform: `translate(0%, -70%)`, position: 'absolute'}}>
          <Image src={Crown} preview={false} width={100}  />
        </div>
      </Flex>
    </Modal>
  )
}

export default ResultsModal