import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL as API } from "./assets/API_URL"; //importing API base url from js file in assets

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import CreatePlanForm from "./components/CreatePlanForm";

function App() {
  const [plans, setPlans] = useState(null); //Store plans in state
  const [isFormOpen, setIsFormOpen] = useState(false); // per default not visible

  // Open form to create a plan
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  useEffect(() => {
    getPlans();
  }, []);

  //function to get plans
  const getPlans = () => {
    axios
      .get(`${API}/travelPlans.json`)
      .then((response) => {
        console.log(response);
        const array = Object.keys(response.data).map((id) => ({
          //convert the response from objects to an array
          id,
          ...response.data[id],
        }));
        const newarr = array.toReversed();
        //save list in state
        setPlans(newarr);
      })
      .catch((e) => console.log("Error getting plans from Firebase", e));
  };
  //function to add a new plan
  const createPlan = (newPlan) => {
    axios
      .post(`${API}/travelPlans.json`, newPlan)
      .then((response) => {
        console.log(newPlan);
        console.log(response);
        //calling getplans to update the list from database
        getPlans();
      })
      .catch((e) => console.log("Error adding the plan to Firebase", e));
  };
  //function to edit an existing plan
  const editPlan = (planId) => {
    axios
      .patch(`${API}/travelPlans/${planId}.json`)
      .then((response) => {
        console.log(response);
        //calling getplans to update the list from database
        getPlans();
      })
      .catch((e) => console.log("Error editing the plan in Firebase", e));
  };
  //function to delete a plan
  const deletePlan = (planId) => {
    axios
      .delete(`${API}/travelPlans/${planId}.json`)
      .then((response) => {
        console.log(response);
        //calling getplans to update the list from database
        getPlans();
      })
      .catch((e) => console.log("Error deleting the plan from Firebase", e));
  };

  return (
    <>
      <Navbar openForm={openForm}/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PlanDetailsPage />} />{" "}
      </Routes>

      {isFormOpen && (
        <div className="form-overlay" onClick={closeForm}>
          <div className="form-box" onClick={(e) => e.stopPropagation()}>
            <CreatePlanForm callBacktoCreatePlan={createPlan} callBackToCloseForm={closeForm} />
          </div>
        </div>
      )}
    </>
  );
}
export default App;
