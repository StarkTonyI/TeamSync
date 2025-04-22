import { motion } from "framer-motion";

import { 

  ChevronLeft, ChevronRight, 
 Trash, Pencil, 
  Info, LogsIcon, ChartPie,
  Search, ClipboardList, CirclePlus,
  Users, User, Link,
  UserRoundSearch, Pen,
 MessageCircle,
  Download,
  User2,
  LayoutDashboard,

} from "lucide-react";

import { Button } from "../../uiCompoents/ui/button";
import FeatureCard from "./components/FeatureCard";
import pencillPNG from '../../images/pencil.png';
import trashPNG from '../../images/delete.png';
import UserJoinCommandModal from '../../images/UserJoinCommandModal.png';
import UserModalTask from '../../images/UserModalTask.png';
import UserCreateSubTask from '../../images/UserCreateSubTask.png';
import AdminUsers from '../../images/DashBoardUsers.png';
import AdminUserModal from '../../images/DashBoardUserModal.png';
import AdminUserModalAssignTask from '../../images/AdminUserModalAssignTask.png';
import AdminAddUser from '../../images/AdminAddUser.png';
import ModalCreateTask from '../../images/DashBoardCreateTask.png';
import AdminTaskModal from '../../images/DashBoardUserModal.png';
import Chat from '../../images/DashBoardComunicationLogs.png';
import AnalyzePageStatistic from '../../images/DashBoardAnalyzeCards.png';
import ProfilePageDescription from '../../images/ProfilePageDescription.png';
import ProfilePageIconChange from '../../images/ProfilePageIconChange.png';
import ProfilePagePng from '../../images/ProfilePagePng.png'
import AnalyzePageUserStasticData from '../../images/DashBoardAnakyzeGraph.png';

import { useState } from "react";
import { Input } from "../../uiCompoents/ui/input";
import { DashboardLayout } from "../updatedAnalyzePage/dashboard/DashboardLayout";
import DashBoardGrapg from '../../images/SchedueCharts.png'
import UserDashBoard from '../../images/DashBoardCards.png'
import QickActions from '../../images/DashBoardQuickActions.png'
import UserCommandTasks from '../../images/UserDashBoardCommandTasks.png'
import UserUsersTasks from '../../images/UserDashBoardUsersTasks.png';


