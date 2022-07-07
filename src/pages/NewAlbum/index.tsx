import { Box, Button, Container, Group } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Album from "../../api/Album";
import Artist from "../../api/Artist";
import Song from "../../api/Song";
import NewAlbumForm from "../../components/NewAlbumForm";
import getGenres from "../../helpers/genres";

type Props = {
  album_type: "album" | "single";
};

const NewAlbum = ({ album_type }: Props) => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist>();
  const [album, setAlbum] = useState<Album>();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<{ label: string; value: string }[]>(
    getGenres()
  );

  const onAlbumCreated = (album: Album) => {
    setAlbum(album);
  };
  const onAlbumCreatedError = () => {
    setLoading(false);
  };

  const songForm = useForm({
    initialValues: {
      albumSongs: formList<Song>([]),
    },
  });

  useEffect(() => {
    //get artist by id
    setLoading(true);
    if (id) {
      Artist.getById(id)
        .then((artist) => {
          setArtist(artist);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const fields = songForm.values.albumSongs.map((song, index) => (
    <Group key={randomId()} mt="xs"></Group>
  ));
  return (
    <Container>
      {album === undefined && (
        <NewAlbumForm
          onCreated={onAlbumCreated}
          onError={onAlbumCreatedError}
        />
      )}
      {album !== undefined && (
        <Box>
          <h1>Album Created</h1>
          {/* Some sort of album component with an edit button to transfer to edit album page */}
          <Button>Edit Album</Button>
        </Box>
      )}
      {album && fields}
      {album !== undefined && (
        <Group position="center" mt="md">
          <Button
            onClick={() =>
              songForm.addListItem(
                "albumSongs",
                new Song({
                  name: "",
                  trackNumber: songForm.values.albumSongs.length + 1,
                  url: "",
                })
              )
            }
          >
            Add employee
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default NewAlbum;
