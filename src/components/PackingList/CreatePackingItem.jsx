import { Box, Button } from "@mantine/core";
import { useState } from "react";

export default function CreatePackingItem({
  callBackToCloseForm,
  callBackToAddToPackingItem,
}) {
  const [name, setName] = useState("");
  // const [type, setType] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: name,
      // type: type,
    };
    callBackToAddToPackingItem(newItem);
    setName("");
    // setType("");

    callBackToCloseForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="top">
          <h2>Add a new Item</h2>
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
              placeholder="Hiking shoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength="80"
            />
          </label>

          {/* <label>
            Type
            <textarea
              className="textarea"
              placeholder="day 3 mountine hike"
              value={type}
              onChange={(e) => setType(e.target.value)}
              rows="3"
              cols="40"
              maxLength="80"
            />
          </label> */}
        </div>
        <Button
          type="submit"
          variant="filled"
          color="yellow"
          size="lg"
          radius="md"
        >
          Add Item
        </Button>
        ;
      </form>
    </>
  );
}
