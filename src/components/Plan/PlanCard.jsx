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
import { Link } from "react-router-dom";

const PlanCard = ({ plan, callBackToDeletePlan }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month}`;
  };

  return (
    <Card withBorder radius="lg" p="md" className="card">
      <Card.Section>
        <Image src={plan.image} alt={plan.title} height={180} />
      </Card.Section>

      <Card.Section className="section" mt="md">
        <Group position="apart">
          <Text size="lg" weight={600}>
            {plan.title}
          </Text>
          <Badge size="sm" variant="light" color="yellow">
            {plan.destination}
          </Badge>
        </Group>
        <Text size="sm" mt="xs">
          {plan.description}
        </Text>
        <Text size="sm" mt="xs" color="grey">
          {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Link to={`/${plan.id}`} style={{ flex: 1 }}>
          <Button radius="md" color="grey" fullWidth>
            Show details
          </Button>
        </Link>
        <ActionIcon
          onClick={() => callBackToDeletePlan(plan.id)}
          className="transparent-action-icon"
          radius="md"
          size={36}
        >
          <IconTrash className="delete" stroke={1} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default PlanCard;
