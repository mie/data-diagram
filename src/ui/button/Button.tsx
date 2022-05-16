import React from "react";

export enum btnSizes {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum btnTypes {
  primary = "primary",
  danger = "danger",
  cancel = "cancel",
  default = "default",
}

type Props = {
  type?: btnTypes;
  size?: btnSizes;
  clickAction?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
};

export function Button(props: Props) {
  const cls: string[] = [
    "btn active:shadow-btn-down active:top-[1px]",
		// props.size === "sm" ? "shadow-btn-up-sm" : "shadow-btn-up",
    props.size === undefined ? "btn-md" : "btn-" + props.size,
    props.type === undefined ? "default" : props.type,
  ];

  return (
    <button className={cls.join(" ")} onClick={props.clickAction}>
      {props.children}
    </button>
  );
}
