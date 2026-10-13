interface Props {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
}

export function SectionHead({ id, kicker, title, lead }: Props) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
