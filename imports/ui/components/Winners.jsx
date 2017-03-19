import React from 'react';

const Winners = (props) => {
    return (
            <p className="flow-text">{props.username} won a {props.prize} from ticket number {props._id}!</p>
    );
};

export default Winners;