import React from 'react';

const MiningTransaction = () => {
    return (
        <div className="section">
            <div>
                <p className="flow-text red-text">Mining Transaction, please wait....</p>
            </div>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        </div>
    );
};

export default MiningTransaction;