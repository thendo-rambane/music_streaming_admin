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
            src="/images/album.jpg"
            height={160}
            alt="Blank vynil cover with vynil spilling out"
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
          View album information
        </Button>
      </Card>
    </div>
  );
};

export default AlbumCard;
