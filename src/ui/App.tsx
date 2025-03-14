import { Surfaces } from "@netlify/sdk/ui/react";
import { SurfaceRoute, SurfaceRouter } from "@netlify/sdk/ui/react/components";
import { SiteBuildGame } from "./surfaces/SiteBuildGame.js";


export const App = () => {
  return (
    <SurfaceRouter>
      <SurfaceRoute surface={Surfaces.SiteBuildGame}>
        <SiteBuildGame />
      </SurfaceRoute>
    </SurfaceRouter>
  );
};
