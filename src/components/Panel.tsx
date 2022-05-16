type Props = {
  title: string;
  children: React.ReactNode;
};
export function Panel(props: Props) {
  return (
    <div className="panel">
      <div className="panel-header">
        <p>{props.title}</p>
      </div>
      <div className="panel-body">{props.children}</div>
    </div>
  );
}
