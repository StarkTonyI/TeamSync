import { Progress } from "@radix-ui/react-progress"
import { Button } from "../../uiCompoents/ui/button"
import { BarChart3, LineChart, LucideIcon } from "lucide-react"
import { Badge } from "../../uiCompoents/ui/badge"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useSlidingDates from "../adminOrUserFeatures/correctDate";
import { useSelector } from "react-redux";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../../uiCompoents/ui/avatar";
import { selectMessages } from "../../redux/reduxSlice/messageSlice";
import { useContext, useEffect, useState } from "react";
import { useGetProfileQuery } from "../../redux/authApi/authApi";
import { useGetLastMessageChatQuery } from "../../redux/messageApi/messageApi";
import formatDate, { getLatestItem, MessageFilter } from "../../features/dateFormat/dateFormat";
import { useTotalTaskAdminMutation, useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";
import { UserContext } from "../../userContext/userContext";

import { containsExactNumber } from "../adminOrUserFeatures/logicFunction";
import { TruncateText } from "../features";
import { AnalyzeTask } from "../../types/TaskType";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {

  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  maintainAspectRatio: false
};

interface LastMessage {
  lastMessage?: string;
  messageText?: string;
  createdAt?: string;
  file?: boolean;
}
    

export function CommunicationItem({ sender, avatar,unread, contactId, onSelectContact
}: {
  onSelectContact: (contactId:string, contact:string, image:string, avatar:string) => void;
  contactId:string,
  sender: { name:string; status:string },
  avatar: string,
  unread?: boolean
}) {
    const messages = useSelector(selectMessages);
    const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);
    const { data:profile } = useGetProfileQuery({});
    const { data } = useGetLastMessageChatQuery({});

   useEffect(() => {
     if (data && profile?.id || messages) {
 
      if(messages.length > 0 && contactId){
        const correctMessageUser = messages[0].recipient === contactId || messages[0].sender === contactId
        
        if(correctMessageUser){
          setLastMessage(getLatestItem(messages))
        }    
      } else{

       const filteredMessage = MessageFilter(contactId, profile?.id, data);
    
           // @ts-ignore
           const filteredData = filteredMessage?.filter(user => 
             user.deleteNotMy.length === 0 || 
             // @ts-ignore
             !user.deleteNotMy.some(msg => msg.id === profile?.id)
           );
           setLastMessage(getLatestItem(filteredData));
          }
   }
 }, [profile, data, messages]);
 
 
//AvatarImage
  return (
    <div onClick={()=>onSelectContact(contactId, sender.name, sender.status, avatar)} 
    className={`flex cursor-pointer mt-3 space-x-3 p-2 rounded-md ${unread ? 
    "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <div className="flex relative">
      <Avatar className="h-8 w-8">
        { avatar ? (
            <img src={ avatar } alt="userLogo" className="w-9 h-9 rounded-full"/>
        ) : (
          <AvatarFallback className="bg-slate-700 text-cyan-500">US</AvatarFallback>
        ) }
     
      
      </Avatar>
      {
      sender.status === 'online' ? (
      <div className="absolute bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full 
      border-2 border-chat-darker" />)
      :  (
        <div className="absolute bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full 
        border-2 border-chat-darker" />)
    }
      </div>
   
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender.name}</div>
          <div className="text-xs text-slate-500">{formatDate(lastMessage?.createdAt || '')}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{
        lastMessage?.lastMessage || lastMessage?.messageText || 'No message'}</div>
      </div>
    
    </div>
  )
}


export function PerformanceChartUser() {
    const [totalTaskApiAdmin] = useTotalTaskUserMutation();
    const [totalTask, setTotalTask] = useState<AnalyzeTask[]>();
    const { id } = useContext(UserContext) || {};
  //680007f53d18df3c3cf0415c
  //680007f53d18df3c3cf0415c
  //680007f53d18df3c3cf0415c

    function isSameDate(shortDateStr:string, isoDateStr:AnalyzeTask) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const filteredFunction = isoDateStr.completedDate?.filter(i => i.id == id) || [];
      if(filteredFunction.length > 0){
        const date = new Date(filteredFunction[0].date);

        const day = date.getDate();
        const month = date.getMonth();
      
        const [shortDayStr, shortMonth] = shortDateStr.split(" ");
        const monthIndex = months[month];
        const shortDay = parseInt(shortDayStr, 10);

        const isSame = day === shortDay && monthIndex === shortMonth;
      
        return isSame;
      }else{
        return false
      }
   
   
      }
      
    function DateEqual(fullDateStr:string,shortDateStr:AnalyzeTask){
      const monthAbbr = shortDateStr.month.slice(0, 3); // 'Apr'
      const equalDays = containsExactNumber(fullDateStr, Number(shortDateStr.day))
      const equalMonth = fullDateStr.toLowerCase().includes(monthAbbr.toLowerCase())

      if(equalDays && equalMonth ){
        return true
      }else {
        return false;
        }
    }

  const dataBase = async (adminId:string) => {
    const response = await totalTaskApiAdmin(adminId).unwrap() || [];

    const filterdResponse = response?.allTask.filter((i:AnalyzeTask) => !i.deleted);

    setTotalTask(filterdResponse);
  }

  useEffect(()=>{
    if(id){
      dataBase(id);
    }
  }, [id]);

    const dates = useSlidingDates();
    
     const data = {
      labels:dates,
      datasets: [
        {
          label: 'Total task',
          data: dates.map((item) => {
            const correctMainArray = totalTask?.filter(i => DateEqual(item, i)).length;
            return correctMainArray 
        }),
          backgroundColor: 'rgb(35, 49, 102)',
        },
        {
          label: 'Completed task',
          data: dates.map((item) => {
            const completedMainTask = totalTask?.filter(i=> i.completed);
    
            const equalCompletedTask = completedMainTask?.filter(i => isSameDate(item, i)).length; 
     
            return equalCompletedTask;
          }),

          backgroundColor: 'rgb(12, 168, 46)',
        },
        {
          label: 'Not completed task',
          data: dates.map((item) => {
            const completedMainTask = totalTask?.filter(i=> !i.completed);
            const correctMainArray = completedMainTask?.filter(i => DateEqual(item, i)).length;
            return correctMainArray
          }),
          backgroundColor: 'rgb(125, 12, 12)',
        },
      ],
    };

    return   <div className="max-w-[690px] h-[250px]">
    <Bar options={options} data={data} />
  </div>
}

export function PerformanceChartAdmin() {
  
  const [totalTaskApiAdmin] = useTotalTaskAdminMutation();
  const [totalTask, setTotalTask] = useState<AnalyzeTask[]>();
  const { id } = useContext(UserContext) || {};
  
  function DateEqual(fullDateStr:string,shortDateStr:AnalyzeTask){
    const monthAbbr = shortDateStr.month.slice(0, 3); // 'Apr'
    const equalDays = containsExactNumber(fullDateStr, Number(shortDateStr.day))
    const equalMonth = fullDateStr.toLowerCase().includes(monthAbbr.toLowerCase())

    if(equalDays && equalMonth ){
      return true
    }else {
      return false;
      }
  }

const dataBase = async (adminId:string) => {
  const response = await totalTaskApiAdmin(adminId).unwrap() || [];
  const filterdResponse = response?.allTask.filter((i:AnalyzeTask) => !i.deleted);
  setTotalTask(filterdResponse);
}


useEffect(()=>{
  if(id){
    dataBase(id);
  }
}, [id]);

  const dates = useSlidingDates();
  const data = {
    labels:dates,
    datasets: [
      {
        label: 'Total task',
        data: dates.map((item) => {
          const correctMainArray = totalTask?.filter(i => DateEqual(item, i)).length;
          return correctMainArray 
      }),
        backgroundColor: 'rgb(35, 49, 102)',
      },
      {
        label: 'Completed task',
        data: dates.map((item) => {
          const completedMainTask = totalTask?.filter(i=> i.completed);
          const correctMainArray = completedMainTask?.filter(i => DateEqual(item, i)).length;
          return correctMainArray;
        }),

        backgroundColor: 'rgb(12, 168, 46)',
      },
      {
        label: 'Not completed task',
        data: dates.map((item) => {
          const completedMainTask = totalTask?.filter(i=> !i.completed);
          const correctMainArray = completedMainTask?.filter(i => DateEqual(item, i)).length;
          return correctMainArray
        }),
        backgroundColor: 'rgb(125, 12, 12)',
      },
    ],
  };

  return   <div className="max-w-[690px] h-[250px]">
  <Bar options={options} data={data} />
</div>

}

// Process row component
export const ProcessRow = ({ pid, name, user, completedUsers, memory, status }:{
  pid: string
  name: string
  user: string
  completedUsers: number
  memory: React.ReactNode
  status: boolean
}) => (
  <div className="grid grid-cols-12 items-center py-2 px-3 
  text-sm hover:bg-slate-800/50 min-w-[500px] sm:min-w-0">
    {/* Индекс */}
    <div className="col-span-2 sm:col-span-1 text-xs sm:text-sm text-slate-500">
      {pid}
    </div>

    {/* Название */}
    <div className="col-span-3 sm:col-span-3 text-xs sm:text-sm text-slate-300 break-words pr-2">
      {TruncateText(name, 10)}
    </div>

    {/* Участники (только на десктопе) */}
    <div className="hidden sm:block col-span-2 text-slate-400">
      { user }
    </div>

    {/* Прогресс (только на десктопе) */}
    <div className="hidden sm:block col-span-2 text-slate-400">
      {completedUsers}%
    </div>

    <div className="sm:block col-span-2 text-purple-400 text-xs sm:text-sm">
      {memory}
    </div>

    {/* Статус */}
    <div className="col-span-1 sm:col-span-1 ml-3">
      <Badge 
        variant="outline"
        className={`
          text-xs 
          ${status 
            ? 'bg-green-500/10 text-green-400 border-green-500/30' 
            : 'bg-red-500/10 text-red-400 border-red-500/30'
          }`}
      >
        {status ? 'Yes' : 'No'}
      </Badge>
    </div>
  </div>
);



// Storage item component
export function StorageItem({
  name,
  percentage,
  type,
  onClick
}: {
  name: string
  percentage:number
  type: string
  onClick:()=>void
}) {
  

  return (
    <div onClick={onClick} className="bg-slate-800/50 rounded-md p-3 hover:bg-slate-800 border
     border-slate-700/50 ">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-300">{TruncateText(name, 25)}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
      

          <div className="text-xs text-slate-400">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${
              percentage > 90 ? "bg-green-500" : percentage > 70 ? "bg-amber-500" : "bg-cyan-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">

      <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
          Details
        </Button>
      </div>
    </div>
  )
}

export default function MetricCard({
    title,
    value,
    icon: Icon,
    trend,
    color,
    detail,
  }: {
    title: string
    value: number
    icon: LucideIcon
    trend: "up" | "down" | "stable"
    color: string
    detail: string
  }) {
    const getColor = () => {
      switch (color) {
        case "cyan":
          return "from-cyan-500 to-blue-500 border-cyan-500/30"
        case "green":
          return "from-green-500 to-emerald-500 border-green-500/30"
        case "blue":
          return "from-blue-500 to-indigo-500 border-blue-500/30"
        case "purple":
          return "from-purple-500 to-pink-500 border-purple-500/30"
        default:
          return "from-cyan-500 to-blue-500 border-cyan-500/30"
      }
    }
  
    const getTrendIcon = () => {
      switch (trend) {
        case "up":
          return <BarChart3 className="h-4 w-4 text-amber-500" />
        case "down":
          return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
        case "stable":
          return <LineChart className="h-4 w-4 text-blue-500" />
        default:
          return null
      }
    }
  
    return (
        <div  className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-3xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">
      {getTrendIcon()}
        </div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
    )
}
  

export function NavItem({ icon: Icon, label, active, onClick }: { icon: LucideIcon; label: string; active?: boolean, onClick:()=>void; }) {
  return (
    <Button
    onClick={onClick}
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : 
      "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
