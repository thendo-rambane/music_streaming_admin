import {
  Card,
  Group,
  Image,
  useMantineTheme,
  Text,
  Badge,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Artist from "../../api/Artist";

type Props = {
  artist: Artist;
};

const ArtistCard = ({ artist }: Props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div className="artist-card">
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={artist.banner}
            height={160}
            alt="Blank vynil cover with vynil spilling out"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{artist.name}</Text>
          <Badge color="pink" variant="light">
            Artist
          </Badge>
        </Group>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component={Link}
          to={`/artists/${artist.id}/edit`}
        >
          Edit Artist
        </Button>
      </Card>
    </div>
  );
};

export default ArtistCard;
