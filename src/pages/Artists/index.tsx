import { Route, Routes } from "react-router-dom";
import ArtistCard from "../../components/Artist";
import NewArtistCard from "../../components/Artist/NewArtistCard";
import "../style.css";
import CreateArtist from "../../components/Artist/CreateArtist";
import ArtistDetailForm from "../../components/Artist/ArtistDetailForm";
import NewAlbum from "../NewAlbum";

type Props = {};

const Artists = (props: Props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="tile-list">
            <NewArtistCard />
            <ArtistCard />
          </div>
        }
      />
      <Route path="/:id/new_album" element={<NewAlbum album_type="album" />} />
      <Route
        path="/:id/new_single"
        element={<NewAlbum album_type="single" />}
      />
      <Route path="create/*" element={<CreateArtist />} />
    </Routes>
  );
};

export default Artists;
