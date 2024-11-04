import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL as API } from "./assets/API_URL"; //importing API base url from js file in assets

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import PlanDetailsPage from "./pages/PlanDetailsPage";

function App() {
  const [plans, setPlans] = useState(null); //Store plans in state

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
  const addPlan = (newPlan) => {
    axios
      .post(`${API}/travelPlans.json`, newPlan)
      .then((response) => {
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
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PlanDetailsPage />} />{" "}
      </Routes>
    </>
  );
}
export default App;
