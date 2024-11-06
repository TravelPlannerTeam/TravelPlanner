import { Loader } from "@mantine/core";
import PlanCard from "./PlanCard";
import "./planslist.css";

const PlansList = ({ plans, deletePlan, callBackToEditPlan, openForm }) => {
  if (!plans) return <Loader color="yellow" size="xl" type="dots" />;
  if (plans.length === 0)
    return (
      <h3 className="noPlans">
        No Plans yet,Would you Like to{" "}
        <button ml="sm" color="green" onClick={openForm}>
          Create One?
        </button>
      </h3>
    );
  return (
    <div className="plans-list">
      {plans.map((plan) => (
        <PlanCard
          plan={plan}
          key={plan.id}
          callBackToEditPlan={callBackToEditPlan}
          callBackToDeletePlan={deletePlan}
        />
      ))}
    </div>
  );
};

export default PlansList;
