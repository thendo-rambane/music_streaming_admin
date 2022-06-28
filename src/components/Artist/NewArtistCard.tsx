import { Button, Card, Image } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {};

const NewArtistCard = (props: Props) => {
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
        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component={Link}
          to="create"
        >
          Create Artist
        </Button>
      </Card>
    </div>
  );
};

export default NewArtistCard;
