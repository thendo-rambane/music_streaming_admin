import React, { ReactNode, useEffect, useRef, useState } from "react";
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
import { Camera } from "tabler-icons-react";
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";

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
}));

interface UserCardImageProps {
  banner: string;
  avatar: string;
  name: string;
  genres: string[];
  className?: string;
}

export function CustomiseArtist({
  banner,
  avatar,
  name,
  genres,
  className,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const avatarRef = useRef<() => void>(null);
  const bannerRef = useRef<() => void>(null);

  const [userBanner, setUserBanner] = useState(banner);
  const [userAvatar, setUserAvatar] = useState(avatar);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(userAvatar);
      URL.revokeObjectURL(userBanner);
    };
  }, []);

  const items = genres.map((genre, index) => (
    <Badge key={index}>{genre}</Badge>
  ));

  return (
    <Card
      withBorder
      p="xl"
      pt="0"
      radius="md"
      className={classes.card + " " + className}
    >
      <Dropzone
        openRef={avatarRef}
        children={(status: DropzoneStatus) => <>{status.accepted}</>}
        onDrop={function (files: File[]): void {
          const url = URL.createObjectURL(files[0]);
          setUserAvatar(url);
          console.log("Acce: ", userAvatar);
        }}
        className={classes.invisible}
      ></Dropzone>
      <Dropzone
        openRef={bannerRef}
        children={(status: DropzoneStatus) => <>{status.accepted}</>}
        onDrop={(files: File[]) => {
          const url = URL.createObjectURL(files[0]);
          setUserBanner(url);
          console.log("Banner: ", url);
        }}
        onReject={(files) => {
          console.log("Reject: ", files);
          // setUserBanner(url);
        }}
        className={classes.invisible}
      ></Dropzone>

      <Card.Section>
        <BackgroundImage
          src={userBanner === "" ? "/images/album.jpg" : userBanner}
          sx={{
            height: 140,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <ThemeIcon color="dark">
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
          <Camera
            onClick={() => {
              if (avatarRef !== null) avatarRef.current && avatarRef.current();
            }}
          />
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
          src={userAvatar}
          size={80}
          radius={80}
          className={classes.avatar}
        />
      </Indicator>
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Group mt="md" position="center">
        {items}
      </Group>
      <Group sx={{ justifyContent: "space-between" }}>
        <Button mt="xl" variant="subtle">
          Skip
        </Button>
        <Button
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === "dark" ? undefined : "dark"}
        >
          Update
        </Button>
      </Group>
    </Card>
  );
}
