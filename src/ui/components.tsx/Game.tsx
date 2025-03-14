import { useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Tooltip,
} from "@netlify/sdk/ui/react/components";

const NETLIFY_EPOCH = new Date("2014-11-09");
const SECONDS_SINCE_NETLIFY_EPOCH =
  (Date.now() - NETLIFY_EPOCH.getTime()) / 1000;

const CONFIG = {
  levels: [
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 365), // ~10
      multiplier: 2,
      unit: "years",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 30), // ~100
      multiplier: 2,
      unit: "months",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24 / 7), // ~500
      multiplier: 4,
      unit: "weeks",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60 / 24), // ~4K
      multiplier: 4,
      unit: "days",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60 / 60), // ~100K
      multiplier: 8,
      unit: "hours",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH / 60), // ~5M
      multiplier: 16,
      unit: "minutes",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH), // ~300M
      multiplier: 32,
      unit: "seconds",
    },
    {
      threshold: Math.floor(SECONDS_SINCE_NETLIFY_EPOCH) * 1000, // ~300B
      multiplier: 1024,
      unit: "milliseconds",
    },
    {
      threshold: Number.MAX_SAFE_INTEGER,
      multiplier: 1,
      unit: "",
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
          (acc, level) => [
            ...acc,
            {
              ...level,
              multiplier:
                (acc[acc.length - 1]?.multiplier ?? 1) * level.multiplier,
            },
          ],
          [] as typeof CONFIG.levels,
        )
        .reverse(),
    [completedLevels],
  );

  return (
    <ButtonGroup>
      {multipliers.map((level, index) => (
        <Tooltip
          type="info"
          disabled={level.multiplier === 1}
          contents={`Netlify is ${level.threshold} ${level.unit} old!`}
        >
          <Button key={index} onClick={() => onClick(level.multiplier)}>
            Click {level.multiplier}x
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
};

// TODO(serhalp) Check dark mode
// const NetlifyLogo = () => (
//   <svg className="tw-size-9" viewBox="0 0 128 128">
//     <path
//       fill="rgb(12, 42, 42)"
//       d="m125.2 54.8-52-52L71.3.9 69.2 0H58.8l-2.1.9-1.9 1.9-52 52-1.9 1.9-.9 2.1v10.3l.9 2.1 1.9 1.9 52 52 1.9 1.9 2.1.9h10.3l2.1-.9 1.9-1.9 52-52 1.9-1.9.9-2.1V58.8l-.9-2.1-1.8-1.9z"
//     />
//     <path
//       fill="white"
//       d="M78.9 80.5H71l-.7-.7V61.3c0-3.3-1.3-5.9-5.3-6-2-.1-4.4 0-6.9.1l-.4.4v24l-.7.7h-7.9l-.7-.7V48.1l.7-.7H67c6.9 0 12.6 5.6 12.6 12.6v19.8l-.7.7z"
//     />
//     <path
//       fill="rgb(50, 230, 226)"
//       d="m38.4 30.8 7.3 7.3v5.8l-.8.8h-5.8l-7.3-7.3v-1.1l5.5-5.5h1.1zm.2 37.2v-8l-.7-.7h-28l-.7.7v8l.7.7H38l.6-.7zm.5 15.7L31.8 91v1.1l5.5 5.5h1.1l7.3-7.3v-5.8l-.8-.8h-5.8zM60 11.3l-.6.7v25l.7.7H68l.7-.7V12l-.7-.7h-8zm0 79.1-.7.7v25l.7.7h8l.7-.7v-25l-.7-.7h-8zm58.1-31h-28l-.7.6v8l.7.7h28.1l.7-.7v-8l-.8-.6z"
//     />
//   </svg>
// );

const YouWin = () => (
  <div className="tw-flex tw-flex-col tw-place-content-center">
    <div className="tw-text-2xl tw-text-netlify-teal">You win!</div>{" "}
    {/* FIXME(serhalp) Tailwind animations aren't working for some reason */}
    {/* <div className="tw-animate-spin"> */}
    {/*   <NetlifyLogo /> */}
    {/* </div> */}
  </div>
);

export const Game = () => {
  const [clickCount, setClickCount] = useState(0);
  const [remainingLevels, setRemainingLevels] = useState([...CONFIG.levels]);
  const [completedLevels, setCompletedLevels] = useState([
    { threshold: 0, multiplier: 1, unit: "" },
  ]);

  const hasWon = remainingLevels.length == 0;

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
        Clicks:{" "}
        <span className="tw-font-bold">{!hasWon ? clickCount : "∞"}</span>
        {hasWon ? <YouWin /> : null}
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
