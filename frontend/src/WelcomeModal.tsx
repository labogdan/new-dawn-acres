import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from './image/new-dawn-logo.png';

function WelcomeModal(props: any) {

    const closeModal = () => {
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <img src={logo} style={{maxWidth: '150px'}} />
                <Modal.Title style={{fontFamily: 'EB Garamond'}} id="contained-modal-title-vcenter">
                    <h1>Welcome friends!</h1>
                    <h3> We're happy to have ewe here.</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>This is STEP 3: Troop Registration.</strong> <br />
                    Have you completed Step 2 at <a href="https://www.ahgfamily.org/login" target="_blank">AHGfamily</a>? <br /> If yes, continue on, we are looking forward to seeing you this year! 
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WelcomeModal;
