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
  const [end, setEnd] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Array of placeholder options
  const placeholderOptions = [
    "Go hiking on a mountain",
    "Go fishing at a lake",
    "Go surfing with friends",
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
      end: end,
      name: name,
      type: type,
    };
    callBackToAddActivity(newActivity);
    setName("");
    setType("");
    setStart("");
    setEnd("");
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
              Start
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                min={plan.startDate}
              />
            </label>

            <label>
              End
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                min={start || plan.startDate} // Ensures end date is after start date
                max={plan.endDate} // cant have an activity after the trip is over, can you?
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
