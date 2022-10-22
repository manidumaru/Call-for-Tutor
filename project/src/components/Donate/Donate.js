import React from 'react';
import DonateContent from './DonateContent';
import {useNavigate} from 'react-router-dom';


function Donate() {
    const Navigate = useNavigate();

    function HideDonate() {
        Navigate("/");
    };

    return (
        <div>
            <DonateContent onClose={HideDonate} />
        </div>
    );
}

export default Donate;