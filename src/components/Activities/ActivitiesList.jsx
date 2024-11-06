import { Card, Text, Button, Group } from "@mantine/core";
import { useState } from "react";
import Updateactivity from "./UpdateActivity";

export default function ActivitiesList({
  activitiesList,
  callBackToDelete,
  callBackToUpdate,
}) {
  const [editingId, setEditingId] = useState(null); // saving id of the item being updated

  const openUpdateForm = (id) => setEditingId(id);
  const closeUpdateForm = () => setEditingId(null);
  if (activitiesList === null) return <h3>Loading...</h3>;

  return (
    <div className="detailsList">
      {activitiesList.map((activity) => {
        return (
          <Card
            shadow="sm"
            padding="lg"
            radius="sm"
            withBorder
            key={activity.id}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{activity.name}</Text>
            </Group>

            <Text size="sm">{activity.type}</Text>
            <Text>Start Date: {activity.start}</Text>
            <Text>End Date: {activity.end}</Text>
            <Group>
              <Button
                color="blue"
                mt="sm"
                radius="sm"
                onClick={() => openUpdateForm(activity.id)}
              >
                Edit
              </Button>
              {editingId === activity.id && (
                <div className="form-overlay" onClick={closeUpdateForm}>
                  <div
                    className="form-box"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Updateactivity
                      callBackToCloseForm={closeUpdateForm}
                      activity={activity}
                      callBackToUpdate={callBackToUpdate}
                    />
                  </div>
                </div>
              )}
              <Button
                color="red"
                mt="sm"
                radius="sm"
                onClick={() => callBackToDelete(activity.id)}
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
