import { useState } from "react";
import { createStyles, Card, Text, Group, Button, Badge } from "@mantine/core";
import { Check, X } from "tabler-icons-react";
import { showNotification, updateNotification } from "@mantine/notifications";
import Artist from "../../api/Artist";
import ModifiableAvatar from "../ModifiableAvatar";
import ModifiableBanner from "../ModifiableBanner";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 0,
    borderRadius: theme.radius.xl,
  },

  button: {
    radius: theme.radius.md,
    marginTop: theme.spacing.xl,
    color: theme.colorScheme === "dark" ? undefined : "dark",
  },
}));

interface UserCardImageProps {
  artist: Artist;
  className?: string;
  onAdvance?: () => void;
}
export function CustomiseArtist({
  artist,
  className,
  onAdvance,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const [banner, setBanner] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [canAdvance, setCanAdvance] = useState(false);
  const [imagesUpdated, setImagesUpdated] = useState(false);
  function showUpdatingArtistNotification() {
    showNotification({
      id: "update artist images",
      loading: true,
      title: "Updating Artist Images",
      message: "Artist images are being please dont close window",
      autoClose: false,
      disallowClose: true,
    });
  }
  function imagesUploaded() {
    setImagesUpdated(false);
    setCanAdvance(true);
    updateNotification({
      id: "update artist images",
      color: "teal",
      title: "Success",
      message: "Images Updated",
      icon: <Check />,
      autoClose: 2000,
    });
  }
  function imageUploadError(error: Error) {
    updateNotification({
      id: "update artist images",
      color: "red",
      title: "Error",
      message: error.message,
      icon: <X />,
      autoClose: 2000,
    });
  }
  function updateArtist() {
    showUpdatingArtistNotification();
    artist &&
      artist
        .addImages({
          banner,
          avatar,
        })
        .then(() => {
          imagesUploaded();
        })
        .catch((error) => {
          imageUploadError(error);
        });
  }

  function uploadBanner(file: File) {
    setImagesUpdated(true);
    setCanAdvance(false);
    setBanner(file);
  }
  function uploadAvatar(file: File) {
    setImagesUpdated(true);
    setCanAdvance(false);
    setAvatar(file);
  }

  return (
    <Card withBorder className={classes.card + " " + className}>
      <Card.Section>
        <ModifiableBanner
          onImageChange={([file]) => {
            uploadBanner(file);
          }}
        />
      </Card.Section>
      <ModifiableAvatar
        onImageChange={([file]) => {
          uploadAvatar(file);
        }}
      />
      <Text align="center" size="lg" weight={500} mt="sm">
        {artist.name}
      </Text>
      <Group mt="md" position="center">
        {artist.genres.map((genre, index) => (
          <Badge key={index}>{genre}</Badge>
        ))}
      </Group>
      <Group sx={{ justifyContent: "space-between" }}>
        <Button mt="xl" variant="subtle" onClick={onAdvance}>
          Skip
        </Button>
        {!canAdvance ? (
          <Button
            size="md"
            className={classes.button}
            onClick={updateArtist}
            disabled={!imagesUpdated}
          >
            Update
          </Button>
        ) : (
          <Button size="md" className={classes.button} onClick={onAdvance}>
            Next
          </Button>
        )}
      </Group>
    </Card>
  );
}
