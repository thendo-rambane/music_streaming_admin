import {
  Button,
  Grid,
  Group,
  Loader,
  MultiSelect,
  Space,
  TextInput,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import { ReactPropTypes, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "tabler-icons-react";
import Artist from "../../api/Artist";
import getGenres from "../../helpers/genres";
import { CustomiseArtist } from "./CustomiseArtist";

interface INewArtistInfo {
  name: string;
  genres: string[];
}

type Props = {
  onSuccess?: (artist: Artist) => void;
  onError?: () => void;
  onClose?: () => void;
  onAdvance?: () => void;
};

const CreateArtistForm = ({
  onSuccess,
  onClose,
  onAdvance,
  className,
}: Props & React.HTMLAttributes<HTMLFormElement>) => {
  const [artistName, setArtistName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [creatingArtist, setCreatingArtist] = useState(false);
  const [canAdvance, setCanAdvance] = useState(false);

  const [genres, setGenres] = useState<{ label: string; value: string }[]>(
    getGenres()
  );

  function createArtist() {
    setCreatingArtist(true);
    showNotification({
      id: "creating artist",
      loading: true,
      title: "Creating Artist",
      message: "Artist is being created please dont close window",
      autoClose: false,
      disallowClose: true,
    });
    Artist.create({
      name: artistName,
      genres: selectedGenres,
      banner: "",
      avatar: "",
    })
      .then((artist) => {
        setCreatingArtist(false);
        updateNotification({
          id: "creating artist",
          color: "teal",
          title: "Success",
          message: "Artist Created",
          icon: <Check />,
          autoClose: 2000,
        });
        setCanAdvance(true);
        onSuccess && onSuccess(artist);
      })
      .catch((error) => {
        setCreatingArtist(false);
        updateNotification({
          id: "creating artist",
          color: "red",
          title: "Error",
          message: error.message,
          icon: <X />,
          autoClose: 2000,
        });
        setCanAdvance(true);
      });
  }

  return (
    <form className={className}>
      <TextInput
        placeholder="Artist Name"
        label="Artist Name"
        required
        value={artistName}
        onChange={(event) => {
          setArtistName(event.target.value);
        }}
      />
      <MultiSelect
        data={genres}
        label="Artist Genres"
        placeholder="Pick all genres that apply to artist"
        searchable
        limit={20}
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        maxDropdownHeight={160}
        value={selectedGenres}
        onChange={(selectedGenres) => setSelectedGenres([...selectedGenres])}
        onCreate={(query) =>
          setGenres((current) => [
            ...current,
            {
              label: query,
              value: query,
            },
          ])
        }
      />
      <Space h="xs" />
      <Group>
        <Button onClick={createArtist}>
          {creatingArtist ? (
            <Loader color="white" variant="dots" />
          ) : (
            "Create Artist"
          )}
        </Button>
        <Button onClick={() => onAdvance && onAdvance()} disabled={!canAdvance}>
          Next
        </Button>
      </Group>
    </form>
  );
};

export default CreateArtistForm;
