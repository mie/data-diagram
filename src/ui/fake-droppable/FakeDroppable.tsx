import * as React from 'react';
type Props = {
	onDrop: (e: React.MouseEvent) => void
	,children: React.ReactNode
};
export function FakeDroppable(props: Props) {
	return (
		<div onMouseUp={(e) => props.onDrop(e)}>
			{props.children}
		</div>
	);
};