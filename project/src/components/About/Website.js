import "./Website.css";
import aboutus from "../../assets/aboutus.png";

function Website () {
    return(
        <div>
            <div className="Title">About Us</div>
            <div className="website-info">
                <div className="logo">
                    <div className="image">
                        <img src={aboutus} alt="Logo"></img>
                    </div>
                </div>
                <div className="information">
                    <div className="description">
                        We are just the bunch of guys trying to learn what we can through this medium. We hope to serve the nation in educational field by providing the quality teachers to the schools in necessity. Thats all we wanna do. Yah ! of course we want to score A in our semester project so that we can get a good marks and get a good job and live a happy life with a woman of our dreams. We  expect much from this website to be honest. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Website;