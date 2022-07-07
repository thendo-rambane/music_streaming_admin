import { Avatar, createStyles, Indicator } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "tabler-icons-react";
import ImageInput from "./ImageInput";

type Props = {
  onImageChange: (files: File[]) => void;
};

const useStyle = createStyles((theme) => ({
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
    marginTop: -30,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 80,
  },
}));

const ModifiableAvatar = ({ onImageChange }: Props) => {
  const avatarRef = useRef<HTMLInputElement>(null);
  const { classes, theme } = useStyle();
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatarPreview);
    };
  }, []);
  return (
    <Indicator
      label={
        <>
          {/* TODO: ADD Edit for cropping images */}
          <ImageInput
            input={avatarRef}
            onChange={(files) => {
              setAvatarPreview(URL.createObjectURL(files[0]));
              onImageChange(files);
            }}
          />
          <Camera
            onClick={() => {
              console.log(avatarRef);
              if (avatarRef !== null)
                avatarRef.current && avatarRef.current.click();
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
      <Avatar src={avatarPreview} size={80} className={classes.avatar} />
    </Indicator>
  );
};

export default ModifiableAvatar;
