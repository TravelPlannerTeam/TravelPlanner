import { IconEdit, IconTrash } from "@tabler/icons-react";
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
import { useState } from "react";
import EditPlanForm from "../CreatePlan/EditPlanForm";

const PlanCard = ({ plan, callBackToDeletePlan, callBackToEditPlan }) => {
  const [isFormOpen, setIsFormOpen] = useState(false); // per default not visible

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    return `${day} ${month}`;
  };

  const calculateDaysLeft = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const timeDifference = start - today;

    // Convert time difference from milliseconds to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0; // Ensure no negative days
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

        <Group align="center" position="center" mt="md">
          <Text size="sm" color="grey">
            {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
          </Text>

          {calculateDaysLeft(plan.startDate) > 0 && (
          <Badge size="sm" variant="light" color="grey">
            {calculateDaysLeft(plan.startDate)} days left
          </Badge>)}
          {calculateDaysLeft(plan.startDate) <= 0 && (
          <Badge size="sm" variant="light" color="grey">
            Enjoy your stay!
          </Badge>)}

        </Group>
      </Card.Section>

      <Group mt="xs">
        <Link to={`/${plan.id}`} style={{ flex: 1 }}>
          <Button radius="md" color="grey" fullWidth>
            Show details
          </Button>
        </Link>
        <ActionIcon
          onClick={openForm}
          className="transparent-action-icon"
          radius="md"
          size={36}
        >
          <IconEdit className="delete" stroke={1} />
        </ActionIcon>

        {isFormOpen && (
          <div className="form-overlay" onClick={closeForm}>
            <div className="form-box" onClick={(e) => e.stopPropagation()}>
              <EditPlanForm
                callBackToEditPlan={callBackToEditPlan}
                callBackToCloseForm={closeForm}
                plan={plan}
              />
            </div>
          </div>
        )}
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
