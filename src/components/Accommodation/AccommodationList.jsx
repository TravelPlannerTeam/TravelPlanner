import { Card, Text, Button, Group } from "@mantine/core";
import UpdateAccommodation from "./UpdateAccommodation";
import { useState } from "react";

export default function AccommodationList({
  accomodationList,
  callBackToDelete,
  callBackToUpdate,
}) {
  const [editingId, setEditingId] = useState(null); // saving id of the item being updated

  const openUpdateForm = (id) => setEditingId(id);
  const closeUpdateForm = () => setEditingId(null);
  if (accomodationList === null) return <h3>Loading...</h3>;

  return (
    <div className="detailsList">
      {accomodationList.map((accommodation) => {
        return (
          <Card
            shadow="sm"
            padding="lg"
            radius="sm"
            withBorder
            key={accommodation.id}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{accommodation.name}</Text>
            </Group>

            <Text size="sm">{accommodation.type}</Text>
            <Text>Check in: {accommodation.checkIn}</Text>
            <Text>Check Out: {accommodation.checkOut}</Text>
            <Group>
              <Button
                color="blue"
                mt="sm"
                radius="sm"
                onClick={() => openUpdateForm(accommodation.id)}
              >
                Edit
              </Button>
              {editingId === accommodation.id && (
                <div className="form-overlay" onClick={closeUpdateForm}>
                  <div
                    className="form-box"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <UpdateAccommodation
                      callBackToCloseForm={closeUpdateForm}
                      accommodation={accommodation}
                      callBackToUpdate={callBackToUpdate}
                    />
                  </div>
                </div>
              )}
              <Button
                color="red"
                mt="sm"
                radius="sm"
                onClick={() => callBackToDelete(accommodation.id)}
              >
                Delete
              </Button>
            </Group>
          </Card>
        );
      })}
    </div>
  );
}
