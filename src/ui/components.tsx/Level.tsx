import * as React from "react";
import { Rod } from "./Rod";
import { Button } from "@netlify/sdk/ui/react/components";
import { useNetlifySDK } from "@netlify/sdk/ui/react";

export interface LevelProps {
  challenge: number;
  onNextLevel?: () => void;
}

export const Level = ({ challenge, onNextLevel }: LevelProps) => {
  const sdk = useNetlifySDK();
  const [rods, setRods] = React.useState(() => {
    // Create an array from challenge down to 1
    const disks = Array.from({ length: challenge }, (_, i) => ({
      width: (challenge > 5 ? 25 : 50) + i * 25,
      color: [
        "var(--colorFacetsRed600)",
        "var(--colorFacetsBlue600)",
        "var(--colorFacetsGreen500)",
        "var(--colorFacetsGold400)",
      ][i % 4],
      selected: false,
    }));
    return [disks, [], []];
  });
  const [selected, setSelected] = React.useState<number | null>(null);
  const [moves, setMoves] = React.useState(0);

  const handleClick = (index: number) => {
    if (selected === null) {
      if (rods[index].length === 0) {
        return;
      }
      const newRods: typeof rods = JSON.parse(JSON.stringify(rods));
      newRods[index][0].selected = true;
      setSelected(index);
      setRods(newRods);
    } else {
      if (index === selected) {
        const newRods: typeof rods = JSON.parse(JSON.stringify(rods));
        newRods[selected][0].selected = false;
        setSelected(null);
        setRods(newRods);
      } else if (
        rods[index].length === 0 ||
        rods[index][0].width > rods[selected][0].width
      ) {
        const newRods: typeof rods = JSON.parse(JSON.stringify(rods));
        newRods[selected][0].selected = false;
        newRods[index].unshift(newRods[selected].shift()!);
        setSelected(null);
        setRods(newRods);
        setMoves((moves) => moves + 1);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 70 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <strong>Challenge:</strong> Move all disks to the rightmost rod.
          <br />A larger disk cannot be placed on a smaller disk.
        </div>
        <div>
          <strong>Moves:</strong> {moves}
          <br />
          <strong>Best:</strong> {Math.pow(2, challenge) - 1}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          borderBottom: `6px solid ${
            sdk.context.theme === "light"
              ? "var(--colorFacetsGold800)"
              : "var(--colorFacetsGold100)"
          }`,
        }}
      >
        {rods.map((disks, index) => (
          <Rod
            key={index}
            challenge={challenge}
            disks={disks}
            target={index === 2}
            clickable={
              selected === null ||
              selected === index ||
              disks.length === 0 ||
              disks[0].width > rods[selected][0].width
            }
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div>
        {rods[2].length === challenge && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span>
              <strong>Congratulations!</strong> You solved the challenge in{" "}
              {moves} moves.
            </span>
            <div style={{ display: "inline-block" }}>
              <Button onClick={onNextLevel}>Next level?</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
