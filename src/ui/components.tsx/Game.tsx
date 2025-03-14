import { useMemo, useState } from "react";
import { Button, ButtonGroup, Card } from "@netlify/sdk/ui/react/components";

const NETLIFY_EPOCH = new Date("2014-11-09");
const SECONDS_SINCE_NETLIFY_EPOCH =
  (Date.now() - NETLIFY_EPOCH.getTime()) / 1000;

const CONFIG = {
  levels: [
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 365), // ~10
      multiplier: 2,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 30), // ~100
      multiplier: 2,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 7), // ~500
      multiplier: 4,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24), // ~4K
      multiplier: 4,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60), // ~100K
      multiplier: 8,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60), // ~5M
      multiplier: 16,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH), // ~300M
      multiplier: 32,
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH) * 1000, // ~300B
      multiplier: 1024,
    },
    {
      threshold: Number.MAX_SAFE_INTEGER,
      multiplier: 1,
    },
  ],
};

const ClickerButtonGroup = ({
  completedLevels,
  onClick,
}: {
  completedLevels: typeof CONFIG.levels;
  onClick: (count: number) => void;
}) => {
  const multipliers = useMemo(
    () =>
      completedLevels
        .reduce(
          (acc, { multiplier }) => [
            ...acc,
            (acc[acc.length - 1] ?? 1) * multiplier,
          ],
          [] as number[],
        )
        .reverse(),
    [completedLevels],
  );

  return (
    <ButtonGroup>
      {multipliers.map((multiplier, index) => (
        <Button key={index} onClick={() => onClick(multiplier)}>
          Click {multiplier}x
        </Button>
      ))}
    </ButtonGroup>
  );
};

export const Game = () => {
  const [clickCount, setClickCount] = useState(0);
  const [remainingLevels, setRemainingLevels] = useState([...CONFIG.levels]);
  const [completedLevels, setCompletedLevels] = useState([
    { threshold: 0, multiplier: 1 },
  ]);

  const handleClick = (count: number) => {
    setClickCount((prev) => {
      const cur = prev + count;

      for (const level of remainingLevels) {
        if (cur >= level.threshold) {
          setCompletedLevels((prev) => [...prev, level]);
          setRemainingLevels((prev) => prev.slice(1));
        }
      }

      return cur;
    });
  };

  return (
    <>
      <Card className="tw-text-center tw-text-xl">
        Clicks: <span className="tw-font-bold">{clickCount}</span>
      </Card>
      <Card>
        <ClickerButtonGroup
          completedLevels={completedLevels}
          onClick={handleClick}
        />
      </Card>
    </>
  );
};
