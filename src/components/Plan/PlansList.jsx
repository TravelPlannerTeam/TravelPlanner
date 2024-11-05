import { Loader } from '@mantine/core';
import PlanCard from "./PlanCard";
import "./planslist.css";

const PlansList = ({ plans, deletePlan }) => {
  if (!plans) return <Loader color="yellow" size="xl" type="dots" />;

  return (
    <div className="plans-list">
      {plans.map((plan) => (
        <PlanCard plan={plan} key={plan.id} callBackToDeletePlan={deletePlan}/>
      ))}
    </div>
  );
};

export default PlansList;
