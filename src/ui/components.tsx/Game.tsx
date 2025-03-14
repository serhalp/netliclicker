import React from "react";
import { Level } from "./Level";

export const Game = () => {
  const [challenge, setChallenge] = React.useState(3);

  return (
    <Level
      key={challenge}
      challenge={challenge}
      onNextLevel={() => {
        setChallenge(challenge + 1);
      }}
    />
  );
};
