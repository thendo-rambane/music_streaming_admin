import { Box, createStyles } from "@mantine/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Album from "../../api/Album";
import AlbumCard from "../../components/AlbumCard";
import ArtistCard from "../../components/Artist";
import TrackList from "./TrackList";
import NewTrackList from "./NewTrackList";

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

type Props = {};

const EditAlbum = (props: Props) => {
  const { id } = useParams();
  const { classes } = useStyle();

  //Get Album by id
  const [album, setAlbum] = React.useState<Album | null>(null);

  function getAlbum(id: string) {
    Album.getById(id)
      .then((album) => {
        console.log(album);
        setAlbum(album);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    if (id) {
      getAlbum(id);
    }
  }, [id]);

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

      {album && (
        <>
          <TrackList
            album={album}
            updateAlbum={() => {
              if (id) getAlbum(id);
            }}
          />
          <NewTrackList
            album={album}
            updateAlbum={() => {
              if (id) getAlbum(id);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default EditAlbum;
