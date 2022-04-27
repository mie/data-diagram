import React from "react";
import cl from "./AppWrapper.module.css"

type Props = {
    children?: React.ReactNode
};
export function AppWrapper(props: Props) {
  return (
    <div className={cl.wrapper}>
        {props.children}
    </div>
  );
};