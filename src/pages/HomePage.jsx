import "../pages/homepage.css";
import PlansList from "../components/PlansList";

const HomePage = ({ plans }) => {
  return (
    <div className="homepage">
      <PlansList plans={plans} />
    </div>
  );
};

export default HomePage;
