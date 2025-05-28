import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useGetProfileQuery } from '../redux/authApi/authApi'; 
import { setSignalOpenAssignTaskType, TaskType } from '../types/TaskType';
interface UserContextType {
    id: string;
    setDeleteOrEditSignal: React.Dispatch<React.SetStateAction<string>>,
    deleteOrEditSignal:string
    setSignalOpenAssignTask:React.Dispatch<React.SetStateAction<setSignalOpenAssignTaskType>>
    signalOpenAssignTask:setSignalOpenAssignTaskType;
    setMainTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
    mainTask: TaskType | undefined;
    setBreakTaskChangeSignal:React.Dispatch<React.SetStateAction<boolean>>;
    breakTaskChangeSignal:boolean;
    role:string;
    setRole:React.Dispatch<React.SetStateAction<string>>;
    toggle:boolean;
    setToggle:Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const {data}  = useGetProfileQuery({});
    const [mainTask, setMainTask] = useState<TaskType>();
    const [toggle, setToggle] = useState<boolean>(false)
    const [breakTaskChangeSignal, setBreakTaskChangeSignal] = useState(false); 
    const [signalOpenAssignTask, setSignalOpenAssignTask] = useState({
        signal:false,
        userId:'',
        taskId:''
    });

    const [deleteOrEditSignal, setDeleteOrEditSignal] = useState('');
    const [role, setRole] = useState('')

    const [id, setId] = useState<string>('');
    useEffect(() => {
        if (data) {
            setRole(data.role);
            setId(data.id);
        }
    }, [data]);

    return (
        <UserContext.Provider value={{ 
            id, setMainTask, deleteOrEditSignal, 
            setDeleteOrEditSignal, mainTask, setSignalOpenAssignTask, 
            signalOpenAssignTask, setBreakTaskChangeSignal, 
            breakTaskChangeSignal, setRole, role, setToggle, toggle }}>
            {children}
        </UserContext.Provider>
    );
};