const Instructions = () => {
  
  const [search, setSearch] = useState("");
  const [typeInsruction, setTypeInstruction] = useState('');

  const features = [
    {
      title: "Edit Content",
      description: "Edit task - a tool that allows you to edit a task and all its data. You can use it by clicking 'Edit' in the task panel. To edit a task, click on it with a pencil. To remove it, right-click. You can edit both the main task and the subtask,in the mobile version, click the 'Edit' button in the toolbar again.",
      icon: <Pencil className="h-6 w-6" />,
      image: pencillPNG,
      imageAlt: "Person editing content on a laptop",
      align: "right" as "right",
      class: '30',
      role: 'both',
   },
    {
      title: "Delete Elements",
      description: "Delete task - a tool for completely deleting a task without the possibility of recovery. Traces will remain only in the 'Analyze-page' as the number of tasks, but no more. It is located under the 'Delete' line in the task panel. You can also remove it by right-clicking, in the mobile version, click the 'Delete' button in the toolbar again",
      icon: <Trash className="h-6 w-6" />,
      image: trashPNG,
      imageAlt: "Code on screen showing delete functionality",
      align: "left" as "left",
      class: '0',
      role: 'both',
    },
    {
      title: "Dashboard Cards",
      description: "User task statistics, data is calculated for both 'Command task' and 'User task'.",
      icon: <ChartPie className="h-6 w-6" />,
      image: UserDashBoard,
      imageAlt: "Laptop showing image editing interface",
      align: "right",
      class: '',
      role: 'user',
    },
    {
      title: "Command task",
      description: "Command task - a task assigned personally to the user by the administrator. Important - only the team administrator can delete/edit it.",
      icon: <LogsIcon className="h-6 w-6" />,
      image: UserCommandTasks,
      imageAlt: "Code editor showing configuration options",
      align: "left",
      class: '',
      role: 'user',
    },
    {
      title: "User Task",
      description: "User task - a task created by a regular user. Only the user can delete/edit it. No one else can see or access it.",
      icon: <LogsIcon className="h-6 w-6" />,
      image: UserUsersTasks,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '',
      role: 'user'
    },
    {
      title: "Find command",
      description: "Join a team - a window that allows you to join a team by sending a notification of your desire to join.",
      icon: <Search className="h-6 w-6" />,
      image: UserJoinCommandModal,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '',
      role: 'user'
    },
    {
      title: "Task modal",
      description: "Modal window of the created task, both user and command task. There is an option to add 5 subtasks, which can also be deleted/edited/marked as completed. Subtasks are not visible to anyone except the user.",
      icon: <ClipboardList className="h-6 w-6" />,
      image: UserModalTask,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '30',
      role: 'user'
    },
    {
      title: "Create Subtask",
      description: "Modal window for creating a subtask. You can add a description and date.",
      icon: <CirclePlus className="h-6 w-6" />,
      image: UserCreateSubTask,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '',
      role: 'user'
    },
 
    {
      title: "Team members",
      description: "List of team users with a progress bar for task completion.",
      icon: <Users className="h-6 w-6" />,
      image: AdminUsers,
      imageAlt: "Code editor showing configuration options",
      align: "left",
      class: '',
      role: 'admin'
    },
    {
      title: "User modal",
      description: "User modal window with information about them. At the bottom, there is a list of current tasks assigned to them by the administrator, as well as an 'Assign task' button for assigning a task to a team member.",
      icon: <User className="h-6 w-6" />,
      image: AdminUserModal,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '',
      role: 'admin'
    },
    {
      title: "Assign task",
      description: "A window that pops up when you click 'Assign task'. It contains information about the user and a list of all existing tasks. By clicking the checkbox, you can assign this task to the user. Clicking again will cancel the assignment.",
      icon: <Link className="h-6 w-6" />,
      image: AdminUserModalAssignTask,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '',
      role: 'admin'
    },
    {
      title: "Find user",
      description: "A window for searching users for the team. You cannot add a user registered as 'Admin', only 'User'. A proposal to join the team is sent.",
      icon: <UserRoundSearch className="h-6 w-6" />,
      image: AdminAddUser,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '',
      role: 'admin'
    },
    {
      title: "Create new task",
      description: "Option to create a task with a range of characteristics. The number of created tasks is unlimited.",
      icon: <Pen className="h-6 w-6" />,
      image: ModalCreateTask,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '',
      role: 'both'
    },
    {
      title: "Command task modal",
      description: "Team task window with a 'Progress bar' at the top. It calculates cumulative data and smart logic for task completion. At the bottom, there is a list of users assigned to this task.",
      icon: <Users className="h-6 w-6" />,
      image: AdminTaskModal,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '',
      role: 'admin'
    },
    {
      title: "Contact list",
      description: "",
      icon: <MessageCircle className="h-6 w-6" />,
      image: Chat,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '80',
      role: 'both'
    },
    {
      title: "Account Description",
      description: "Account description - data about your account visible to everyone. Above on the same page, there is an option to change the account description.",
      icon: <Pencil className="h-6 w-6" />,
      image: ProfilePageDescription,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '80',
      role: 'both'
    },
    {
      title: "Change Account Avatar",
      description: "Change account avatar - the ability to change your avatar, which is also visible to everyone. To open the option, hover the mouse cursor over the profile icon.",
      icon: <Download className="h-6 w-6" />,
      image: ProfilePageIconChange,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '80',
      role: 'both'
    },
    {
      title: "Profile Page",
      description: "Profile page - a page with data about your account, which is displayed on the page. There is an 'Edit profile' option, which means the ability to change the account name and its description. Changes are also visible to everyone.",
      icon: <User2 className="h-6 w-6" />,
      image: ProfilePagePng,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '80',
      role: 'both'
    },

    {
      title: "Analyze Dashboard Admin",
      description: "Statistical information about your account, completed and incomplete tasks. Even if a task is deleted, it will remain in the data on this page and cannot be deleted. The data is dynamic. Important - information about 'completed' and 'not completed' takes into account cumulative information considering the number of users assigned to the task. If 10 users complete the task but 1 does not, the task will not be considered completed. This data is visible only to you.",
      icon: <LayoutDashboard className="h-6 w-6" />,
      image: AnalyzePageStatistic,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '80',
      role: 'admin'
    },
    {
      title: "Analyze Dashboard",
      description: "Analyze information about your account, completed and incomplete tasks. Even if a task is deleted, it will remain in the data on this page and cannot be deleted. The data is dynamic. This data is visible only to you.",
      icon: <LayoutDashboard className="h-6 w-6" />,
      image: AnalyzePageUserStasticData,
      imageAlt: "Code on screen showing delete functionality",
      align: "right",
      class: '80',
      role: 'user'
    },
    {
      title: "Tools",
      description: "Tools like 'Create task' - option to create a task, 'Edit task' option to change a task that will be visible to all available persons, 'Delete task' - complete deletion of a task, without the possibility of return",      icon: <LayoutDashboard className="h-6 w-6" />,
      image: QickActions,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '80',
      role: 'user'
    },
    {
      title: "Weekly schedule",
      description: "Schedule information about tasks for the week, if you exit the account, the start day of the schedule is reset",
      icon: <LayoutDashboard className="h-6 w-6" />,
      image: DashBoardGrapg,
      imageAlt: "Code on screen showing delete functionality",
      align: "left",
      class: '80',
      role: 'user'
      }
  ];
  

const filterFeatures = typeInsruction ? features.filter(i => i.role == typeInsruction) : features;  
const filteredItems = filterFeatures.filter(({ title, description }) =>
  [title, description].some(text => text.toLowerCase().includes(search.toLowerCase()))
);

  return (
    <DashboardLayout>
<div className="min-h-screen bg-gradient-to-br md:mt-0 from-gray-900 via-gray-950 to-gray-900 text-gray-100 mt-4">


  <main className="container mx-auto px-4 py-12">
    <section className="mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
          Mastering TeamSync
        </h1>
        <p className="text-xl text-gray-300/90 mb-10 max-w-2xl leading-relaxed">
          Unleash the full potential of our platform with this interactive guide. 
          Learn pro techniques and hidden gems to boost your productivity.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant="outline"
            className="group px-6 py-3 border-gray-700 hover:border-purple-500 bg-gray-800/30 backdrop-blur-sm"
            onClick={() => setTypeInstruction('admin')}
          >
            <ChevronLeft className="mr-2 h-5 w-5 text-purple-400 transition-transform group-hover:-translate-x-1" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Tools
            </span>
          </Button>
          
          <Button 
            className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/20"
            onClick={() => setTypeInstruction('both')}
          >
            <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Hybrid Mode
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button 
            variant="outline"
            className="group px-6 py-3 border-gray-700 hover:border-cyan-500 bg-gray-800/30 backdrop-blur-sm"
            onClick={() => setTypeInstruction('user')}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              User Guide
            </span>
            <ChevronRight className="ml-2 h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <Input 
          className="w-full max-w-xl px-6 py-4 rounded-xl bg-gray-800/30 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm placeholder-gray-500"
          placeholder="Search knowledge base..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>
    </section>

    <section className="space-y-24 mb-20">
      {filteredItems.map((feature, index) => (
        <FeatureCard 
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          image={feature.image}
          imageAlt={feature.imageAlt}
          //@ts-ignore
          align={feature.align}
          index={index}
          className={feature.class}
        />
      ))}
    </section>

    <section className="mb-20">
      <div className="rounded-2xl p-8 bg-gray-800/30 border border-gray-700/50 backdrop-blur-xl shadow-2xl shadow-gray-950/50">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-xl bg-purple-500/10 mr-4">
            <Info className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Expert Playbook
          </h2>
        </div>
        <ul className="space-y-6 text-gray-300/90">
          <li className="flex items-start p-4 rounded-xl hover:bg-gray-800/20 transition-colors">
            <span className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-medium">
              1
            </span>
            <p className="text-lg leading-relaxed">
              Handle <kbd className="px-2.5 py-1 bg-gray-700/50 rounded-lg font-mono text-purple-300">Delete</kbd> operations with care - 
              most actions are <span className="text-red-400">permanent</span> and irreversible
            </p>
          </li>
          <li className="flex items-start p-4 rounded-xl hover:bg-gray-800/20 transition-colors">
            <span className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-medium">
              2
            </span>
            <p className="text-lg leading-relaxed">
              Strategize team names and descriptions carefully - 
              <span className="text-cyan-400"> editing capabilities</span> are currently limited in this version
            </p>
          </li>
          <li className="flex items-start p-4 rounded-xl hover:bg-gray-800/20 transition-colors">
            <span className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-medium">
              3
            </span>
            <p className="text-lg leading-relaxed">
              Audit task modifications thoroughly - 
              all changes propagate to <span className="text-pink-400">analytics dashboards</span> with read-only access
            </p>
          </li>
        </ul>
      </div>
    </section>
  </main>

  <footer className="py-8 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-t border-gray-800/50">
    <div className="container mx-auto text-center">
      <p className="text-gray-400/80 text-sm">
        © 2025 TeamSync · 
        <span className="mx-2">|</span>
        Crafted with passion by innovators
      </p>
    </div>
  </footer>
</div>
    </DashboardLayout>
   
  );
};

export default Instructions;
