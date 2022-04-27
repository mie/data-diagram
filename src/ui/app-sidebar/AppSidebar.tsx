import React from "react";
import cl from "./AppSidebar.module.css"

type Props = {
    children?: React.ReactNode
};
export function AppSidebar(props: Props) {
  return (
    <nav className={cl.sidebar}>
        {props.children}
    </nav>
  );
};