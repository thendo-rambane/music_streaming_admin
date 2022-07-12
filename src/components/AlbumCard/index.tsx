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
import Album from "../../api/Album";
import "./style.css";

type Props = { album: Album };

const AlbumCard = ({ album }: Props) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div className="album-card">
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={album.album_art}
            height={160}
            alt="Blank vynil cover with vynil spilling out"
          />
        </Card.Section>
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{album.name}</Text>
          <Badge color="pink" variant="light">
            {album.album_type}
          </Badge>
        </Group>
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component={Link}
          to={`/albums/${album.id}/edit`}
        >
          Edit Album
        </Button>
      </Card>
    </div>
  );
};

export default AlbumCard;
