import TaskStatistics from './components/TaskStatistics';
import TeamBoard from './components/TeamBoard';
import { CreateTaskContent } from '../../../taskDashboard/components/CreateTaskButton';
import TaskModal from '../../../features/adminMainTaskModal/components/TaskModal';

  interface AdminTaskDashBoardType {
    editOrDelete:string
  }
  //mx-auto space-y-4 max-w-[1400px] animate-in 
//max-w-[970px]
const AdminTaskDashBoard = ({ editOrDelete }:AdminTaskDashBoardType  ) => {
  return (
    <div className="h-full p-8 w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
       
        <header className="flex justify-between">
          <div>
            <h1 className="text-2xl">Task Dashboard</h1>
          </div>
          <CreateTaskContent userType='admin'/>
        </header>

        <TaskStatistics />
        <TeamBoard editOrDelete={editOrDelete}/>
        <TaskModal editOrDelete={editOrDelete}
/>
  
      </div>
    </div>
  );
};

export default AdminTaskDashBoard;