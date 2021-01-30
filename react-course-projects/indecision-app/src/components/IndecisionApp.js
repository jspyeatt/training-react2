import React from 'react';

import AddOption from './AddOption';
import Option from './Option';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';
export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    // we define this method in the parent component, but
    // we pass it into the child component <Options> so it
    // can be called during Remove All.
    handleDeleteAllOptions = () => {
        console.log("handleDeleteAllOptions");
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        console.log("handleDeleteOption", optionToRemove);
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove != option;
            })
        }));
    };
    handlePick = () => {
        console.log("handlePick");
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const selectedOption = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: selectedOption
        }));
    };
    handleClearSelectedOption = () => {
        console.log("handleClearSelectedOption");
        this.setState(() => ({selectedOption: undefined}));
    }
    handleAddOption = (option) => {
        console.log("IndecisionApp: handleAddOption " + option);

        // In this case we are going to return an error string if
        // they didn't enter anything or in the else, if there is a 
        // duplicate. 
        // the normal behavior for this method would be to return undefined.
        // if a string is returned, there must be an error.
        if (!option) {
            return 'Error valid value!!';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'The value ' + option + ' already exists.';
        }

        // set the new state.
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };

    componentDidMount(prevProps, prevState) {

        const json = localStorage.getItem('options');
        if (json) {
            try {
                const options = JSON.parse(json);
                console.log("componentDidMount", options);
                this.setState((prevState) => ({ options: options }))
            } catch (e) {
                console.error("Bad data", e);
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        // we don't want to save data if the options array is already empty.
        if (prevState.options.length != this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            console.log("save data", json);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount(prevProps, prevState) {
        console.log("componentWillUnmount");
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteAll={this.handleDeleteAllOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
                <OptionModal 
                selectedOption={this.state.selectedOption}
                clearFunction={this.handleClearSelectedOption}/>
            </div>
        )
    }
}
