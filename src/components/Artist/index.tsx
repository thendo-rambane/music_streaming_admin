import {
  Card,
  Group,
  Image,
  useMantineTheme,
  Text,
  Badge,
  Button,
} from "@mantine/core";

type Props = {};

const ArtistCard = (props: Props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div className="artist-card">
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
          <Text weight={500}>Artist Name</Text>
          <Badge color="pink" variant="light">
            Artist
          </Badge>
        </Group>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="sm">Music on platform</Text>
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
          View artist information
        </Button>
      </Card>
    </div>
  );
};

export default ArtistCard;
