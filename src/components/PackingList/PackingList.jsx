import { Card, Text, Button, Group, List, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import "./packing-list.css";

const PackingList = ({ packingList, callBackToDelete, callBackToUpdate }) => {
  if (packingList === null) return <h3>Loading...</h3>;

  return (
    <List>
      {packingList.map((item) => {
        return (
          <div>
            <List.Item key={item.id} className="packing-list-item">
              <Group
                justify="flex-start"
                mt="md"
                mb="xs"
                className="packing-list-content"
              >
                <Group spacing="xs">
                  <Text fw={600}>{item.name}</Text>
                  {/* <Text size="sm">{item.type}</Text> */}
                </Group>

                <ActionIcon
                  onClick={() => callBackToDelete(item.id)}
                  className="transparent-action-icon"
                  radius="md"
                  size={36}
                >
                  <IconTrash className="delete" stroke={1} />
                </ActionIcon>
              </Group>
            </List.Item>
          </div>
        );
      })}
    </List>
  );
};

export default PackingList;
