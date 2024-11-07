import { Loader, Button } from "@mantine/core";
import PlanCard from "./PlanCard";
import "./planslist.css";

const PlansList = ({ plans, deletePlan, callBackToEditPlan, openForm }) => {
  if (!plans) return <Loader color="yellow" size="xl" type="dots" />;
  if (plans.length === 0)
    return (
      <div className="create-plan">
        <h2 className="noPlans">No travel plans here... Time to change that! ✨ </h2>
        <Button
          onClick={openForm}
          variant="filled"
          color="yellow"
          size="lg"
          radius="md"
        >
          Create travel plan
        </Button>
      </div>
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
