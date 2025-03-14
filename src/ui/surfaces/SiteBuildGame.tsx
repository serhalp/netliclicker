import { SiteBuildGameSurface } from "@netlify/sdk/ui/react/components";
import { Game } from "../components.tsx/Game";

export const SiteBuildGame = () => {
  return (
    <SiteBuildGameSurface>
      <div>
        <Game />
      </div>
    </SiteBuildGameSurface>
  );
};
