import "./features.css";
import apply from "../../assets/applyyy.png";
import donate from "../../assets/donate.png";
import volunteer from "../../assets/volunteer.png";

function Features() {
    return(
        <div className="feature-main">
            <div class="feature-title">Features</div>
            <div className="Features">
                <div class="Card">
                    <div className="card-top">
                        <div className="card-top-image">
                            <img src={apply} alt=""></img>
                        </div>
                        <div className="card-title">
                            <p>Apply</p>
                        </div>
                    </div>
                    <div className="card-description">
                        <p>A user can apply to teach in any of the school vacancies through the website. </p> 
                        <p> Explore Vacancies </p>
                    </div>
                    <div class="card-button">
                        <button>Explore</button>
                    </div>
                </div>
                <div class="Card">
                    <div className="card-top">
                        <div className="card-top-image">
                            <img src={donate} alt=""></img>
                        </div>
                        <div className="card-title">
                            <p>Donate</p>
                        </div>
                    </div>
                    <div className="card-description">
                        <p>This is a non-profit organization for future of the Nation. Any amount you can donate will be much appreciated. </p> 
                    </div>
                    <div class="card-button">
                        <button>Donate</button>
                    </div>
                </div>
                <div class="Card">
                <div className="card-top">
                        <div className="card-top-image">
                            <img src={volunteer} alt=""></img>
                        </div>
                        <div className="card-title">
                            <p>Volunteer</p>
                        </div>
                    </div>
                        <div className="card-description">
                            <p>Our team organizes a campaign once in a while. Any eager user can apply to volunteer in the programme. </p> 
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Features;