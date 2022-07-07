import { Button, createStyles } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Artist from "../../api/Artist";

type Props = {
  artist: Artist;
};

const useStyle = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
  },
}));

const ArtistDetailForm = ({ artist }: Props) => {
  const { classes, theme } = useStyle();
  return (
    <div className={classes.container}>
      <Button
        component={Link}
        to={`/artist/${artist.id && artist.id}/new_album`}
      >
        New Album
      </Button>
      <Button
        component={Link}
        to={`/artist/${artist.id && artist.id}/new_single`}
      >
        New Single
      </Button>
    </div>
  );
};

export default ArtistDetailForm;
