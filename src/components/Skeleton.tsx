/** Loading placeholders. They keep the page's shape so nothing jumps when the data arrives. */
export function Skeleton({ w, h = 14, r = 6 }: { w?: number | string; h?: number; r?: number }) {
  return <span className="sk" aria-hidden style={{ width: w ?? "100%", height: h, borderRadius: r }} />;
}

/** A bordered list of rows, like the settings and games lists. `status` names what is loading for screen readers. */
export function SkeletonRows({ count = 5, status, switches = true }: { count?: number; status: string; switches?: boolean }) {
  return (
    <div className="rows" role="status" aria-busy="true" aria-label={status}>
      {Array.from({ length: count }, (_, i) => (
        <div className="row" key={i}>
          <div className="info" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton w={`${34 + ((i * 17) % 26)}%`} h={14} />
            <Skeleton w={`${58 + ((i * 11) % 30)}%`} h={11} />
          </div>
          {switches && <Skeleton w={40} h={20} r={10} />}
        </div>
      ))}
    </div>
  );
}

/** Label/value pairs, like the PC summary. */
export function SkeletonFacts({ count = 5, status }: { count?: number; status: string }) {
  return (
    <div className="dl" role="status" aria-busy="true" aria-label={status}>
      {Array.from({ length: count }, (_, i) => (
        <div className="dl-row" key={i}>
          <Skeleton w={70} h={12} />
          <Skeleton w={`${40 + ((i * 13) % 40)}%`} h={13} />
        </div>
      ))}
    </div>
  );
}
