import { Route, Routes } from "react-router-dom";
import ArtistCard from "../../components/Artist";
import NewArtistCard from "../../components/Artist/NewArtistCard";
import "../style.css";
import CreateArtist from "./CreateArtist";
import NewAlbum from "../NewAlbum";
import Artist from "../../api/Artist";
import { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import EditArtistProfile from "./EditArtistProfile";
import CreateAlbum from "../Albums/CreateAlbum";

const useStyle = createStyles((theme) => ({
  artistCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: `${theme.spacing.sm}px`,
  },
}));

const ArtistList = () => {
  const { classes } = useStyle();
  const [artists, setArtists] = useState<Artist[]>([]);
  useEffect(() => {
    Artist.getAll()
      .then((artists) => {
        setArtists(artists);
      })
      .catch((error) => {
        console.error(error);
      });
    // () => {
    //   setArists([]);
    // };
  }, []);
  const items = artists.map((artist) => {
    return <ArtistCard key={artist.id} artist={artist} />;
  });
  return (
    <div className={classes.artistCards}>
      <NewArtistCard />
      {items}
    </div>
  );
};

type Props = {};
const Artists = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<ArtistList />} />
      <Route
        path="/:id/new_album"
        element={<CreateAlbum album_type="album" />}
      />
      <Route
        path="/:id/new_single"
        element={<CreateAlbum album_type="single" />}
      />
      <Route path="/:id/edit" element={<EditArtistProfile />} />
      <Route path="create" element={<CreateArtist />} />
    </Routes>
  );
};

export default Artists;
