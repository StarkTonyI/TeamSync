import React from 'react';
import './ModalWindow.css';
import userLogo from '../../images/user.png';
import ButtonMessage from '../adminPageButton/Button';

interface ModalWindowProps {
  user: {
    username: string;
    _id: string;
  };
  invitePersonFunction: (id: string) => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ user, invitePersonFunction }) => {
  return (
    <div className="card-modal" onClick={(e) => e.stopPropagation()}>
      <div className="card2-modal">
        <img src={userLogo} alt="user" width={"300px"} height={"300px"} />
        <h1>{user.username}</h1>
        <p style={{ fontSize: '15px' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aperiam obcaecati quod eligendi vero beatae fuga sint sapiente culpa sequi. Alias eum dolorem distinctio facilis nemo numquam pariatur ab nesciunt!
        </p>
        <ButtonMessage onClick={() => invitePersonFunction(user._id)} data={user._id} />
      </div>
    </div>
  );
};

export default ModalWindow;
