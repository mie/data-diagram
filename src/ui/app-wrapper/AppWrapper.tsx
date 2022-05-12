import React from "react";

type Props = {
    children?: React.ReactNode
};
export function AppWrapper(props: Props) {
  return (
    <div className="wrapper">
        {props.children}
    </div>
  );
};