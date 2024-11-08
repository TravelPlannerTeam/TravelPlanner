import { Button, CloseButton } from "@mantine/core";
import { useState, useEffect } from "react";

export default function CreateActivity({
  callBackToCloseForm,
  callBackToAddActivity,
  plan,
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [start, setStart] = useState("");
  const [time, setTime] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Array of placeholder options
  const placeholderOptions = [
    "Go hiking on a mountain",
    "Go fishing at a lake",
    "Go surfing with friendss",
    "Visit a museum",
    "Dinner at a fancy restaurant",
  ];

  // Set a random placeholder whenever the component mounts
  useEffect(() => {
    const randomPlaceholder =
      placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      start: start,
      time: time,
      name: name,
      type: type,
    };
    callBackToAddActivity(newActivity);
    setName("");
    setType("");
    setStart("");
    setTime("");
    callBackToCloseForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="top">
          <h2>🪂 Add new activity</h2>
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
            Title
            <input
              type="text"
              placeholder={placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          <label>
            Details
            <input
              type="text"
              placeholder="Some more details..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          <div className="dates">
            <label>
              Date
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                min={plan.startDate}
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
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
          Add activity
        </Button>
      </form>
    </>
  );
}
