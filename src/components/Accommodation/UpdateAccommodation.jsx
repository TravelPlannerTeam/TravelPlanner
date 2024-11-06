import { Button } from "@mantine/core";
import { useState } from "react";

export default function UpdateAccommodation({
  callBackToCloseForm,
  callBackToUpdate,
  accommodation,
}) {
  const [name, setName] = useState(accommodation.name);
  const [type, setType] = useState(accommodation.type);
  const [checkIn, setCheckIn] = useState(accommodation.checkIn);
  const [checkOut, setCheckOut] = useState(accommodation.checkOut);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateAccommodation = {
      id: accommodation.id,
      checkIn: checkIn,
      checkOut: checkOut,
      name: name,
      type: type,
    };
    callBackToUpdate(updateAccommodation);
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
          <h2>Update accommodation</h2>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          <label>
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Rental">Rental</option>
              <option value="Motel">Motel</option>
              <option value="Bed and Breakfast">Bed and Breakfast</option>
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
                min={today}
              />
            </label>

            <label>
              Check out
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                min={checkIn || today} // Ensures end date is after start date
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
          update Accommodation
        </Button>
      </form>
    </>
  );
}
