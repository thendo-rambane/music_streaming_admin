import { Box, Button, Grid, NumberInput, TextInput } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRef } from "react";
import { Check, FileImport, Trash, X } from "tabler-icons-react";
import Song from "../../api/Song";

type UploadStatus = "uploading" | "success" | "error";
export type SongFormItemEvent = {
  name: string;
  value: File | string | number | Blob;
};

type Props = {
  onChange: (event: SongFormItemEvent) => void;
  song: Song;
  onDelete: () => void;
  uploadStatus?: UploadStatus;
};

const SongItem = ({ onDelete, uploadStatus, song, onChange }: Props) => {
  const songRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid.Col span={1}>
          <NumberInput
            label="Track"
            disabled
            value={song.track_number}
            onChange={(value) => {
              if (value) {
                onChange({ name: "track_number", value });
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Song Name"
            placeholder={`Name of track ${song.track_number}`}
            value={song.name}
            onChange={(event) => {
              const value = event.target.value;
              onChange({ name: "name", value });
            }}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <input
            type={"file"}
            ref={songRef}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                if (file) {
                  onChange({ name: "file", value: file });
                }
              }
            }}
            accept="audio/*"
            hidden
          />
          <Button
            mt={25}
            leftIcon={<FileImport size={14} />}
            onClick={() => {
              if (songRef.current) songRef.current.click();
            }}
          >
            File
          </Button>
        </Grid.Col>
        <Grid.Col span={2}>
          <Button
            mt={25}
            variant="filled"
            color={"red"}
            onClick={() => {
              if (song.id) {
                showNotification({
                  id: "deleting song",
                  loading: true,
                  title: `Deleting Song ${song.name}`,
                  message: "This may take a few seconds...",
                  autoClose: false,
                  disallowClose: false,
                });
                song
                  .delete()
                  .then(() => {
                    updateNotification({
                      id: "deleting song",
                      color: "teal",
                      title: "Success",
                      message: "Song Deleted",
                      icon: <Check />,
                      autoClose: 2000,
                    });
                    onDelete();
                  })
                  .catch((error) => {
                    updateNotification({
                      id: "deleting song",
                      color: "red",
                      title: "Error",
                      message: error.message,
                      icon: <X />,
                      autoClose: 2000,
                    });
                    console.error("Error deleting song");
                  });
              }
            }}
          >
            <Trash size={14} />
          </Button>
        </Grid.Col>
      </Grid>
      <Box mt="md">
        {song.href !== "" && (
          <audio
            src={song.href}
            controls={true}
            style={{
              width: "100%",
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default SongItem;
