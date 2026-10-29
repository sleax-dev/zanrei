import mark from "../assets/z-mark.png";

/** The Zanrei mark: the brushed-silver Z. Transparent, so it sits on any dark surface; `width` is in px. */
export function Logo({ width = 22, className }: { width?: number; className?: string }) {
  return <img className={className} src={mark} width={width} alt="" draggable={false} style={{ height: "auto", display: "block" }} />;
}
