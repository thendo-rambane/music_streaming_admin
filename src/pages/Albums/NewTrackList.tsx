import { Button, createStyles, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Upload } from "tabler-icons-react";
import Album from "../../api/Album";
import { ISong } from "../../api/Song";
import SongFormItem, { SongFormItemEvent } from "./SongForm";
import UploadStatusNotification, {
  UploadStatus,
} from "./UploadStatusNotification";

const useStyle = createStyles((theme) => ({
  trackListItem: {
    border: "1px solid #ccc",
    margin: theme.spacing.md,
    "&:": {
      backgroundColor: theme.colors.gray[7],
    },
  },
}));

interface ITrackUploadStatus {
  [index: number]: UploadStatus;
}
type Props = { album: Album; updateAlbum: () => void };
const NewTrackList = ({ album, updateAlbum }: Props) => {
  const { classes } = useStyle();
  const [newSongs, setNewSongs] = useState<ISong[]>([]);
  const [uploadStatus, setUploadStatus] = useState<ITrackUploadStatus>({});
  const [tracks, setTracks] = useState<number[]>([]);

  useEffect(() => {
    setTracks(album.songs.map((track) => track.track_number));
  }, [album]);

  function upload() {
    newSongs.map((song) => {
      setUploadStatus((uploadStatus) => ({
        ...uploadStatus,
        [song.track_number]: "uploading",
      }));
    });

    if (album) {
      newSongs.map((song, index) => {
        return album
          .addSong(song)
          .then((song) => {
            setUploadStatus((uploadStatus) => ({
              ...uploadStatus,
              [song.track_number]: "success",
            }));
            const time = setTimeout(() => {
              updateAlbum();
              deleteNewSongField(index);
              clearTimeout(time);
            }, 1000);
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
  function deleteNewSongField(index: number) {
    console.log("index: ", index);
    setNewSongs((songs) => {
      const newSongs = [...songs];
      newSongs.splice(index, 1);
      return newSongs;
    });
  }
  function handleNewFormChange(event: SongFormItemEvent, index: number) {
    const songs = [...newSongs];
    songs[index][event.name] = event.value;
    setNewSongs(songs);
  }
  return (
    <div>
      {newSongs.map((song, index) => {
        return (
          <div key={index} className={classes.trackListItem}>
            <SongFormItem
              value={song}
              onChange={(event) => handleNewFormChange(event, index)}
              onDelete={() => deleteNewSongField(index)}
            />
            <UploadStatusNotification
              uploadStatus={uploadStatus[song.track_number]}
            />
          </div>
        );
      })}
      <Group position="center" mt="md">
        <Button
          onClick={() =>
            setNewSongs((newSongs) => {
              return [
                ...newSongs,
                {
                  name: "",
                  track_number: (() => {
                    const maxTrackNumber = Math.max(...tracks);
                    setTracks((tracks) => [...tracks, maxTrackNumber + 1]);
                    return maxTrackNumber + 1;
                  })(),
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
    </div>
  );
};

export default NewTrackList;
