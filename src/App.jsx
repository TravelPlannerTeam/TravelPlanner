import React from "react";
import { useState, useEffect, useMemo } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { API_URL as API } from "./assets/API_URL"; //importing API base url from js file in assets
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import CreatePlanForm from "./components/CreatePlan/CreatePlanForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const [plans, setPlans] = useState([]); //Store plans in state
  const [query, setQuery] = useState(""); // for the searchbar
  const [isFormOpen, setIsFormOpen] = useState(false); // per default not visible

  const { currentUser } = useAuth();

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
        closeForm();
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

  const filterPlans = (e) => {
    setQuery(e.target.value);
  };

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) =>
      plan.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [plans, query]);

  return (
    <>
      {currentUser && (
        <Navbar
          openForm={openForm}
          callBackToFilterPlans={filterPlans}
          query={query}
        />
      )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <PrivateRoute>
                <PlanDetailsPage />
              </PrivateRoute>
            }
          />
        </Routes>

      {isFormOpen && (
        <div className="form-overlay" onClick={closeForm}>
          <div className="form-box" onClick={(e) => e.stopPropagation()}>
            <CreatePlanForm
              callBacktoCreatePlan={createPlan}
              callBackToCloseForm={closeForm}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default App;
