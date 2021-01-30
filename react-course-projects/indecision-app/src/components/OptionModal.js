import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="selected result"
        onRequestClose={props.clearFunction}
    >
        <h2>Selected option</h2>
        {props.selectedOption && <h3>{props.selectedOption}</h3>}
        <button
            onClick={props.clearFunction}>OK</button>
    </Modal>
);

export default OptionModal;