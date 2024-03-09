import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SuccessModal(props: any) {

    const navigate = useNavigate();

    const closeModal = () => {
        props.onHide();
        navigate("/confirmation");
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Success!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Your troop registration has been submitted.</h4>
                <p>
                    Welcome to AHG Troop 9020.  We look forward to seeing you soon.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;
