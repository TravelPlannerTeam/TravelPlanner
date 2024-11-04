import { useState } from "react";

import "../components/create-plan-form.css";

const CreatePlanForm = ({ callBacktoCreatePlan, callBackToCloseForm }) => { // Destructure props here
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Handle submit
  const handleSubmit = (e) => { // Add the event parameter
    e.preventDefault(); // Prevent default form submission

    const newPlan = {
      title,
      description,
      destination,
      startDate,
      endDate,
    };

    callBacktoCreatePlan(newPlan); // pass new plan to app.jsx

    // clear all input fields
    setTitle("");
    setDescription("");
    setDestination("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <button onClick={callBackToCloseForm} className="close-button">
        X
      </button>
      <form onSubmit={handleSubmit} className="form">
        <h2>Create a new travel plan 🌍</h2>
        <div className="inputs">
          <label>
            TITLE
            <br></br>
            <input
              type="text"
              placeholder="New Year's Eve Celebration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength="80" // character limit
            />
          </label>

          <label>
            DESCRIPTION
            <br />
            <textarea
              className="textarea"
              placeholder="Seeing my Bachelor's friends to celebrate the new year."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3" // Controls the height of the textarea
              cols="40" // Controls the width of the textarea
              maxLength="350"
            />
          </label>

          <label>
            DESTINATION
            <br></br>
            <input
              type="text"
              placeholder="New York"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </label>

          <div className="dates">
            <label>
              START DATE
              <br></br>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={today} // Set the minimum date to today
              />
            </label>

            <label>
              END DATE
              <br></br>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={today} // Set the minimum date to today
              />
            </label>
          </div>
        </div>
        <button className="submit" type="submit">
          Create plan
        </button>
      </form>
    </>
  );
};

export default CreatePlanForm;
