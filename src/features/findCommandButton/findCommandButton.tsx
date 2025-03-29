import './findCommandButton.css';

interface FindCommandButtonProps {
    onClick: () => void;
}

const FindCommandButton: React.FC<FindCommandButtonProps> = ({ onClick }) => {
    return <button onClick={onClick} className="find-command-button find-command-type1"></button>;
};

export default FindCommandButton;