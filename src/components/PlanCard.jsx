import { IconTrash } from "@tabler/icons-react";
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

const PlanCard = ({ plan, callBackToDeletePlan }) => {
  return (
    <Card withBorder radius="lg" p="md" className="card">
      <Card.Section>
        <Image src={plan.image} alt={plan.title} height={180} />
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

        <ActionIcon onClick={() => callBackToDeletePlan(plan.id)} className="transparent-action-icon" radius="md" size={36}>
          <IconTrash className="delete" stroke={1} />
        </ActionIcon>

      </Group>
    </Card>
  );
};

export default PlanCard;
