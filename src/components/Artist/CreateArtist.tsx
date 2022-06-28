import { createStyles, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateArtistForm from "./CreateArtistForm";
import { CustomiseArtist as CustomiseArtist } from "./CustomiseArtist";

type Props = {};

const useStyles = createStyles((theme) => ({
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
  const [artist, setArtist] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className={classes.main}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
          <>
            <h1>Create Artist</h1>
            <CreateArtistForm
              className={classes.artistForm}
              onSuccess={({ name, genres }) => {
                setArtist(name);
                setGenres(genres);
              }}
              onAdvance={nextStep}
            />
          </>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <CustomiseArtist
            className={classes.artistForm}
            name={artist}
            banner=""
            avatar=""
            genres={genres}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default CreateArtist;
