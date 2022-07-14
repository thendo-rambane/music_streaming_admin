import { Box, Button, Grid, NumberInput, TextInput } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { Check, FileImport, Trash, X } from "tabler-icons-react";
import Song, { ISong } from "../../api/Song";

type UploadStatus = "uploading" | "success" | "error";
export type SongFormItemEvent = {
  name: string;
  value: File | string | number | Blob;
};

type Props = {
  onChange: (event: SongFormItemEvent) => void;
  value: ISong;
  onDelete: () => void;
  uploadStatus?: UploadStatus;
};

const SongFormItem = ({ onDelete, uploadStatus, value, onChange }: Props) => {
  const songRef = useRef<HTMLInputElement>(null);
  const [songUrl, setSongUrl] = useState<string>(value.href);

  useEffect(() => {
    if (value.file) setSongUrl(URL.createObjectURL(value.file));
    return () => {
      if (value.file) URL.revokeObjectURL(songUrl);
    };
  }, [setSongUrl, value.file]);

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
            disabled
            label="Track"
            value={value.track_number}
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
            placeholder={`Name of track ${value.track_number}`}
            value={value.name}
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
              if (value.id) {
                showNotification({
                  id: "deleting song",
                  loading: true,
                  title: `Deleting Song ${value.name}`,
                  message: "This may take a few seconds...",
                  autoClose: false,
                  disallowClose: false,
                });
                Song.delete(value.id)
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
            {<Trash size={14} />}
          </Button>
        </Grid.Col>
      </Grid>
      <div>
        {value.file instanceof File && (
          <Grid.Col span={12}>{value.file?.name}</Grid.Col>
        )}
      </div>
      <Box mt="md">
        {songUrl !== "" && (
          <audio
            src={songUrl}
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

export default SongFormItem;
