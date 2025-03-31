import { useDispatch } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import Spinner from '../../features/spinner/spinner.js';
import { UserContext } from '../../userContext/userContext.tsx';
import { AppDispatch } from '../../redux/store.js';
import profileIcon from '../../images/user.png'
import ProfileList from '../../features/profileList/profileList.js';
import { useGetProfileQuery } from '../../redux/authApi/authApi.js';
import '../UserPage/UserPage.css'
import { isEditTask } from '../../redux/reduxSlice/breakTaskSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useGetCommandQuery } from '../../redux/adminCommandApi/AdminCommandApi.ts';
import { useGetUsersQuery } from '../../redux/adminApi/adminApi.ts';
import AdminTaskDashBoard from './adminPageFolder/AdminTaskDashboard.tsx';
import TaskModal from '../../features/UserModalAssignTask/TaskModal.tsx';
import CustomCursor from '../../features/cursor/cursor.tsx';
import { deleteMainTask } from '../../redux/reduxSlice/mainTaskSlice.ts';
import { NewChat } from '../new-chat-page/Chat.tsx';
import UserModalSearch from '../userModalSearch/FindUserModal.tsx';
import NotificationModal from '../../features/NotificatoinModal/notifications/NotificationModal.tsx';
import CreateCommandAdminButton from '../../features/adminCreateCommandButton/adminButton.tsx';

export default function AdminPage() {
    
    const [chatOpen, setChatOpen] = useState({
        signal:false,
        id:''
    });

    const dispatch:AppDispatch  = useDispatch();   
    const navigate = useNavigate();

    const [editOrDelete, setEditOrDelete] = useState('');

    const { data:users } = useGetUsersQuery({});
    
    const [userOpenModal, setUserOpenModal] = useState<any>(null);
    const { mainTask, setRole } = useContext(UserContext) || {};
    
    const { data } = useGetProfileQuery({});
    const { data:command } = useGetCommandQuery({});
 
    const { signalOpenAssignTask, setSignalOpenAssignTask } = useContext(UserContext) || {};
    const [openUserSearch, setOpenUserSearch] = useState(false);

    const { isLoading } = useGetUsersQuery({});
    const [profileList, setOpenProfileList] = useState(false);

    const closeModal = () => {
        setEditOrDelete('');
        setUserOpenModal(null);
        setOpenProfileList(false);
        dispatch(isEditTask(null))
        setOpenUserSearch(false);
};
    const handleContextMenu = (event:React.MouseEvent) => {
     if (editOrDelete){
        event.preventDefault();
        setEditOrDelete('');
        document.body.style.cursor = "default"; 
        }
    };

    const createCommandModal = () => {
        navigate('create/command')
}    
    const profileListClick = (type:string) => {
        setOpenProfileList(false);
        if(type == 'delete'){
            setEditOrDelete('delete');
        }else if(type == 'edit'){
            setEditOrDelete('edit');
        }else if(type == 'add'){
            setOpenUserSearch(true)
        }
}
    useEffect(()=>{
        if(setRole) setRole('admin')
        if(editOrDelete){
            if(editOrDelete == 'delete' && mainTask){
                dispatch(deleteMainTask({taskId:mainTask?._id}));
            }
            setOpenProfileList(false);
        }  
    }, [editOrDelete, mainTask, setRole]);

  

    return (
        <>
            {isLoading && <Spinner />}
                { 
                    editOrDelete == 'edit' && 
                    <CustomCursor tools='pencil'/>  
                } 
                {   editOrDelete == 'delete'  && 
                    <CustomCursor tools='delete'/>
                }

            <div className={`team__box ${isLoading && 'blur'}` }
            onContextMenu={handleContextMenu} 
             onClick={userOpenModal || profileList || openUserSearch ? closeModal : undefined}>
              
              
            <div className="team-content min-h-screen flex" >

                <NewChat setChatOpen={setChatOpen} chatOpen={chatOpen}/>
               
                <div className={`team-content  min-h-screen overflow-hidden`}  
                    style={{ display: `${chatOpen.signal ? 'none' : 'block'}` }}    
                >
                    <div className='flex w-full h-full'
                    style={{ display: `${chatOpen.signal ? 'none' : 'block'}` }}    
                    >
                  
                        <div className='header-team text-base sm:text-lg md:text-xl lg:text-2'>
                            <div className='header-team-block'>
                             
                                <div className="command-block ">
                                    <span className='mr-[10px]'>Admin:{data?.username}</span>
                                     <span className='flex items-center'> Command:
                                        { command ? command.commandName : 
                                        <CreateCommandAdminButton onClick={createCommandModal}/>
                                        }</span>  
                                </div>
                             
                                <div className='notification-block'>
                                    <NotificationModal/>
                                </div>
                            <div> 
                            <img 
                                onClick={()=>setOpenProfileList(true)}
                                width={"80px"} height={"80px"} className='
                                w-[80px] h-[80px] rounded-full object-cover
                                ' src={ data?.image || profileIcon } alt="profile-icon" />
                                { profileList && <ProfileList onClick={profileListClick} role={data && data.role}/> }
                            </div>
                            </div>
                        </div>
                        
                        <div className='h-full'>  

                            <UserModalSearch usersList={users} openUserSearch={openUserSearch}/> 
                            {signalOpenAssignTask?.signal && 
                            // @ts-ignore
                            <TaskModal onClose={setSignalOpenAssignTask || (() => {})} 
                            isOpen={signalOpenAssignTask.signal}/>   
                            }                   
                         <div>   
                           
                           <AdminTaskDashBoard editOrDelete={editOrDelete}/>      
                        
                        </div>

                    </div>

                    </div>
                </div>

        </div>

        </div>
    </>
    );
}






