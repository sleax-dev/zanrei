import type { ReactNode } from "react";

/** The title and one-line description every page starts with; `children` are the page's actions, placed on the right. */
export function PageHead({ title, desc, children }: { title: string; desc: string; children?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      {children}
    </div>
  );
}
