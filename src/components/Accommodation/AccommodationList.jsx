import { Card, Text, Badge, Group, ActionIcon, Loader } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import UpdateAccommodation from "./UpdateAccommodation";
import { useState } from "react";

import "./accommodation-list.css";

export default function AccommodationList({
  accomodationList,
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

  if (!accomodationList) return <Loader color="yellow" size="xl" type="dots" />;

  return (
    <div style={{ width: "100%" }}>
      {accomodationList.map((accommodation) => {
        return (
          <Card
            withBorder
            radius="lg"
            p="md"
            className="accommodation-card"
            key={accommodation.id}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={700}>{accommodation.name}</Text>
              <Badge size="sm" variant="light" color="yellow">
                {accommodation.type}
              </Badge>
            </Group>

            <Group justify="space-between" mt="md" mb="xs">
              <Text size="sm" mt="s" color="grey">
                {formatDate(accommodation.checkIn)} until{" "}
                {formatDate(accommodation.checkOut)}
              </Text>
              <Group justify="flex-end">
                <ActionIcon
                  onClick={() => openUpdateForm(accommodation.id)}
                  color="yellow"
                  radius="md"
                  size={36}
                >
                  <IconEdit className="edit" stroke={1} />
                </ActionIcon>
                <ActionIcon
                  onClick={() => callBackToDelete(accommodation.id)}
                  color="orange"
                  radius="md"
                  size={36}
                >
                  <IconTrash className="delete" stroke={1} />
                </ActionIcon>
              </Group>
            </Group>

            {editingId === accommodation.id && (
              <div className="form-overlay" onClick={closeUpdateForm}>
                <div className="form-box" onClick={(e) => e.stopPropagation()}>
                  <UpdateAccommodation
                    callBackToCloseForm={closeUpdateForm}
                    accommodation={accommodation}
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
