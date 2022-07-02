import React, { useEffect, useRef, useState } from "react";
import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Badge,
  Indicator,
  ThemeIcon,
  BackgroundImage,
} from "@mantine/core";
import { Camera, Check, X } from "tabler-icons-react";
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import Artist from "../../api/Artist";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  invisible: {
    display: "none",
  },

  avatarContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    marginLeft: "calc(50% - 40px)",
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },

  backroundImage: {
    height: 140,
    display: "flex !important",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
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
  const avatarRef = useRef<() => void>(null);
  const bannerRef = useRef<() => void>(null);
  const [banner, setBanner] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const [canAdvance, setCanAdvance] = useState(false);
  const [imagesUpdated, setImagesUpdated] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(artist.banner);
  const [avatarPreview, setAvatarPreview] = useState(artist.avatar);
  function updateArtist() {
    showNotification({
      id: "update artist images",
      loading: true,
      title: "Updating Artist Images",
      message: "Artist images are being please dont close window",
      autoClose: false,
      disallowClose: true,
    });
    artist
      .addImages({
        banner,
        avatar,
      })
      .then((artist) => {
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
      })
      .catch((error) => {
        updateNotification({
          id: "update artist images",
          color: "red",
          title: "Error",
          message: error.message,
          icon: <X />,
          autoClose: 2000,
        });
      });
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatarPreview);
      URL.revokeObjectURL(bannerPreview);
    };
  }, []);

  const items = artist.genres.map((genre, index) => (
    <Badge key={index}>{genre}</Badge>
  ));
  interface FileUploadProps {
    openRef?: React.ForwardedRef<() => void | undefined>;
    onDrop: (files: File[]) => void;
  }

  function FileUpload({ openRef: ref, onDrop: cb }: FileUploadProps) {
    return (
      <>
        <Dropzone
          openRef={ref}
          children={(status: DropzoneStatus) => <>{status.accepted}</>}
          onDrop={(files) => {
            setImagesUpdated(true);
            setCanAdvance(false);
            cb(files);
          }}
          className={classes.invisible}
        ></Dropzone>
      </>
    );
  }

  function uploadBanner(file: File) {
    setBannerPreview(URL.createObjectURL(file));
    setBanner(file);
  }
  function uploadAvatar(file: File) {
    setAvatarPreview(URL.createObjectURL(file));
    setAvatar(file);
  }

  return (
    <Card
      withBorder
      p="xl"
      pt="0"
      radius="md"
      className={classes.card + " " + className}
    >
      {<></>}
      <Card.Section>
        <BackgroundImage
          src={bannerPreview === "" ? "/images/album.jpg" : bannerPreview}
          className={classes.backroundImage}
        >
          <ThemeIcon color="dark">
            <FileUpload
              openRef={bannerRef}
              onDrop={([file]) => {
                uploadBanner(file);
              }}
            />
            <Camera
              onClick={() => {
                if (bannerRef !== null)
                  bannerRef.current && bannerRef.current();
              }}
            />
          </ThemeIcon>
        </BackgroundImage>
      </Card.Section>
      <Indicator
        label={
          <>
            <FileUpload
              openRef={avatarRef}
              onDrop={([file]) => {
                uploadAvatar(file);
              }}
            />
            <Camera
              onClick={() => {
                if (avatarRef !== null)
                  avatarRef.current && avatarRef.current();
              }}
            />
          </>
        }
        inline
        size={24}
        offset={7}
        position="bottom-end"
        color="black"
        withBorder
        className={classes.avatarContainer}
      >
        <Avatar
          mt={-30}
          mx="auto"
          src={avatarPreview}
          size={80}
          radius={80}
          className={classes.avatar}
        />
      </Indicator>
      <Text align="center" size="lg" weight={500} mt="sm">
        {artist.name}
      </Text>
      <Group mt="md" position="center">
        {items}
      </Group>
      <Group sx={{ justifyContent: "space-between" }}>
        <Button mt="xl" variant="subtle">
          Skip
        </Button>
        {!canAdvance ? (
          <Button
            radius="md"
            mt="xl"
            size="md"
            color={theme.colorScheme === "dark" ? undefined : "dark"}
            onClick={updateArtist}
            disabled={!imagesUpdated}
          >
            Update
          </Button>
        ) : (
          <Button
            radius="md"
            mt="xl"
            size="md"
            color={theme.colorScheme === "dark" ? undefined : "dark"}
            onClick={onAdvance}
          >
            Next
          </Button>
        )}
      </Group>
    </Card>
  );
}
