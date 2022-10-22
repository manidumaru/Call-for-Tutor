import "./Explore.css";
import VacancyCard from "./VacancyCard";

function Explore() {

  const vacancies = [
    {
      Name: "Kathmandu University",
      District: "Kavre",
      Subject: "Physics",
    },
    {
      Name: "Madhyamik Bidhyalaya",
      District: "Sindhupalchowk",
      Subject: "Social Studies",
    },
    {
      Name:"Alfa Secondary School",
      District: "Morang",
      Subject: "English",
    }
  ] 

  return (
    <div class="explore-main">
      <div className="heading">
        <div className="opportunities">VACANCIES</div>
        <div className="search-bar">
          <div className="input-holder">
            <input type="text" placeholder="Search by Subject Name"></input>
          </div>
          <div className="search-btn-holder">
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>
      <VacancyCard vacancy={vacancies[0]}></VacancyCard>
      <VacancyCard vacancy={vacancies[1]}></VacancyCard>
      <VacancyCard vacancy={vacancies[2]}></VacancyCard>
    </div>
  );
}

export default Explore;
