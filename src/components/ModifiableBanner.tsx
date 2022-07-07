import { BackgroundImage, createStyles, ThemeIcon } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "tabler-icons-react";
import ImageInput from "./ImageInput";

const useStyle = createStyles((theme) => ({
  backgroundImage: {
    height: 140,
    display: "flex !important",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },
}));

type Props = { onImageChange: (images: File[]) => void };
const ModifiableBanner = ({ onImageChange }: Props) => {
  const bannerRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const { classes } = useStyle();
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(bannerPreview);
    };
  }, []);
  return (
    <BackgroundImage
      src={bannerPreview === "" ? "/images/album.jpg" : bannerPreview}
      className={classes.backgroundImage}
    >
      <ThemeIcon color="dark">
        {/* TODO: ADD Edit for cropping images */}
        <ImageInput
          input={bannerRef}
          onChange={(files) => {
            setBannerPreview(URL.createObjectURL(files[0]));
            onImageChange(files);
          }}
        />
        <Camera
          onClick={() => {
            if (bannerRef !== null)
              bannerRef.current && bannerRef.current.click();
          }}
        />
      </ThemeIcon>
    </BackgroundImage>
  );
};

export default ModifiableBanner;
