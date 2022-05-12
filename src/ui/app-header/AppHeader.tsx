import React from "react";

type Props = {
    children?: React.ReactNode
};
export function AppHeader(props: Props) {
  return (
    <header className="header">
        {props.children}
    </header>
  );
};