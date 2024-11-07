import {
  Card,
  Text,
  Button,
  Group,
  List,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import "./packing-list.css";

const PackingList = ({ packingList, callBackToDelete, callBackToUpdate }) => {
  console.log(packingList);
  return (
    <List>
      {packingList.map((item) => {
        return (
          <div key={item.id}>
            <List.Item className="packing-list-item">
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
