import React from "react";
import { User, Disc, Album } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text, Anchor } from "@mantine/core";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link?: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">
          {" "}
          <Anchor href={link ? link : "/"}>{label}</Anchor>
        </Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <User size={16} />,
    color: "blue",
    label: "Artists",
    link: "/artists",
  },
  {
    icon: <Album size={16} />,
    color: "violet",
    label: "Albums",
    link: "/albums",
  },
  { icon: <Disc size={16} />, color: "teal", label: "Songs", link: "/songs" },
  // { icon: <Database size={16} />, color: "grape", label: "Databases" },
];

export default function MainLinks() {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} link={link.link} />
  ));
  return <div>{links}</div>;
}
