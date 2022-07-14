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
      <Card
        shadow="sm"
        p="lg"
        sx={{
          width: "15vh",
        }}
      >
        <Card.Section>
          <Image
            src={artist.avatar}
            height={"15vh"}
            width={"15vh"}
            alt="Blank vynil cover with vynil spilling out"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text weight={500}>{artist.name}</Text>
        </Group>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component={Link}
          to={`/artists/${artist.id}/edit`}
        >
          Edit
        </Button>
      </Card>
    </div>
  );
};

export default ArtistCard;
