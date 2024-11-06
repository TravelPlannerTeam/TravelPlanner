import { Button } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import "./create-plan-form.css";
import { UNSPLASH_API_URL } from "../../assets/API_URL";
import { UNSPLASH_API_TOKEN } from "../../assets/API_URL";
const EditPlanForm = ({ callBackToEditPlan, callBackToCloseForm, plan }) => {
  const [title, setTitle] = useState(plan.title);
  const [description, setDescription] = useState(plan.description);
  const [destination, setDestination] = useState(plan.destination);
  const [startDate, setStartDate] = useState(plan.startDate);
  const [endDate, setEndDate] = useState(plan.endDate);

  const today = new Date().toISOString().split("T")[0];
  async function fetchUnsplashPhotos() {
    try {
      const response = await axios.get(
        `${UNSPLASH_API_URL}?query=${destination}`,
        {
          headers: { Authorization: `Client-ID ${UNSPLASH_API_TOKEN}` },
        }
      );

      // Find the image with the most likes
      const mostLikedImage = response.data.results.reduce((prev, current) => {
        return current.likes > prev.likes ? current : prev;
      });
      return mostLikedImage.urls.regular;
    } catch (error) {
      console.error("Unsplash API error:", error);
      return ""; // Return an empty string if there's an error
    }
  }
  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const image = await fetchUnsplashPhotos();

    const editedPlan = {
      id: plan.id,
      image,
      title,
      description,
      destination,
      startDate,
      endDate,
    };

    callBackToEditPlan(editedPlan); // Pass new plan to parent

    // Clear all input fields
    setTitle("");
    setDescription("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    callBackToCloseForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="top">
          <h2>Edit travel plan</h2>
          <CloseButton
            className="close"
            onClick={callBackToCloseForm}
            variant="subtle"
            color="grey"
            size="lg"
            radius="lg"
          ></CloseButton>
        </div>
        <div className="inputs">
          <label>
            TITLE
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength="30"
            />
          </label>

          <label>
            DESCRIPTION
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              cols="40"
              maxLength="150"
            />
          </label>

          <label>
            DESTINATION
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </label>

          <div className="dates">
            <label>
              START DATE
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={today}
              />
            </label>

            <label>
              END DATE
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={startDate || today} // Ensures end date is after start date
              />
            </label>
          </div>
        </div>
        <Button
          type="submit"
          variant="filled"
          color="yellow"
          size="lg"
          radius="md"
          fullWidth
        >
          Save
        </Button>
        ;
      </form>
    </>
  );
};

export default EditPlanForm;
