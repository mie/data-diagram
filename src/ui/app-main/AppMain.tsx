import React from "react";
import cl from "./AppMain.module.css"

type Props = {
    children?: React.ReactNode
};
export function AppMain(props: Props) {
  return (
    <main className={cl.main}>
      <div className={cl.mainInner}>
        {props.children}
      </div>      
    </main>
  );
};