import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GripVertical, Trash } from "tabler-icons-react";
import Album from "../../api/Album";
import Artist from "../../api/Artist";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Song, { ISong } from "../../api/Song";
import NewAlbumForm from "../../components/NewAlbumForm";
import getGenres from "../../helpers/genres";

const useStyle = createStyles((theme) => ({
  albumArt: {
    width: "100%",
    height: "100%",
  },
}));

type Props = {
  album_type: "album" | "single";
};

const NewAlbum = ({ album_type }: Props) => {
  const { id } = useParams();
  const { classes, theme } = useStyle();
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
      albumSongs: formList<ISong>([]),
    },
  });

  useEffect(() => {
    //get artist by id
    setLoading(true);
    if (id) {
      Artist.getById(id)
        .then((artist) => {
          setArtist(artist);
          console.log("Artist: ", artist);
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
    <Draggable key={index} index={index} draggableId={`${randomId()}`}>
      {(provided) => (
        <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              // alignItems: "center",
            }}
          >
            <Grid.Col span={1}>
              <Center {...provided.dragHandleProps}>
                <GripVertical size={18} />
              </Center>
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Track Number"
                defaultValue={index + 1}
                disabled
                value={index + 1}
                onChange={(value) => {
                  if (value)
                    songForm.setListItem("albumSongs", index, {
                      ...song,
                      track_number: value,
                    });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Song Name"
                placeholder={`Name of track ${song.track_number}`}
                {...songForm.getListInputProps("albumSongs", index, "name")}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <ActionIcon
                color="red"
                variant="hover"
                onClick={() => songForm.removeListItem("albumSongs", index)}
              >
                <Trash size={18} />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Group>
      )}
    </Draggable>
  ));
  return (
    <Container>
      {album === undefined && artist !== undefined && (
        <NewAlbumForm
          onCreated={onAlbumCreated}
          onError={onAlbumCreatedError}
          artist={artist}
          album_type={album_type}
        />
      )}
      {album !== undefined && (
        <Box>
          <h1>Album Created</h1>
          <Grid>
            <Grid.Col span={4}>
              <Avatar
                className={classes.albumArt}
                src={"/" + album.album_art}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              {artist && (
                <Box>
                  <Grid>
                    <Grid.Col span={2}>
                      <Avatar
                        className={classes.albumArt}
                        src={"/" + artist.avatar}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text>{artist.name}</Text>
                    </Grid.Col>
                  </Grid>
                </Box>
              )}
              <Text>{album.name}</Text>
              {album.released_date && (
                <Text>
                  {new Date(album.released_date).getFullYear().toString()}
                </Text>
              )}
              <Text>
                {album.genres.map((genre, index) => (
                  <Badge key={index}>{genre}</Badge>
                ))}
              </Text>
            </Grid.Col>
          </Grid>
          {/* Some sort of album component with an edit button to transfer to edit album page */}
          <Button>Edit Album</Button>
        </Box>
      )}
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          songForm.reorderListItem("albumSongs", {
            from: source.index,
            to: (destination && destination.index) || source.index,
          })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {album && fields}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {album !== undefined && (
        <Group position="center" mt="md">
          <Button
            onClick={() =>
              songForm.addListItem("albumSongs", {
                name: "",
                track_number: songForm.values.albumSongs.length + 1,
                href: "",
              })
            }
          >
            Add Track
          </Button>
        </Group>
      )}
    </Container>
  );
};

export default NewAlbum;
