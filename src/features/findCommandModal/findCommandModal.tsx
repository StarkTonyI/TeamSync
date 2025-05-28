// @ts-nocheck
import ProfileCard from '../profileCard/ProfileCard';
import './FindCommandModal.css';
import { useState, ChangeEvent } from 'react';
import '../profileCard/profileCard.css'
interface Command {
  _id: string;
  commandName: string;
  commandDescription: string;
  admin:string;
  commandTask:string;
}

interface FindCommandModalProps {
  onClick: (command: Command) => void;
  listData: {
    commandList: Command[];
  };
}

export default function FindCommandModal({ onClick, listData }: FindCommandModalProps) {

  const { commandList } = listData;
  const [chooseCommand, setChooseCommand] = useState<Command>();
  const [cardPositions, setCardPositions] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Command[]>(commandList);
  const [addActiveMove, setAddActiveMove] = useState('');


const makeMoveAnimate = () => { 
  if(!cardPositions.length){ 
    setCardPositions(['first']); }
  else if(cardPositions.length == 1){
    setCardPositions(['second', 'first']); 
} else{
    setCardPositions(([first, second]) => [second, first]); 

  } };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchTerm(searchInput);

    const filtered = commandList.filter(command => 
      command.commandName.toLowerCase().includes(searchInput) ||
      command.commandDescription.toLowerCase().includes(searchInput)
    );
    setFilteredUsers(filtered);
  };

  const modalCommandData = (command: Command) => {
    setChooseCommand(command);
    makeMoveAnimate();
    setAddActiveMove('active');
    onClick(command);
  };

  return (
    <div className="find-command-modal">
    { addActiveMove && 
    cardPositions.map((position, index) => (
      <ProfileCard key={index} animate={`profile-card-${position}-position`} profileData={chooseCommand}/>
))}

      <div className={`find-command-modal-content ${addActiveMove}`} onClick={(e) => e.stopPropagation()}>
        <div className="find-command-search-container">
          <input 
            type="text" 
            id="search" 
            className="find-command-search-input" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="find-command-user-list" id="user-list">

          {filteredUsers && filteredUsers.map(command => (
            <div key={command._id} className="find-command-user-item" onClick={() => modalCommandData(command)}>
              <img src="https://i.pravatar.cc/60?img=1" alt={command.commandName} />
              <div className="find-command-details">
                <div className="find-command-name">{command.commandName}</div>
                <div className="find-command-description">{command.commandDescription}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
          
    </div>
  );
}