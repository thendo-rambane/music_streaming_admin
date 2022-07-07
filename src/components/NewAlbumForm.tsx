import { Box, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import Album, { IAlbum } from "../api/Album";
import getGenres from "../helpers/genres";

type Props = {
  onCreated: (album: Album) => void;
  onError: (error: Error) => void;
};

const NewAlbumForm = ({ onCreated, onError }: Props) => {
  const [genres, setGenres] = useState<{ label: string; value: string }[]>(
    getGenres()
  );
  const albumForm = useForm<IAlbum>({
    initialValues: {
      name: "",
      genres: [] as string[],
      art: "",
    },
  });

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

  return (
    <Box>
      <h1>New Album</h1>
      <form>
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
      </form>
    </Box>
  );
};

export default NewAlbumForm;
