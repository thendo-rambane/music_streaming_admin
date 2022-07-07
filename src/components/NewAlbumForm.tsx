import {
  Avatar,
  Box,
  Button,
  createStyles,
  Indicator,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { useEffect, useRef, useState } from "react";
import Album, { IAlbum } from "../api/Album";
import getGenres from "../helpers/genres";
import ImageInput from "./ImageInput";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Camera, Pencil } from "tabler-icons-react";

type Props = {
  onCreated: (album: Album) => void;
  onError: (error: Error) => void;
};

const useStyle = createStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    marginRight: "2rem",
  },
  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
    marginLeft: "auto",
    width: "20vh",
    height: "20vh",
  },
  albumForm: {
    display: "flex",
    flexFlow: "row",
  },
}));

const NewAlbumForm = ({ onCreated, onError }: Props) => {
  const { classes, theme } = useStyle();
  const [genres, setGenres] = useState<{ label: string; value: string }[]>(
    getGenres()
  );
  const [originalFile, setOriginalFile] = useState("");
  const albumArtRef = useRef<HTMLInputElement>(null);
  const modals = useModals();
  const albumForm = useForm<IAlbum>({
    initialValues: {
      name: "",
      genres: [] as string[],
      albumArt: "",
      albumArtFile: undefined,
    },
  });

  /**Crop hooks */
  interface ReactCropperElement extends HTMLImageElement {
    cropper?: Cropper;
  }
  const cropperRef = useRef<ReactCropperElement>(null);
  const [croppedImg, setCroppedImg] = useState("");
  const onCrop = () => {
    const imageElement = cropperRef.current && cropperRef.current;
    if (imageElement !== null) {
      const cropper = imageElement.cropper && imageElement.cropper;
      if (cropper !== undefined) {
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
          if (blob !== null) {
            albumForm.setFieldValue("albumArtFile", blob);
          }
        });
        setCroppedImg(canvas.toDataURL());
      }
    }
  };
  /**Crop hooks */

  //Use effect for on component unmount
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(originalFile);
    };
  }, []);

  const addImage = () => {};

  const onSubmit = () => {
    albumForm.onSubmit((album, event) => {
      event.preventDefault();
      Album.create(album)
        .then((createdAlbum) => {
          onCreated(createdAlbum);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          albumForm.reset();
        });
    });
  };
  /**
   *  TODO: ADD desired width height for aspect changes
   *
   *
   * @param image - The image to be cropped
   * @returns void
   */
  const openImageCropModal = (image: string) => {
    const modal_id = modals.openModal({
      title: "Crop Image",
      children: (
        <div>
          {image !== "" ? (
            <Cropper
              src={image}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              responsive={true}
              autoCropArea={1}
              aspectRatio={1}
              checkOrientation={false}
            />
          ) : (
            <h1>No Image Selected</h1>
          )}
          <Button onClick={() => modals.closeModal(modal_id)}>Set Image</Button>
          <Button
            onClick={() => {
              modals.closeModal(modal_id);
              if (albumArtRef !== null)
                albumArtRef.current && albumArtRef.current.click();
            }}
          >
            Change Image
          </Button>
        </div>
      ),
    });
  };
  return (
    <Box>
      <h1>New Album</h1>
      <form className={classes.albumForm}>
        <Box>
          <Indicator
            label={
              <>
                <ImageInput
                  input={albumArtRef}
                  onChange={(files) => {
                    // URL.revokeObjectURL(originalFile);
                    const image = URL.createObjectURL(files[0]);
                    if (files.length > 0) {
                      setOriginalFile(image);
                      console.log("Album Preview: ", image);
                    }
                    openImageCropModal(image);
                  }}
                />
                {originalFile === "" ? (
                  <Camera
                    onClick={() => {
                      if (albumArtRef !== null)
                        albumArtRef.current && albumArtRef.current.click();
                    }}
                  />
                ) : (
                  <Pencil
                    onClick={() => {
                      openImageCropModal(originalFile);
                    }}
                  />
                )}
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
            <Avatar src={originalFile} size={80} className={classes.avatar} />
          </Indicator>
        </Box>
        <Box>
          <TextInput
            required
            label="Name"
            placeholder="Album Name"
            {...albumForm.getInputProps("name")}
          />
          <MultiSelect
            data={genres}
            label="Album Genres"
            placeholder="Pick all genres that apply to album"
            searchable
            limit={20}
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            maxDropdownHeight={160}
            onCreate={(query) =>
              setGenres((current) => [
                ...current,
                {
                  label: query,
                  value: query,
                },
              ])
            }
            {...albumForm.getInputProps("genres")}
          />
          {/*TODO: Date piccker for release date */}
        </Box>
        {/*TODO: Submit button  */}
      </form>
    </Box>
  );
};

export default NewAlbumForm;
