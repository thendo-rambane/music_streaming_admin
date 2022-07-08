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
import { useEffect, useRef, useState } from "react";
import Album, { IAlbum } from "../api/Album";
import getGenres from "../helpers/genres";
import { Camera } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import CropImageInput from "./CropImageInput";
import { z } from "zod";
import Artist from "../api/Artist";

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
  albumFormContainer: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  albumFormSubmit: {
    width: "20%",
    marginTop: theme.spacing.lg,
  },
}));

const formSchema = z.object({
  name: z.string(),
  artist: z.string(),
  releaseDate: z.date(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  albumArtFile: z.instanceof(Blob),
});

type Props = {
  onCreated: (album: Album) => void;
  onError: (error: Error) => void;
  artist?: Artist;
  album_type: string;
};
const NewAlbumForm = ({ onCreated, onError, artist, album_type }: Props) => {
  const { classes } = useStyle();
  const [genres, setGenres] = useState<{ label: string; value: string }[]>(
    getGenres()
  );
  const [originalFile, setOriginalFile] = useState("");
  const [albumForm, setAlbumForm] = useState<IAlbum>({
    name: "",
    genres: [] as string[],
    album_art: "",
    albumArtFile: undefined,
    release_date: null,
    album_type,
  });
  const albumArtRef = useRef<HTMLInputElement>(null);

  function onSubmit(album: IAlbum) {
    artist &&
      artist
        .addAlbum(album)
        .then((createdAlbum) => {
          onCreated(createdAlbum);
        })
        .catch((error) => {
          onError(error);
        })
        .finally(() => {
          // albumForm.reset();
        });
  }

  //Use effect for on component unmount
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(originalFile);
    };
  }, []);

  return (
    <Box className={classes.albumFormContainer}>
      <h1>New Album</h1>
      <form className={classes.albumForm}>
        <Box>
          <Indicator
            label={
              <>
                <CropImageInput
                  inputRef={albumArtRef}
                  onChange={(file) => {
                    if (file !== null) {
                      const fileUrl = URL.createObjectURL(file);
                      setOriginalFile(fileUrl);
                    }
                    if (file !== null) {
                      setAlbumForm((values) => {
                        return {
                          ...values,
                          albumArtFile: file,
                        };
                      });
                    }
                  }}
                />
                {
                  <Camera
                    onClick={() => {
                      if (albumArtRef !== null)
                        albumArtRef.current && albumArtRef.current.click();
                    }}
                  />
                }
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
            value={albumForm.name}
            onChange={(e) => {
              setAlbumForm((values) => {
                return {
                  ...values,
                  name: e.target.value,
                };
              });
            }}
          />
          <MultiSelect
            data={genres}
            required
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
            value={albumForm.genres}
            onChange={(new_values) => {
              setAlbumForm((values) => {
                return {
                  ...values,
                  genres: values.genres.concat(
                    new_values.filter((genre) => !values.genres.includes(genre))
                  ),
                };
              });
            }}
          />
          <DatePicker
            label="Release Date"
            value={albumForm.release_date}
            required
            onChange={(value) =>
              value &&
              setAlbumForm((values) => {
                return {
                  ...values,
                  release_date: value,
                };
              })
            }
          />
          {/*TODO: Date picker for release date */}
        </Box>
        {/*TODO: Submit button  */}
      </form>
      <Button
        className={classes.albumFormSubmit}
        onClick={() => {
          onSubmit(albumForm);
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default NewAlbumForm;
