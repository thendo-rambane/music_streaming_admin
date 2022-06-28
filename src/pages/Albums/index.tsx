import AlbumCard from "../../components/AlbumCard";
import NewAlbumCard from "../../components/AlbumCard/NewAlbumCard";
import "../style.css";

type Props = {};

const Albums = (props: Props) => {
  return (
    <div className="tile-list">
      <NewAlbumCard />
      <AlbumCard />
    </div>
  );
};

export default Albums;
