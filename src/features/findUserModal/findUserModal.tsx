import './findUserModal.css';
import '../profileCard/profileCard.css'
import { ChangeEvent, useState } from 'react';
import ProfileCard from "../profileCard/ProfileCard";


export interface User {
  _id: string;
  breakTask:[];
  mainTask: [];
  notification:{};
  username:string;
  role:string
}

interface FindCommandModalProps {
  onClick: (command: User) => void;
  listData: {
    users: User[];
  };
}

export default function FindUserModal({ onClick, listData }: FindCommandModalProps) {

  const { users } = listData;
 
  
  const [chooseUser, setChooseUser] = useState<User>();
  const [cardPositions, setCardPositions] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
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

    const filtered = users.filter(user => 
      user.username.toLowerCase().includes(searchInput)
    );
    setFilteredUsers(filtered);
  };

  const modalCommandData = (user: User) => {
    setChooseUser(user);
    makeMoveAnimate();
    setAddActiveMove('active');
    onClick(user);
  };

  return (
    <div className="find-command-modal">
    { addActiveMove && 
    cardPositions.map((position, index) => (
  // @ts-ignore
      <ProfileCard key={index} animate={`profile-card-${position}-position`} profileData={chooseUser}/>
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

          {filteredUsers && filteredUsers.map(user => (
            <div key={user._id} className="find-command-user-item" onClick={() => modalCommandData(user)}>
              <img src="https://i.pravatar.cc/60?img=1" alt={user.username} />
              <div className="find-command-details">
                <div className="find-command-name">{user.username}</div>
                <div className="find-command-description">{user.role}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
          
    </div>
  );
  }
