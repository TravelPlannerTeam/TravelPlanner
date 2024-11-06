import { Card, Text, Group, ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import Updateactivity from "./UpdateActivity";

import "./activities.css";

export default function ActivitiesList({
  activitiesList,
  callBackToDelete,
  callBackToUpdate,
}) {
  const [editingId, setEditingId] = useState(null); // saving id of the item being updated

  const openUpdateForm = (id) => setEditingId(id);
  const closeUpdateForm = () => setEditingId(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month}`;
  };

  if (activitiesList === null) return <h3>Loading...</h3>;

  return (
    <div className="detailsList" style={{ width: '100%' }}>
      {activitiesList.map((activity) => {
        return (
          <Card
            withBorder
            radius="lg"
            p="md"
            className="activity-card"
            key={activity.id}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={700}>{activity.name}</Text>
            </Group>

            <Text size="sm">{activity.type}</Text>

            <Group justify="space-between" mt="md" mb="xs">

              <Text size="sm" mt="s" color="grey">
                {formatDate(activity.start)} until {formatDate(activity.end)}
              </Text>
              <Group justify="flex-end">
                <ActionIcon
                  onClick={() => openUpdateForm(activity.id)}
                  color="yellow"
                  radius="md"
                  size={36}
                >
                  <IconEdit className="edit" stroke={1} />
                </ActionIcon>
                <ActionIcon
                  onClick={() => callBackToDelete(activity.id)}
                  color="orange"
                  radius="md"
                  size={36}
                >
                  <IconTrash className="delete" stroke={1} />
                </ActionIcon>
              </Group>
            </Group>

            {editingId === activity.id && (
              <div className="form-overlay" onClick={closeUpdateForm}>
                <div className="form-box" onClick={(e) => e.stopPropagation()}>
                  <Updateactivity
                    callBackToCloseForm={closeUpdateForm}
                    activity={activity}
                    callBackToUpdate={callBackToUpdate}
                  />
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
