import {
  Card,
  Group,
  Image,
  useMantineTheme,
  Text,
  Badge,
  Button,
} from "@mantine/core";
import "./style.css";

type Props = {};

const AlbumCard = (props: Props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div className="album-card">
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>Album Name</Text>
          <Badge color="pink" variant="light">
            Album
          </Badge>
        </Group>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="sm">Artist Name, Artist Name</Text>
          <Badge color="blue" variant="light">
            {new Date().getFullYear()}
          </Badge>
        </Group>
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Book classic tour now
        </Button>
      </Card>
    </div>
  );
};

export default AlbumCard;
