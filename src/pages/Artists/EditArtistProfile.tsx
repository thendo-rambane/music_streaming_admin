import { Button, createStyles } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Artist from "../../api/Artist";
import { CustomiseArtist } from "../../components/Artist/CustomiseArtist";
import Redirect from "../../components/Redirect";

const useStyles = createStyles((theme) => ({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
  },
}));

type Props = {};
const EditArtistProfile = (props: Props) => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //get artist by id
    setLoading(true);
    if (id) {
      Artist.getById(id)
        .then((artist) => {
          setArtist(artist);
          console.log("Artist: ", artist);
        })
        .catch((error) => {
          setArtist(null);
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          if (artist === null) {
            // navigate("/artists");
          }
        });
    }
  }, [id]);

  return artist !== null ? (
    <>
      <CustomiseArtist artist={artist} />
      <div className={classes.btnContainer}>
        <Button
          component={Link}
          to={`/artists/${artist.id && artist.id}/new_album`}
        >
          New Album
        </Button>
        <Button
          component={Link}
          to={`/artists/${artist.id && artist.id}/new_single`}
        >
          New Single
        </Button>
      </div>
    </>
  ) : (
    <>Error</>
  );
};

export default EditArtistProfile;
