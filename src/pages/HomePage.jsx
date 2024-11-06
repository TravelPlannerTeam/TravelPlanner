import Navbar from "../components/Navbar/Navbar";
import "../pages/homepage.css";
import PlansList from "../components/Plan/PlansList";

const HomePage = ({ plans, deletePlan, openForm, callBackToFilterPlans, query }) => {
  return (
    <div className="homepage">
      <Navbar 
        openForm={openForm}
        callBackToFilterPlans={callBackToFilterPlans}
        query={query}
      />
      <PlansList plans={plans} deletePlan={deletePlan}/>
    </div>
  );
};

export default HomePage;
