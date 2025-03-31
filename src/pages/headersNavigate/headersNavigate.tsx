import { useEffect, useState } from "react"
import { useGetProfileQuery } from "../../redux/authApi/authApi";
import UserPng from '../../images/user.png';
import { Book, Crown, GitGraph, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../../features/profileList/profileList.css';

interface HeadersNavigateType {
  image:string | null
}

export default function HeadersNavigate({ image = null }:HeadersNavigateType){
const [openProfileList, setOpenProfileList] = useState(false);
const { data } = useGetProfileQuery({});
const navigate = useNavigate();

useEffect(() => {
    
    const handleClick = () => {
        if(openProfileList) setOpenProfileList(false);
    };
      document.addEventListener("click", handleClick);
    return () => {
        document.removeEventListener("click", handleClick);
    };
  }, [openProfileList]);
  

function PageNavigate(type:string){
    return navigate(`/${type}`)
  }
//onClick={(e)=>e.stopPropagation()}
return <div onClick={(e)=>e.stopPropagation()}>
   <div>
    <img 
        className='w-[80px] h-[80px] rounded-full object-cover'
        onClick={() => setOpenProfileList(true)}
        width={"80px"} 
        height={"80px"} 
        src={image || data?.image || UserPng} 
        alt="profile-icon" />
    { openProfileList && 
    <div className="profile-card">
        <ul className="profile-list">
                <li className="profile-element" onClick={()=>PageNavigate(data?.role)}>
                    <Crown/>
                    <p className="profile-label">Main Page</p>
                </li>
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
   </div>
 
  

</div>

}