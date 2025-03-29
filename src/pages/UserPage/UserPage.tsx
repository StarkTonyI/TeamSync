import { useDispatch } from 'react-redux';
import React, { useContext, useState, useEffect } from 'react';
import Spinner from '../../features/spinner/spinner.js';
import { UserContext } from '../../userContext/userContext.tsx';
import { AppDispatch } from '../../redux/store.js';
import ProfileList from '../../features/profileList/profileList.js';
import TaskDashBoard from '../../taskDashboard/taskDashBoard/TaskDashBoard.js';
import { useCommandListQuery, useGetUserCommandQuery } from '../../redux/userCommandApi/UserCommandApi.js';
import { useGetProfileQuery } from '../../redux/authApi/authApi.js';
import './UserPage.css';
import { isEditTask } from '../../redux/reduxSlice/breakTaskSlice.ts';
import CustomCursor from '../../features/cursor/cursor.tsx';
import { NewChat } from '../new-chat-page/Chat.tsx';
import CommandModalSearch from '../commandModal/FindCommandModal.tsx';
import userPage from '../../images/user.png'
import NotificationModal from '../../features/NotificatoinModal/notifications/NotificationModal.tsx';
import BreakTaskModal from '../breakTaskModal/TaskModal.tsx';


export default function UserPage() {
    const dispatch:AppDispatch  = useDispatch();   
    const [chatOpen, setChatOpen] = useState({ signal:false, id:'' });
    const [deleteMainTask, setDeleteMainTask] = useState(false);
    const [editMainTask, setEditMainTask] = useState(false);
    const [editOrDelete, setEditOrDelete] = useState('');
    const [userOpenModal, setUserOpenModal] = useState<any>(null);
    const { setRole } = useContext(UserContext) || {};
 
    const { data } = useGetProfileQuery({});
    const { data:command } = useGetUserCommandQuery({});
     
    
    const { data:commandList, isLoading } = useCommandListQuery({})
    const [profileList, setOpenProfileList] = useState(false);
    
 

    const closeModal = () => {
        setUserOpenModal(null);
        setOpenProfileList(false);
        dispatch(isEditTask(null));
        setEditOrDelete('');
};

    const deleteOrEditFunction = (type:string) => {
        if(type == 'delete'){
            setDeleteMainTask(true);
            setEditOrDelete('delete');
        }else if(type == 'edit'){
            setEditMainTask(true);
            setEditOrDelete('edit');
        }
        setTimeout(()=>{
            setOpenProfileList(false)
        }, 100);
      
    }

    useEffect(()=>{
        if(deleteMainTask || editMainTask){
            setOpenProfileList(false);
        }
    }, [deleteMainTask, editMainTask])
    useEffect(()=>{
        if(setRole) setRole('user')
    }, [setRole]);

    
    const handleContextMenu = (event:React.MouseEvent) => {
     if (deleteMainTask || editMainTask){
        event.preventDefault();
        setDeleteMainTask(false);
        setEditMainTask(false);
        setEditOrDelete('');
        document.body.style.cursor = "default"; 
        }
};


return (
        <>

            {isLoading && <Spinner />}

            { editMainTask && <CustomCursor tools='pencil'/> } 
            { deleteMainTask && <CustomCursor tools='delete'/> } 
           
            { 
            ( !deleteMainTask && !editMainTask) && 
                <BreakTaskModal/>
            }
                <div 
                    className={`team__box ${isLoading && 'blur'}`} 
                    onClick={() => (userOpenModal || profileList) && closeModal()}
                    onContextMenu={handleContextMenu}
                >
                    <div className="team-content min-h-screen overflow-hidden">
                        <NewChat setChatOpen={setChatOpen} chatOpen={chatOpen}/> 
                        <div 
                            style={{ display: chatOpen.signal ? 'none' : 'block' }} 
                            className='w-full flex'
                        >
                            <div className='header-team text-base sm:text-lg md:text-xl lg:text-2xl'>
                               
                                <div className='header-team-block'>
                                   
                                    <div className="command-block">
                                        <span className='mr-[10px]'>User: {data?.username}</span>
                                        <div className='flex items-center'>
                                            <span>Command: </span>
                                            <span>
                                            { 
                                                command ? command.commandName 
                                                : <CommandModalSearch commandList={commandList}/>
                                            }
                                            </span>
                                        </div>
                                        
                                    
                                    </div>
                                   
                                    <div className='notification-block'>
                                        { <NotificationModal/> }
                                    </div>
                                    <div>
                                        <img 
                                            onClick={() => setOpenProfileList(true)}
                                            width={"80px"} 
                                            height={"80px"} 
                                            src={data?.image ? data?.image : userPage} 
                                            alt="profile-icon" 
                                        />
                                        
                                        { profileList && <ProfileList onClick={deleteOrEditFunction} role={data?.role}/> }
                                    </div>
                                </div>

                            </div>
                            <div className='w-full'>
                        
                                <TaskDashBoard editOrDelete={editOrDelete}/> 
                            </div>
                        </div>
                    </div>
                </div>

        </>

    );
}
