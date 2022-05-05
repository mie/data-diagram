import React from "react";
import cl from "./Button.module.css";

export enum btnSizes {
	sm = "sm"
	,md = "md"
	,lg = "lg"
}

export enum btnTypes {
	primary = "primary"
	,secondary = "secondary"
	,default = "default"
}

type Props = {
  type: btnTypes;
  size: btnSizes;
	clickAction?: (event: React.MouseEvent) => void,
  children?: React.ReactNode;
};

export function Button(props: Props) {
  const cls: string[] = [cl.btn, cl[props.size], cl[props.type]];

  return <button className={cls.join(" ")} onClick={props.clickAction}>{props.children}</button>;
}