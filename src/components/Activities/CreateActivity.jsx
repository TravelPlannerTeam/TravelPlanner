import { Button } from "@mantine/core";
import { useState } from "react";

export default function CreateActivity({
  callBackToCloseForm,
  callBackToAddActivity,
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const today = new Date().toISOString().split("T")[0];

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
          <h2>Add a new accommodation</h2>
          <Button
            onClick={callBackToCloseForm}
            variant="subtle"
            color="grey"
            size="lg"
            radius="lg"
          >
            X
          </Button>
        </div>
        <div className="inputs">
          <label>
            Name
            <input
              type="text"
              placeholder="Four Seasons"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          <label>
            Type
            <input
              type="text"
              placeholder="Hotel"
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
                min={today}
              />
            </label>

            <label>
              End
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                min={start || today} // Ensures end date is after start date
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
        >
          Add Activity
        </Button>
      </form>
    </>
  );
}
