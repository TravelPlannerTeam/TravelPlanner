import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandMantine,
  IconBrandReact,
  IconManFilled,
  IconMoodNerd,
  IconBrandSuperhuman,
  IconMan,
} from "@tabler/icons-react";
import "./Footer.css";

const links = [
  {
    link: "https://github.com/TravelPlannerTeam/TravelPlanner",
    label: "Visit us on github",
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
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer">
      <div className="inner">
        <Group>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <a href="https://react.dev/">
              <IconBrandReact
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <a href="https://github.com/luisjunco">
              <IconManFilled
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <a href="https://mantine.dev/">
              <IconBrandMantine
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </a>
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <a href="https://github.com/TravelPlannerTeam/TravelPlanner">
              <IconBrandGithub
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />{" "}
            </a>
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
