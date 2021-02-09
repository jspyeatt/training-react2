import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="selected result"
        closeTimeoutMS={200}
        onRequestClose={props.clearFunction}
        className="modal"
    >
        <h2 className="modal__title">Selected option</h2>
        {props.selectedOption && <h3 className="modal__body">{props.selectedOption}</h3>}
        <button
            className="button"
            onClick={props.clearFunction}>OK</button>
    </Modal>
);

export default OptionModal;