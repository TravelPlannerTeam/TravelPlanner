import { Card, Text, Button, Group, List } from "@mantine/core";

const PackingList = ({ packingList, callBackToDelete, callBackToUpdate }) => {
  if (packingList === null) return <h3>Loading...</h3>;

  return (
    <List>
      {packingList.map((item) => {
        return (
          <List.Item key={item.id}>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{item.name}</Text>
            </Group>

            <Text size="sm">{item.type}</Text>

            <Group>
              <Button
                color="red"
                mt="sm"
                radius="sm"
                onClick={() => callBackToDelete(item.id)}
              >
                Delete
              </Button>
            </Group>
          </List.Item>
        );
      })}
    </List>
  );
};

export default PackingList;
