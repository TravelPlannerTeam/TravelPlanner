import { Button, CloseButton } from "@mantine/core";
import { useState, useEffect } from "react";
import "./accommodation-list.css";

export default function CreateAccommodation({
  callBackToCloseForm,
  callBackToAddAccommodation,
  plan,
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Array of placeholder options
  const placeholderOptions = [
    "Backpacker Hostel",
    "At Luis' apartment",
    "Bob's couch",
    "Four Seasons Hotel",
    "Urban Villas B&B",
    "SunnySide Airbnb",
    "Awesome Camping Side",
  ];

  useEffect(() => {
    const randomPlaceholder =
      placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAccommodation = {
      checkIn: checkIn,
      checkOut: checkOut,
      name: name,
      type: type,
    };
    callBackToAddAccommodation(newAccommodation);
    setName("");
    setType("");
    setCheckIn("");
    setCheckOut("");
    callBackToCloseForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="top">
          <h2>🏡 Add new accommodation</h2>
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
            Name
            <input
              type="text"
              placeholder={placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          <label className="dropdown">
            Select a housing type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Pick category
              </option>
              <option value="Airbnb">Airbnb</option>
              <option value="Bed and Breakfast">Bed and Breakfast</option>
              <option value="Camping">Camping</option>
              <option value="Friends Home">Friends Home</option>
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Resort">Resort</option>
            </select>
          </label>

          <div className="dates">
            <label>
              Check in
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                min={plan.startDate}
              />
            </label>

            <label>
              Check out
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                min={checkIn || plan.startDate} // Ensures end date is after start date
                max={plan.endDate} // cant have an accommodation after the trip is over, can you?
              />
            </label>
          </div>
          <Button
            type="submit"
            variant="filled"
            color="yellow"
            size="lg"
            radius="md"
            fullWidth
          >
            Add accommodation
          </Button>
        </div>
      </form>
    </>
  );
}
