import { Card, Text, Button, Group } from "@mantine/core";

const PackingList = ({ packingList, callBackToDelete, callBackToUpdate }) => {
  if (packingList === null) return <h3>Loading...</h3>;

  return (
    <div className="detailsList">
      {packingList.map((item) => {
        return (
          <Card shadow="sm" padding="lg" radius="sm" withBorder key={item.id}>
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
          </Card>
        );
      })}
    </div>
  );
};

export default PackingList;
