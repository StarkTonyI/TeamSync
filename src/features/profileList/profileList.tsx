import { Book, GitGraph, User } from 'lucide-react';
import './profileList.css'
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../NotificatoinModal/notifications/NotificationBell.tsx';
import { useContext } from 'react';
import { UserContext } from '../../userContext/userContext.tsx';

interface ProfileListProps {
  onClick: (type:string) => void;
  role:string;
}

export default function ProfileList({ onClick, role }: ProfileListProps){
  const navigate = useNavigate();
  const { setToggle } = useContext(UserContext) || {};
  function PageNavigate(type:string){
    return navigate(`/${type}`)
  }

return <div onClick={(e)=>e.stopPropagation()} className="profile-card">
    
        <ul className="profile-list">
      <li className="profile-element" onClick={()=>onClick('edit')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7e8590"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="profile-lucide profile-lucide-pencil"
        >
          <path
            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          ></path>
          <path d="m15 5 4 4"></path>
        </svg>
        <p className="profile-label">Edit</p>
    
      </li>
    
      <li onClick={()=>onClick('delete')} className="profile-element profile-delete">
        <svg
          className="profile-lucide profile-lucide-trash-2"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="#7e8590"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line y2="17" y1="11" x2="10" x1="10"></line>
          <line y2="17" y1="11" x2="14" x1="14"></line>
        </svg>
        <p className="profile-label">Delete</p>
        </li>
        </ul>
    
    <div className="profile-separator"></div>
      
      <ul className="profile-list">
        <li className="profile-element" 
          onClick={()=> {
            onClick('notification');
            setToggle && setToggle(true)
          }}
        >
          <NotificationBell/> 
        </li>
      { role === 'admin' &&
        <li className="profile-element" onClick={()=>onClick('add')}>
        <svg
          className="profile-lucide profile-lucide-user-round-plus"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="#7e8590"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 21a8 8 0 0 1 13.292-6"></path>
          <circle r="5" cy="8" cx="10"></circle>
          <path d="M19 16v6"></path>
          <path d="M22 19h-6"></path>
        </svg>
        <p className="profile-label">Add Member</p>
        </li> 
      }
      

      </ul>
    
    <div className="profile-separator"></div>
        <ul className="profile-list">
          <li className="profile-element" onClick={()=>PageNavigate('profile')}>
            <User/>
            <p className="profile-label">Profile</p>
          </li>
          <li className="profile-element" onClick={()=>PageNavigate('analyze')}>
            <GitGraph/>
            <p className="profile-label">Analyze</p>
          </li>
          <li className="profile-element" onClick={()=>PageNavigate('instruction')}>
            <Book/>
            <p className="profile-label">Instruction</p>
          </li>
        </ul>
    </div>
  
}