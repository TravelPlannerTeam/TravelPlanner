import PlanCard from "../components/PlanCard";

const PlansList = ({ plans }) => {
  if (!plans) return <div>Loading...</div>; // Display a loading message if plans are not yet loaded

  return (
    <div className="plans-list">
      {plans.map((plan) => (
        <PlanCard plan={plan} key={plan.id} />
      ))}
    </div>
  );
};

export default PlansList;
