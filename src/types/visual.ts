import { ReactNode } from "react"

export interface DraggableItem {
	node: ReactNode
	,data: string
}

export enum ElementType {
	"Tank" = "Tank"
	,"Flow" = "Flow"
	,"Node" = "Node"
	,"Input" = "Input"
	,"Output" = "Output"
}