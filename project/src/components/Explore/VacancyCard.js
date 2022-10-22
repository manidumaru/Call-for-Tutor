import school from "../../assets/school.png";
import "./vacancycard.css"

function VacancyCard(props) {
    return(
        <div className="vacancy-Card">
            <div className="vacancy-image">
                <img src={school} alt=""></img>
            </div>
            <div className="vacancy-description">
                <div className="description">
                    <p>Name: {props.vacancy.Name}</p>
                    <p>District: {props.vacancy.District}</p>
                    <p>Subject: {props.vacancy.Subject}</p>
                </div>
                <div className="view-details-btn">
                    <button>View Details</button> 
                </div>
            </div>
        </div>
    );
}

export default VacancyCard;