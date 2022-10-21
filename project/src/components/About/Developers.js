import "./developers.css";
import manee from "../../assets/manee1.jpg";
import nirbhay from "../../assets/nirbhay.jpg";
import manoj from "../../assets/manoj.png";

function Developers() {

    return(
        <div>
            <div className="Title">Developers</div>
            <div class="gap"></div>
            <div className="nirbhay">
                <div className="details">
                    <p className="our-description">Tapai ko chata tapai sanga hune ki ma sanga? Ali sano vayo tei vayera thapeko. Arko line ma janxa ki jadaina hereko ho yo chai.</p>
                    <p className="naming">-Nirbhay Adhikari</p>
                </div>
                <div className="photo">
                    <div>
                        <img src={nirbhay} alt="Manee"></img>
                    </div>
                </div>
            </div>
            <div className="manee">
                <div class="manee-details">
                    <p className="our-description">All I wanted was just a talk, a daily conversation to make my day.</p>
                    <p className="naming">-Manee Dumaru</p>
                </div>
                <div className="manee-photo">
                    <div><img src={manee} alt ="Manee"></img></div>
                </div>
            </div>
            <div className="nirbhay">
            <div className="details">
                    <p className="our-description">I dont want to overthink at all, but I know I’m gonna do it again after I read this.</p>
                    <p className="naming">-Manoj Shrestha</p>
                </div>
                <div className="photo">
                    <div>
                        <img src={manoj} alt="Manoj"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Developers;