import { Anchor, Group, ActionIcon, rem, Image } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandMantine,
  IconBrandReact,
  IconManFilled,
} from "@tabler/icons-react";
import "./Footer.css";
import logo from "../../assets/logo.png"

const links = [
  {
    link: "https://github.com/TravelPlannerTeam/TravelPlanner",
    label: " Visit us on Github",
  },
  { link: "https://github.com/nathidaum", label: "Nathi Daum" },
  { link: "https://github.com/MoazMubaydin", label: "Moaz Mubaydin" },
];
export default function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="xs"
      fw={600}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer">
      <div className="inner">

        <Group className="travelplanner-footer">
        <Image
          h={30}
          w="auto"
          fit="contain"
          src={logo}
        />
        <h4 className="footer-title">TravelPlanner</h4>
        </Group>

        <Group>{items}</Group>

        <Group
          className="footer-icons"
          gap="xs"
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            variant="light"
            color="yellow"
            radius="xl"
            aria-label="React"
          >
            <a href="https://react.dev/">
              <IconBrandReact
                style={{
                  width: rem(18),
                  height: rem(18),
                  color: "var(--primary-color)",
                }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="yellow"
            radius="xl"
            aria-label="Teacher Assistant"
          >
            <a href="https://github.com/luisjunco">
              <IconManFilled
                style={{
                  width: rem(18),
                  height: rem(18),
                  color: "var(--primary-color)",
                }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="yellow"
            radius="xl"
            aria-label="Mantine"
          >
            <a href="https://mantine.dev/">
              <IconBrandMantine
                style={{
                  width: rem(18),
                  height: rem(18),
                  color: "var(--primary-color)",
                }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="yellow"
            radius="xl"
            aria-label="GitHub"
          >
            <a href="https://github.com/TravelPlannerTeam/TravelPlanner">
              <IconBrandGithub
                style={{
                  width: rem(18),
                  height: rem(18),
                  color: "var(--primary-color)",
                }}
                stroke={1.5}
              />{" "}
            </a>
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
