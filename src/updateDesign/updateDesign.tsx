import { useEffect, useState, useRef, useContext } from "react"
import { 
  Activity,Bell,Book,Command,Edit,Hexagon,type LucideIcon, Table,
  Trash,
  User,
  User2
} from "lucide-react";

import { Button } from "../uiCompoents/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../uiCompoents/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../uiCompoents/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "../uiCompoents/ui/avatar"
import AdminTaskDashBoard from "./adminTaskDashBoard/adminDashBoard";
import CurrentTime from "../AdminUser/adminOrUserComponents/currentTime";
import { CreateTaskContent } from "../taskDashboard/components/CreateTaskButton";
import UserFullCard from "./adminComponents/usersCards/UserFullCard";
import TaskModal from "../features/UserModalAssignTask/TaskModal";
import { UserContext } from "../userContext/userContext";
import CustomCursor from "../features/cursor/cursor";
import { useNotifications } from "../uiCompoents/hooks/useNotifications";
import NotificationModal from "../features/NotificatoinModal/notifications/NotificationModal";
import AdminChat from "../AdminUser/Chat/ChatLog";
import UserModalSearch from "../pages/userModalSearch/FindUserModal";
import { useGetUsersQuery } from "../redux/adminApi/adminApi";
import { useGetCommandQuery } from "../redux/adminCommandApi/AdminCommandApi";
import { useNavigate } from "react-router-dom";
import ResoureAllocation from "./adminComponents/resourceAllocation/resourceAllocation";
import { useGetProfileQuery } from "../redux/authApi/authApi";
import { NavItem } from "../AdminUser/adminOrUserComponents/MetricCards";
import FloatingCloseButton from "../AdminUser/adminOrUserComponents/floatingCloseButton";
export default function Dashboard() {
  const [theme] = useState<"dark" | "light">("dark")
  const [openModal,setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const { setSignalOpenAssignTask, signalOpenAssignTask, setRole, mainTask, setToggle } = useContext(UserContext) || {};
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [editOrDelete, setEditOrDelete] = useState('');
  const { showBadge } = useNotifications();
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const { data:command } = useGetCommandQuery({});
  const { data } = useGetProfileQuery({});
  const { data:users } = useGetUsersQuery({});
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) return;    

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100
    
    

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      

      constructor() {
        this.x = canvas ?  Math.random() * canvas.width : 0
        this.y = canvas ? Math.random() * canvas.height : 0
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100},
         ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, 
         ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if(!canvas) return;
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleContextMenu = (event:React.MouseEvent | null) => {
    if (editOrDelete){
       event?.preventDefault();
       setEditOrDelete('');
       setFeatureEnabled(false);
       document.body.style.cursor = "default"; 
       }
   };
   const createCommandModal = () => {
    navigate('create/command')
}
      useEffect(()=>{
           if(setRole) setRole('admin')
           if(editOrDelete){
               if(editOrDelete == 'delete' && mainTask){
                
                   //dispatch(deleteMainTask({taskId:mainTask?._id}));
               }
              // setOpenProfileList(false);
           }  
          //window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight);


       }, [editOrDelete, mainTask, setRole]);


  return (
    <div
      className={`${theme} ${isLoading ? 'max-h-screen' : 'min-h-screen'} bg-gradient-to-br from-black to-slate-900 text-slate-100 
      relative overflow-hidden`}
      onContextMenu={handleContextMenu} 
      >
  
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className={`absolute inset-0 bg-black/80 flex items-center justify-center z-50 h-[100vh]`}>
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}
      <FloatingCloseButton
      onClick={()=>setEditOrDelete('')}
      show={featureEnabled}
      onClose={() => {
        setFeatureEnabled(false)
        handleContextMenu(null)
      }
        }
/>
      { 
        editOrDelete == 'edit' && 
        <CustomCursor tools='pencil'/>  
      } 
      {   
        editOrDelete == 'delete'  && 
        <CustomCursor tools='delete'/>
      }
       
        <TaskModal onClose={setSignalOpenAssignTask} isOpen={signalOpenAssignTask?.signal}/>   
        <NotificationModal/>  
        <UserModalSearch usersList={users} openUserSearch={openUserSearch} setOpenUserSearch={setOpenUserSearch}/> 
      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 
            bg-clip-text text-transparent">
              Teamsync
            </span>
          </div>

          <div className="flex items-center space-x-6">
      

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={()=>setToggle ? setToggle(true) : undefined}
                      variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                        <Bell className="h-5 w-5" />
                      { 
                        showBadge &&  <span className="absolute -top-1 -right-1 h-2 w-2
                      bg-cyan-500 rounded-full animate-pulse"></span>
                      }
                   
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              { data?.image ? (
              <img 
               width={"60px"} height={"60px"} className='
              w-[60px] h-[60px] rounded-full object-cover'
              src={ data.image } alt="profile-icon" />
              ) : (
                <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
              </Avatar>
              ) }
               

            

            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Command} onClick={()=>navigate('/admin')} label="Dashboard" active />
                  <NavItem icon={Activity} onClick={()=>navigate('/analyze')} label="Analyze" />
                  <NavItem icon={User2} onClick={()=>navigate('/profile')}  label="Profile" />
                  <NavItem onClick={()=>navigate('/instruction')} icon={Book}  label="Instrution" />
                </nav>

              

              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* System overview */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="m-2 h-5 w-5 text-cyan-500" />
                      Task dashboard
                    </CardTitle>
                  
                  </div>
                </CardHeader>

                <AdminTaskDashBoard editOrDelete={editOrDelete}/>
                <CreateTaskContent setOpenModal={setOpenModal} openModal={openModal} userType="admin"/>           
              </Card>

              {/* Security & Alerts */}
              <div className="overflow-x-hidden">
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm 
                      min-w-full overflow-hidden">
                    <UserFullCard editOrDelete={editOrDelete}/>
                  </Card>
              </div>
                  <AdminChat/>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">          
                
              {/* System time */}
        
              <CurrentTime/>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton onClick={()=>setOpenModal(true)} icon={Table}  label="Create Task" />
                    <ActionButton onClick={()=>{ 
                      setEditOrDelete('edit')
                      setFeatureEnabled(true)  
                    }
                    } icon={Edit} label="Edit Task" />
                    <ActionButton onClick={()=>{
                      setFeatureEnabled(true)
                      setEditOrDelete('delete')}
                      }  icon={Trash} label="Delete Task" />
                    <ActionButton onClick={()=>{
                      if(!command){
                        createCommandModal()
                      }else{
                        setOpenUserSearch(true)
                      }
                        
                    }
                  
                      
                      }  icon={User} label={`${!command ? 'Create Command' : 'Add User'}`} />
                  </div>
                </CardContent>
              </Card>


              {/* Resource allocation */}
              <ResoureAllocation type="admin"/>

 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items

function ActionButton({ icon: Icon, label, onClick  }: { icon: LucideIcon; label: string, onClick:()=>void | null}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
