import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Artist from "../../api/Artist";
import NewAlbumForm from "../../components/NewAlbumForm";

type Props = {
  album_type: "album" | "single";
};

const CreateAlbum = ({ album_type }: Props) => {
  const { id } = useParams();
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      Artist.getById(id)
        .then((artist) => {
          setArtist(artist);
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    }
  }, [id]);

  return (
    (artist && (
      <NewAlbumForm
        // onCreated={onAlbumCreated}
        // onError={onAlbumCreatedError}
        artist={artist}
        album_type={album_type}
      />
    )) || <></>
  );
};

export default CreateAlbum;
