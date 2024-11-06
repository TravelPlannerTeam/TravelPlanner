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
import PlanDetailsPage from "./pages/PlanDetailsPage";
import CreatePlanForm from "./components/CreatePlan/CreatePlanForm";
import Login from "./components/AuthenticationForms/Login";
import Signup from "./components/AuthenticationForms/Signup";
import ForgotPassword from "./components/AuthenticationForms/ForgotPassword";
import UpdateProfile from "./components/AuthenticationForms/UpdateProfile";

function App() {
  const [plans, setPlans] = useState([]); //Store plans in state
  const [query, setQuery] = useState(""); // for the searchbar
  const [isFormOpen, setIsFormOpen] = useState(false); // per default not visible
  const { currentUser } = useAuth();
  // Open form to create a plan
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  useEffect(() => {
    if (currentUser) {
      getPlans();
    }
  }, [currentUser]);

  // function to get plans
  const getPlans = () => {
    axios
      .get(`${API}/travelPlans.json`)
      .then((response) => {
        const array = Object.keys(response.data)
          .map((id) => ({
            // convert the response from objects to an array
            id,
            ...response.data[id],
          }))
          .filter((plan) => plan.userId === currentUser?.uid); // Filter by current user's uid

        const newarr = array.toReversed();
        // save list in state
        setPlans(newarr);
      })
      .catch((e) => console.log("Error getting plans from Firebase", e));
  };

  // function to add a new plan
  const createPlan = (newPlan) => {
    const planWithUser = { ...newPlan, userId: currentUser?.uid }; // Add userId to the plan
    axios
      .post(`${API}/travelPlans.json`, planWithUser)
      .then((response) => {
        console.log(planWithUser);
        console.log("This is the currentUser?.uid:" + currentUser?.uid);
        console.log(response);
        getPlans(); // Update the list of plans
        closeForm();
      })
      .catch((e) => console.log("Error adding the plan to Firebase", e));
  };

  //function to edit an existing plan
  const editPlan = (plan) => {
    axios
      .patch(`${API}travelPlans/${plan.id}.json`, plan)
      .then((response) => {
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage
                plans={filteredPlans}
                deletePlan={deletePlan}
                callBackToEditPlan={editPlan}
                openForm={openForm} // used in Navbar
                callBackToFilterPlans={filterPlans} // used in Navbar
                query={query} // used in Navbar
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <PrivateRoute>
              <PlanDetailsPage plans={plans} />
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
