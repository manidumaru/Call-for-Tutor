import "./contacts.css";
import contact from "../../assets/contact.png";

function Contacts () {
    return(
        <div>
            <div className="Title">Contacts</div>
            <div className="contacts">
                <div className="contact-image">
                    <div className="contact-photo">
                        <img src={contact} alt=""></img>
                    </div>
                </div>
                <div className="contact-details">
                        <p>Phone : +977 - 9841169701</p>
                        <p>Telephone : 01- 6618430</p>
                        <p>E-mail : callfortutor@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Contacts;