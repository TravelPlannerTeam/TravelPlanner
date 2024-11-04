import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import "./plancard.css";

const PlanCard = ({ plan }) => {
  return (
    <Card withBorder radius="lg" p="md" className="card">
      <Card.Section>
        <Image src={"https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"} alt={plan.title} height={180} />
      </Card.Section>

      <Card.Section className="section" mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {plan.title}
          </Text>
          <Badge size="sm" variant="light">
            {plan.destination}
          </Badge>
        </Group>
        <Text size="sm" mt="xs">
          {plan.description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className="like" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default PlanCard;