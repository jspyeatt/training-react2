import React from 'react';
import Option from './Option'
const Options = (props) => (
    <div>
        {props.options.length > 0 && <h2>Options</h2>}
        <button 
        className="button button--link"
        onClick={props.handleDeleteAll}
        >Remove All</button>
        {props.options.length === 0 && <p>Please add an option to get started.</p>}
        {
            props.options.map((option) => (
                <Option
                    key={option}
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
    </div>
);

export default Options;