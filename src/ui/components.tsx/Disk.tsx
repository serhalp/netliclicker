export interface DiskProps {
  width: number;
  color: string;
  selected?: boolean;
}

export const Disk = ({ width, color, selected }: DiskProps) => {
  return (
    <div
      style={{
        width: width,
        height: 10,
        borderRadius: 3,
        backgroundColor: color,
        boxShadow: selected ? "0 0 2px 2px var(--colorFacetsTeal300)" : undefined,
      }}
    />
  );
};
