import "../pages/homepage.css";
import PlansList from "../components/Plan/PlansList";

const HomePage = ({ plans, deletePlan }) => {
  return (
    <div className="homepage">
      <PlansList plans={plans} deletePlan={deletePlan}/>
    </div>
  );
};

export default HomePage;
