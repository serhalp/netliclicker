import { SiteBuildGameSurface } from "@netlify/sdk/ui/react/components";
import { Game } from "../components/Game";

export const SiteBuildGame = () => {
  return (
    <SiteBuildGameSurface>
      <div>
        <Game />
      </div>
    </SiteBuildGameSurface>
  );
};
