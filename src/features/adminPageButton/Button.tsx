import './Button.css';

interface ButtonMessageProps {
  onClick: (data: string) => void;
  data: string;
}

export default function ButtonMessage({ onClick, data }: ButtonMessageProps) {
  return (
    <button className="button1" onClick={() => onClick(data)}>
      <span className="span1">Invite to the team?</span>
      <span className="span1">Send an invitation!</span>
    </button>
  );
}