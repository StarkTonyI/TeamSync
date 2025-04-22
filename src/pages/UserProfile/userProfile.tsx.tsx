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
import getBaseUrl from "../../features/getBaseUrl.ts";
import { DashboardLayout } from "../updatedAnalyzePage/dashboard/DashboardLayout.tsx";

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
  const [loading, setLoading] = useState(false);
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
      localStorage.removeItem('chart_start_date')
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
    setLoading(true);
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
        setLoading(false);
        window.location.reload();
      }, 800);
    } catch (error) {
      setLoading(false);
      window.location.reload();
      console.error("Ошибка при загрузке файла:", error);
    }
};
  if(!data || loading){
    return <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "/>
  }

  return (
    <DashboardLayout>

<div className="min-h-screen relative bg-gradient-to-br
  from-slate-900 to-slate-950 p-6 pt-20 md:p-8 mx-auto w-full">
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="text-center space-y-6">
      <motion.div 
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex items-center justify-center"
      >
        <div 
          className="relative w-44 h-44 cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          
          <img 
            src={image || data?.image || UserPng}
            alt="Base"     
            className={`w-full h-full rounded-full object-cover border-4 border-slate-700/50 
              transition-all duration-300 ${isHovered ? "opacity-40 scale-95" : "opacity-100"}`}
          />
          
          {isHovered && (
            <label 
              htmlFor="fileInput" 
              className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-sm"
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                id="fileInput"
              />
              <motion.img 
                src={editPng} 
                alt="Hovered" 
                className="w-16 h-16 object-contain"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              />
            </label>
          )}
        </div>
      </motion.div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {userForEdit?.name}
        </h1>
        <p className="text-slate-400 font-medium">{user.role}</p>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
          onClick={() => setEdit(true)}
        >
          <Edit className="w-5 h-5 text-blue-400" />
          Edit Profile
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-900/30 hover:bg-red-900/50 border border-red-800/50 text-red-400 hover:text-red-300 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      className="rounded-xl p-6 space-y-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-blue-500/20">
          <Edit className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">Account Description</h2>
      </div>
      
      <div className="space-y-4 min-h-[200px]">
        <div className="text-slate-300/90 leading-relaxed tracking-wide whitespace-pre-wrap">
          {userForEdit?.description || (
            <span className="text-slate-500 italic">No description provided</span>
          )}
        </div>
      </div>
    </motion.div>

    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
      <DeleteProfile 
        role={data?.role} 
        id={data?.id}
    
      />
      <DeleteCommand 
        role={data?.role} 
        id={data?.id}
        
       
      />
    </div>
  </motion.div>

  {edit && userForEdit && <EditProfileTask setEdit={setEdit} editMainTask={userForEdit} />}
</div>

    </DashboardLayout>

 
  );
};

export default UserProfile;