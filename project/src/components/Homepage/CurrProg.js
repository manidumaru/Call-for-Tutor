import "./CurrProg.css";
import eventbanner from "../../assets/eventbanner.png";

function CurrProg() {
    return(
        <div class="currProg-main">
            <div class="currprog-title">Current Programme</div>
                <div class="event-banner">
                    <div class="picture">
                        <img src={eventbanner} alt=""></img>
                    </div>
                    <div className="event-detail-parent">
                        <div class="event-details">
                            <div class="event-title">Awareness Campaign</div>
                            <p>Address: Dolpa-5, Dolpa</p>
                            <p>District: Dolpa</p>
                            <p>Maxmimum Participants: 150</p>
                            <p>Remaining: 101</p>
                            <p>Date: 19-11:2022</p>
                        </div>
                        <div class="event-button">
                            <button>Participate</button>
                        </div>
                    </div>
                </div>
                
        </div>
    );  
}

export default CurrProg;