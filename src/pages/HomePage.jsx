import Navbar from "../components/Navbar/Navbar";
import "../pages/homepage.css";
import PlansList from "../components/Plan/PlansList";
import Footer from "../components/Footer/Footer";

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
          openForm={openForm}
        />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
