import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Album from "../../api/Album";
import AlbumCard from "../../components/AlbumCard";
import NewAlbumCard from "../../components/AlbumCard/NewAlbumCard";
import "../style.css";
import AlbumDetail from "./AlbumDetail";
import EditAlbum from "./EditAlbum";

const useStyle = createStyles((theme) => ({
  albumCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: `${theme.spacing.sm}px`,
  },
}));

const AlbumList = () => {
  const { classes } = useStyle();
  const [albums, setAlbums] = useState<Album[]>([]);
  useEffect(() => {
    Album.getAll()
      .then((albums) => {
        setAlbums(albums);
      })
      .catch((error) => {
        console.error(error);
      });
    // () => {
    //   setArists([]);
    // };
  }, []);
  const items = albums.map((album) => {
    return <AlbumCard key={album.id} album={album} />;
  });
  return <div className={classes.albumCards}>{items}</div>;
};

type Props = {};

const Albums = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<AlbumList />} />
      <Route path="/:id/" element={<AlbumDetail />} />
      <Route path="/:id/edit" element={<EditAlbum />} />
    </Routes>
  );
};

export default Albums;
