import React from "react";

type Props = {
  children?: React.ReactNode;
  links?: string[];
};
export function AppSidebar(props: Props) {
  return (
    <nav className="sidebar">
      <div className="sidebar-inner">{props.children}</div>
    </nav>
  );
}
