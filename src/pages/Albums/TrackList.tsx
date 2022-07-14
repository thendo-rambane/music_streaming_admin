import { createStyles } from "@mantine/styles";
import React, { useEffect } from "react";
import Album from "../../api/Album";
import { ISong } from "../../api/Song";
import SongFormItem, { SongFormItemEvent } from "./SongForm";
import SongItem from "./SongItem";
import UploadStatusNotification from "./UploadStatusNotification";
const useStyle = createStyles((theme) => ({
  trackListItem: {
    border: "1px solid #ccc",
    margin: theme.spacing.md,
    "&:": {
      backgroundColor: theme.colors.gray[7],
    },
  },
}));

type Props = { updateAlbum: () => void; album: Album };

const TrackList = ({ updateAlbum, album }: Props) => {
  const { classes } = useStyle();

  return (
    <div>
      {album.songs.map((song, index) => {
        return (
          <div key={song.id} className={classes.trackListItem}>
            <SongItem
              song={song}
              onChange={(event) => updateAlbum()}
              onDelete={() => updateAlbum()}
            />
            {/* <UploadStatusNotification
          uploadStatus={uploadStatus[song.track_number]}
        /> */}
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
