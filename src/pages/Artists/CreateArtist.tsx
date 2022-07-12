import { Button, createStyles, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Artist from "../../api/Artist";
import ArtistDetailForm from "../../components/Artist/ArtistDetailForm";
import CreateArtistForm from "../../components/Artist/CreateArtistForm";
import { CustomiseArtist as CustomiseArtist } from "../../components/Artist/CustomiseArtist";

type Props = {};

const useStyles = createStyles((theme) => ({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
  },
  main: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "inherit",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  artistForm: {
    // width: "30%",
  },
}));

const CreateArtist = (props: Props) => {
  const { classes, theme } = useStyles();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <h1>Create Artist</h1>
      <CreateArtistForm
        className={classes.artistForm}
        onSuccess={(artist) => {
          setArtist(artist);
        }}
        onAdvance={() => artist && navigate(`/artists/${artist.id}/edit`)}
      />
    </div>
  );
};

export default CreateArtist;
