import {
  Badge,
  Box,
  Button,
  createStyles,
  Group,
  Loader,
  Notification,
} from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Album from "../../api/Album";
import { ISong } from "../../api/Song";
import AlbumCard from "../../components/AlbumCard";
import ArtistCard from "../../components/Artist";
import { randomId } from "@mantine/hooks";
import { Check, Upload, X } from "tabler-icons-react";
import SongFormItem, { SongFormItemEvent } from "./SongFormItem";

const useStyle = createStyles((theme) => ({
  artistList: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    // gridTemplateRows: "repeat(2, 1fr)",
    gap: `${theme.spacing.sm}px`,
    height: "80%",
  },
  albumArt: {
    width: "100%",
    height: "100%",
  },
  albumInfoContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
    gap: `${theme.spacing.sm}px`,
  },
  container: {
    display: "flex",
    flexFlow: "column",
    alignContent: "center",
    alignItems: "flex-start",
  },
}));

type UploadStatus = "uploading" | "success" | "error" | undefined;
interface ITrackUploadStatus {
  [index: number]: UploadStatus;
}

type Props = {};

const EditAlbum = (props: Props) => {
  const { id } = useParams();
  const { classes } = useStyle();
  const songRef = useRef<HTMLInputElement[]>([]);
  const [uploadStatus, setUploadStatus] = useState<ITrackUploadStatus>({});

  //Get Album by id
  const [album, setAlbum] = React.useState<Album | null>(null);
  const [newSongs, setNewSongs] = React.useState<ISong[]>([]);
  const [songs, setSongs] = React.useState<ISong[]>([]);
  useEffect(() => {
    if (id) {
      Album.getById(id)
        .then((album) => {
          console.log(album);
          setAlbum(album);
          setSongs(
            album.songs.map((song) => ({
              name: song.name,
              id: song.id,
              track_number: song.track_number,
              href: song.href,
              album: null,
            }))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const songForm = useForm({
    initialValues: {
      albumSongs: formList<ISong>([]),
    },
  });

  function upload() {
    newSongs.map((song) => {
      setUploadStatus((uploadStatus) => ({
        ...uploadStatus,
        [song.track_number]: "uploading",
      }));
    });

    // songs.map((song) => {
    //   setUploadStatus((uploadStatus) => ({
    //     ...uploadStatus,
    //     [song.track_number]: "uploading",
    //   }));
    // });
    if (album) {
      newSongs.map((song) => {
        return album
          .addSong(song)
          .then((song) => {
            setUploadStatus((uploadStatus) => ({
              ...uploadStatus,
              [song.track_number]: "success",
            }));
            console.log(uploadStatus);
          })
          .catch((err) => {
            setUploadStatus((uploadStatus) => ({
              ...uploadStatus,
              [song.track_number]: "error",
            }));
            console.log(uploadStatus);
          });
      });
    }
  }
  function deleteOldSongField(index: number) {
    console.log("index: ", index);
    setSongs((songs) => {
      const newSongs = [...songs];
      newSongs.splice(index, 1);
      return newSongs;
    });
  }
  function deleteNewSongField(index: number) {
    console.log("index: ", index);
    setNewSongs((songs) => {
      const newSongs = [...songs];
      newSongs.splice(index, 1);
      return newSongs;
    });
  }
  useEffect(() => {
    console.log(newSongs);
  }, [newSongs]);
  function handleNewFormChange(event: SongFormItemEvent, index: number) {
    const songs = [...newSongs];
    songs[index][event.name] = event.value;
    setNewSongs(songs);
  }
  function handleOldFormChange(event: SongFormItemEvent, index: number) {
    const oldSongs = [...songs];
    oldSongs[index][event.name] = event.value;
    setSongs(oldSongs);
  }

  const oldFields = songs.map((song, index) => {
    return (
      <div key={song.id}>
        <SongFormItem
          value={song}
          onChange={(event) => handleOldFormChange(event, index)}
          onDelete={() => deleteOldSongField(index)}
        />
        <div key={`${song.id}-NOT`}>
          {uploadStatus[song.track_number] === "uploading" && (
            <Notification
              loading={uploadStatus[song.track_number] === "uploading"}
              title="Uploading Song"
              disallowClose
            ></Notification>
          )}
          {uploadStatus[song.track_number] === "success" && (
            <Notification
              icon={<Check size={18} />}
              color="teal"
              title="Teal notification"
            >
              This is teal notification with icon
            </Notification>
          )}
          {uploadStatus[song.track_number] === "error" && (
            <Notification icon={<X size={18} />} color="red">
              Bummer! Notification without title
            </Notification>
          )}
        </div>
      </div>
    );
  });
  const fields = newSongs.map((song, index) => {
    return (
      <div key={index}>
        <SongFormItem
          value={song}
          onChange={(event) => handleNewFormChange(event, index)}
          onDelete={() => deleteNewSongField(index)}
        />
        <div>
          {uploadStatus[song.track_number] === "uploading" && (
            <Notification
              loading={uploadStatus[song.track_number] === "uploading"}
              title="Uploading Song"
              disallowClose
            ></Notification>
          )}
          {uploadStatus[song.track_number] === "success" && (
            <Notification
              icon={<Check size={18} />}
              color="teal"
              title="Upload Successful"
            ></Notification>
          )}
          {uploadStatus[song.track_number] === "error" && (
            <Notification
              icon={<X size={18} />}
              color="red"
              title="Upload Error"
            ></Notification>
          )}
        </div>
      </div>
    );
  });
  return (
    <Box className={classes.container}>
      {album && (
        <Box className={classes.albumInfoContainer}>
          <div>
            <h1>{album.name}</h1>
            <AlbumCard album={album} />
          </div>
          <div>
            <h1>Artists</h1>
            <div className={classes.artistList}>
              {album.artists.map((artist) => {
                return <ArtistCard key={artist.id} artist={artist} />;
              })}
            </div>
          </div>
        </Box>
      )}

      <div>{album && oldFields}</div>
      <div>{album && fields}</div>
      {album !== null && (
        <Group position="center" mt="md">
          <Button
            onClick={() =>
              setNewSongs((newSongs) => {
                return [
                  ...newSongs,
                  {
                    name: "",
                    track_number: songs.length + newSongs.length + 1,
                    href: "",
                    album: null,
                  },
                ];
              })
            }
          >
            Add Track
          </Button>
          <Button
            leftIcon={<Upload size={16} />}
            onClick={() => {
              upload();
            }}
          >
            Upload All
          </Button>
        </Group>
      )}
    </Box>
  );
};

export default EditAlbum;
