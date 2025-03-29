import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Edit, Shield, Key, Mail, User, Loader } from "lucide-react";
import { useToast } from "../../uiCompoents/ui/use-toast";
import { EditProfileTask } from "../../taskDashboard/components/EditProfileTask";
import { useGetProfileQuery, useLeaveProfileMutation } from "../../redux/authApi/authApi";
import  editPng from '../../images/edit.png';
import axios from 'axios';
import UserPng from '../../images/user.png'
import DeleteCommand from "../../features/delete-command/DeleteCommand.tsx";
import DeleteProfile from "../../features/deleteProfile/deleteProfile.tsx";
import { AppDispatch } from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reduxSlice/authSlice.ts";
import { useNavigate } from "react-router-dom";
import HeadersNavigate from "../headersNavigate/headersNavigate.tsx";
import getBaseUrl from "../../features/getBaseUrl.ts";

interface EditTask {
  name:string, 
  description:string
}

const UserProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data } = useGetProfileQuery({});
  const [image, setImage] = useState<string | null>(null);
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const dispath:AppDispatch = useDispatch()
  const [leaveProfile] = useLeaveProfileMutation();
  const navigate = useNavigate()
  // @ts-ignore
  const tokenState = useSelector(state => state.auth.accessToken);
  const [userForEdit, setUserForEdit] = useState<EditTask>()

  useEffect(()=>{
    if(data){
      setUserForEdit({
        name: data?.username,
        description: data?.description
       })
    }
  }, [data]);

  const [user] = useState({
    login: data?.login,
    role: data?.user,
    create: "2024-02-20 14:30",
    avatar:data?.imageUrl ? data?.imageUrl : UserPng
   });

  const handleLogout = async () => {
    try {
      toast({
        title: "Logging out...",
        description: "You have been successfully logged out.",
      });
      
      localStorage.removeItem('role');
      dispath(logout());
      await leaveProfile(data.id).unwrap(); 
      navigate('/');
      setTimeout(()=>{
        window.location.reload();
      }, 400);
    } catch (error) {
      toast({
        title: "Logging out...",
        description: "Failed to leave the team.",
      });
      console.error('Failed to delete item:', error);
    }

  };

  const InfoCard = ({ icon: Icon, title, value }: { icon: any, title: string, value: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-xl hover-card"
    >

    <div className="flex items-center gap-3">

      <Icon className="w-5 h-5 text-white/60" />
        
        <div>
          <p className="text-sm text-white/60">{title}</p>
          <p className="font-medium">{value}</p>
        </div>
    </div>
    </motion.div>
  );

 const handleImageUpload = async (event:any) => {
    
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/profile/upload`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenState}` 
        },
        withCredentials: true 
      });
      setImage(response.data.imageUrl); 
      setTimeout(()=>{
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
};
  if(!data){
    return <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "/>
  }
  return (
    <div className="min-h-screen relative bg-[rgb(10,11,31)] p-6 md:p-8 mx-auto ">
        
        <div className="absolute right-4 top-1">
            <HeadersNavigate image={image}/>
          </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8">
            
        {/* Profile Header */}
        <div className="text-center space-y-4">
       
        
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center ">
      <div 
        className="relative w-64 h-64 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

      <img 
        src={image || data?.image || UserPng}
        alt="Base"     
        className={`
          w-full h-full object-cover 
          transition-opacity duration-50 ${isHovered ? "opacity-30" : "opacity-100"} 
          `}/>
      {isHovered && (
            <label 
              htmlFor="fileInput" 
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                id="fileInput"
            />
              <img 
                src={editPng} 
                alt="Hovered" 
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity
                duration-50 ${isHovered ? "opacity-500" : "opacity-0"}`}
     
            />   
      </label>
   
      )}
  
    </div>

          


          </motion.div>
          <div>
            <h1 className="text-3xl font-bold">{userForEdit?.name}</h1>
            <p className="text-white/60">{user.role}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button className="button-primary flex items-center gap-2" onClick={()=>setEdit(true) }>
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="button-destructive flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* User Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard 
            icon={Mail} 
            title="Login Address" 
            value={data?.login}
          />
          <InfoCard 
            icon={Shield} 
            title="Role" 
            value={data?.role}
          />
          <InfoCard 
            icon={Key} 
            title="Username" 
            value={data?.login}
          />
          <InfoCard 
            icon={User} 
            title="Account Status" 
            value="Active"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Account Description</h2>
          </div>
          <div className="space-y-4 min-h-[200px] flex overflow-x-hidden">
              <div className="break-words overflow-hidden">{ userForEdit?.description }</div>
          </div>
        </motion.div>

      <div className="flex items-center justify-center gap-3">
      
        <DeleteProfile role={ data?.role } id={data?.id}/>
        <DeleteCommand role={ data?.role } id={data?.id}/>
      
      </div>
     
      
      </motion.div>

      { edit && userForEdit && <EditProfileTask setEdit={setEdit} editMainTask={userForEdit} />}

    </div>
  );
};

export default UserProfile;