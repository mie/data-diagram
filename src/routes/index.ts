import { ReactNode } from "react"
import { TemplateEditor } from "../pages/TemplateEditor"
import { VisualEditor } from "../pages/VisualEditor"

export type StaticRouteType = {
	path: string
	title: string
	element: () => ReactNode
}

export const StaticRoutes: StaticRouteType[] = [
	{
		path: '/templates', title: 'Templates', element: () => TemplateEditor()
	},
	{
		path: '/graph', title: 'Graph', element:() =>  VisualEditor()
	},
]