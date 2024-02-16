import { Modal } from "react-bootstrap"

const InstructionsModal = ({ showModal, setShowModal }) => {

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>How to play nab sack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="pb-3 border-b-2">
          TL;DR - Click on individual players to accumulate points. Try to maximize your points while staying under the cap.
        </p>
        <divider />
        <p>
          nab sack is inspired by the famous computer science{' '}
          <a href="https://en.wikipedia.org/wiki/Knapsack_problem">knapsack problem</a> (hence the punny name).
        </p>
        <p>
          The basic premise is that you are a robber entering a house with a sack that has a fixed capacity. 
          Your goal is to maximize your value while staying under the capacity. You could take the $1000 TV that
          weights 25 lbs, or maybe it's a better idea to take the $500 diamond earrings that only weigh 0.5 lbs.
        </p>
        <p>
          Extrapolating this to the NBA, imagine you are a GM operating under the salary cap.
          You want to construct the team with the highest points (fantasy points in our case), 
          while being under the fixed cap.
        </p>
        <p>
          Player salaries and fantasy points are given. You can take as many players as you want.
        </p>
        <p className="pb-3 border-b-2">
          Click 'Submit' to see the optimal solution computed using the{' '}
          <a href="https://en.wikipedia.org/wiki/Dynamic_programming">dynamic programming</a> solution for the knapsack problem.
        </p>
        <p>
          <strong>**Note**</strong> 
          <br />
          Fantasy points are calculated daily and player salaries are for the 2023-24 season
        </p>
      </Modal.Body>
    </Modal>
  )

}

export default InstructionsModal