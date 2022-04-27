import React from "react";
import cl from "./AppHeader.module.css";

type Props = {
    children?: React.ReactNode
};
export function AppHeader(props: Props) {
  return (
    <header className={cl.header}>
        {props.children}
    </header>
  );
};