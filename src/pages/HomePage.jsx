import Navbar from "../components/Navbar/Navbar";
import "../pages/homepage.css";
import PlansList from "../components/Plan/PlansList";

const HomePage = ({
  plans,
  deletePlan,
  openForm,
  callBackToFilterPlans,
  query,
  callBackToEditPlan,
}) => {
  return (
    <>
      <Navbar
        openForm={openForm}
        callBackToFilterPlans={callBackToFilterPlans}
        query={query}
      />

      <div className="homepage">
        <PlansList
          plans={plans}
          deletePlan={deletePlan}
          callBackToEditPlan={callBackToEditPlan}
        />
      </div>
    </>
  );
};

export default HomePage;
