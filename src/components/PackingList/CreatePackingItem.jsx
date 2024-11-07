import { Button, CloseButton } from "@mantine/core";
import { useState, useEffect } from "react";

export default function CreatePackingItem({
  callBackToCloseForm,
  callBackToAddToPackingItem,
}) {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Array of placeholder options
  const placeholderOptions = [
    "Hiking shoes",
    "Sunscreen",
    "Water bottle",
    "Backpack",
    "Snacks for the trail",
  ];
  // Set a random placeholder whenever the component mounts
  useEffect(() => {
    const randomPlaceholder =
      placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    setPlaceholder(randomPlaceholder);
  }, []);

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
          <h2>🕶️ Add new item</h2>
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
          <Button
            type="submit"
            variant="filled"
            color="yellow"
            size="lg"
            radius="md"
            fullwidth
          >
            Add item
          </Button>

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
      </form>
    </>
  );
}
