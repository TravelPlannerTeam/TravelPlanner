import { Button, CloseButton } from "@mantine/core";
import { useState } from "react";

export default function Updateactivity({
  callBackToCloseForm,
  callBackToUpdate,
  activity,
  plan,
}) {
  const [name, setName] = useState(activity.name);
  const [type, setType] = useState(activity.type);
  const [start, setStart] = useState(activity.start);
  const [time, setTime] = useState(activity.time);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateActivity = {
      id: activity.id,
      start: start,
      time: time,
      name: name,
      type: type,
    };
    callBackToUpdate(updateActivity);
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
          <h2>🤸‍♀️ Update activity</h2>
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
          Save changes
        </Button>
      </form>
    </>
  );
}
