import "./DonateContent.css";
import React from 'react';
import Modal from "../UI/Modal";
import bank from "../../assets/nic.png";
import khalti from "../../assets/khalti.png";

function DonateContent(props) {
    return(
        <Modal onClick={props.onClose}>
            <div className="donation-holder">
                <div className="donation-image">
                    <img src={bank} alt=""></img>
                </div>
                <div className="donation-information">
                    <p>Bank Name: NIC Asia Bank</p>
                    <div>Branch: Kathmandu</div>
                    <p>Account Number: 0120037089000011</p>
                </div>
            </div>
            <div className="donation-holder">
                <div className="donation-image">
                    <img src={khalti} alt=""></img>
                </div>
                <div className="donation-information">
                    <p>eSewa ID: 9861494401</p>
                </div>
            </div>
        </Modal>
    );
}

export default DonateContent;