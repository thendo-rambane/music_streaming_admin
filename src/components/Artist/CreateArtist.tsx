import { Button, createStyles, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Artist from "../../api/Artist";
import ArtistDetailForm from "./ArtistDetailForm";
import CreateArtistForm from "./CreateArtistForm";
import { CustomiseArtist as CustomiseArtist } from "./CustomiseArtist";

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
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className={classes.main}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="New Artist" description="Create an artist">
          <>
            <h1>Create Artist</h1>
            <CreateArtistForm
              className={classes.artistForm}
              onSuccess={(artist) => {
                setArtist(artist);
              }}
              onAdvance={nextStep}
            />
          </>
        </Stepper.Step>
        <Stepper.Step
          label="Artist Profile"
          description="Customise artist profile"
        >
          {artist !== null && (
            <CustomiseArtist
              className={classes.artistForm}
              artist={artist}
              onAdvance={nextStep}
            />
          )}
        </Stepper.Step>
        <Stepper.Step
          label="Artist Music"
          description="Add Music To Artist Profile"
        >
          {artist !== null && (
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
          )}
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default CreateArtist;
