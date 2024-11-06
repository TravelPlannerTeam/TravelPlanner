import { Button } from "@mantine/core";
import { CloseButton } from '@mantine/core';
import { useState } from "react";
import axios from "axios";

import "./create-plan-form.css";

import { UNSPLASH_API_URL } from "../../assets/API_URL";

const CreatePlanForm = ({ callBacktoCreatePlan, callBackToCloseForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Fetch image URL from Unsplash
    async function fetchUnsplashPhotos() {
      try {
        const token = "h9klRUI4KbqMlA4Wb2ssyJ3mVCS_eO2vV-0PeftUolE";
        const response = await axios.get(
          `${UNSPLASH_API_URL}?query=${destination}`,
          {
            headers: { Authorization: `Client-ID ${token}` },
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

    const image = await fetchUnsplashPhotos();

    const newPlan = {
      image,
      title,
      description,
      destination,
      startDate,
      endDate,
    };

    callBacktoCreatePlan(newPlan); // Pass new plan to parent

    // Clear all input fields
    setTitle("");
    setDescription("");
    setDestination("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="top">
        <h2>Create a new travel plan</h2>
        <CloseButton
          className="close"
          onClick={callBackToCloseForm}
          variant="subtle"
          color="grey"
          size="lg"
          radius="lg"
        >
        </CloseButton>
        </div>
        <div className="inputs">
          <label>
            TITLE
            <input
              type="text"
              placeholder="New Year's Eve Celebration"
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
              placeholder="Seeing my Bachelor's friends to celebrate the new year."
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
              placeholder="New York"
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
          Create new plan
        </Button>
        ;
      </form>
    </>
  );
};

export default CreatePlanForm;
