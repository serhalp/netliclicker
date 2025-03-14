import { useNetlifySDK } from "@netlify/sdk/ui/react";
import { Disk, type DiskProps } from "./Disk";

export interface RodProps {
  challenge: number;
  disks: DiskProps[];
  target?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const Rod = ({
  challenge,
  disks,
  target,
  clickable,
  onClick,
}: RodProps) => {
  const sdk = useNetlifySDK();
  return (
    <div
      style={{
        width: 150,
        height: challenge * 10 + 30,
        position: "relative",
        cursor: clickable ? "pointer" : "not-allowed",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        {disks.map((disk, index) => (
          <Disk key={index} {...disk} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: 4,
          backgroundColor:
            sdk.context.theme === "light"
              ? "var(--colorFacetsGold800)"
              : "var(--colorFacetsGold100)",
          left: "calc(50% - 2px)",
          borderRadius: 2,
          bottom: -2,
        }}
      />
      {target && (
        <div
          style={{
            position: "absolute",
            height: 0,
            width: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `8px solid ${
              sdk.context.theme === "light"
                ? "var(--colorFacetsRed600)"
                : "var(--colorFacetsRed500)"
            }`,
            left: "calc(50% - 8px)",
            bottom: -14,
          }}
        />
      )}
    </div>
  );
};
