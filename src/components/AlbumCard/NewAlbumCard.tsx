import { Button, Card, Group, Image, ThemeIcon } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import "./style.css";

type Props = {};

const NewAlbumCard = (props: Props) => {
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
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Create Album
        </Button>
      </Card>
    </div>
  );
};

export default NewAlbumCard;
