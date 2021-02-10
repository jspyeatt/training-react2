import React from 'react';
const EditExpensePage = (props) => {
    return (
        <div>do some editing for {props.match.params.id}</div>
    );
};
export default EditExpensePage;