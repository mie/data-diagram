import React from "react";

type Props = {
    children?: React.ReactNode
};
export function AppMain(props: Props) {
  return (
    <main className="main">
      <div className="main-inner">
        {props.children}
      </div>      
    </main>
  );
};