import { motion } from "framer-motion";

import { 

  ChevronLeft, ChevronRight, 
 Trash, Pencil, 
  Info, LogsIcon, ChartPie,
  Search, ClipboardList, CirclePlus,
  Users, Sheet, User, Link,
  UserRoundSearch, Pen,
  Wrench, MessageCircle,
  Download,
  User2,
  Database,
  LayoutDashboard

} from "lucide-react";

import { Button } from "../../uiCompoents/ui/button";
import FeatureCard from "./components/FeatureCard";
import InstructionHeader from "./components/InstructionHeader";
import pencillPNG from '../../images/pencil.png';
import trashPNG from '../../images/delete.png';
import userDashBoard from '../../images/UserDashBoard.png';
import UserJoinCommandModal from '../../images/UserJoinCommandModal.png';
import UserCommandTask from '../../images/UserCommandTask.png';
import UserUserTask from '../../images/UserUserTask.png'
import UserModalTask from '../../images/UserModalTask.png';
import UserCreateSubTask from '../../images/UserCreateSubTask.png';
import AdminDashBoard from '../../images/AdminDashBoard.png';
import AdminUsers from '../../images/AdminUsers.png';
import AdminUserModal from '../../images/AdminUserModal.png';
import AdminUserModalAssignTask from '../../images/AdminUserModalAssignTask.png';
import AdminAddUser from '../../images/AdminAddUser.png';
import ModalCreateTask from '../../images/ModalCreateTask.png';
import AdminTaskModal from '../../images/AdminTaskModal.png';
import AdminProfileTools from '../../images/AdminProfileTools.png';
import Chat from '../../images/Chat.png';

import AnalyzePageStasticData from '../../images/AnalyzePageStasticData.png'
import AnalyzePageStatistic from '../../images/AnalyzePageStatistic.png';
//import AnalyzePageUserStasticData from '../../AnalyzePageUserStasticData.png';

import ProfilePageDescription from '../../images/ProfilePageDescription.png';
import ProfilePageIconChange from '../../images/ProfilePageIconChange.png';
import ProfilePagePng from '../../images/ProfilePagePng.png'

import AnalyzePageUserStasticData from '../../images/AnalyzePageUserStasticData.png';

import { useState } from "react";
import { Input } from "../../uiCompoents/ui/input";

const Instructions = () => {
  
  const [search, setSearch] = useState("");
  const [typeInsruction, setTypeInstruction] = useState('');

const features = [
  {
    title: "Edit Content",
    description: "Edit task - a tool that allows you to edit a task and all its data. You can use it by clicking 'Edit' in the task panel. To edit a task, click on it with a pencil. To remove it, right-click. You can edit both the main task and the subtask.",
    icon: <Pencil className="h-6 w-6" />,
    image: pencillPNG,
    imageAlt: "Person editing content on a laptop",
    align: "right",
    class: '30',
    role: 'both',
 },
  {
    title: "Delete Elements",
    description: "Delete task - a tool for completely deleting a task without the possibility of recovery. Traces will remain only in the 'Analyze-page' as the number of tasks, but no more. It is located under the 'Delete' line in the task panel. You can also remove it by right-clicking.",
    icon: <Trash className="h-6 w-6" />,
    image: trashPNG,
    imageAlt: "Code on screen showing delete functionality",
    align: "left",
    class: '0',
    role: 'both',
  },
  {
    title: "User Dashboard",
    description: "User task statistics, data is calculated for both 'Command task' and 'User task'.",
    icon: <ChartPie className="h-6 w-6" />,
    image: userDashBoard,
    imageAlt: "Laptop showing image editing interface",
    align: "right",
    class: '',
    role: 'user',
  },
  {
    title: "Command task",
    description: "Command task - a task assigned personally to the user by the administrator. Important - only the team administrator can delete/edit it.",
    icon: <LogsIcon className="h-6 w-6" />,
    image: UserCommandTask,
    imageAlt: "Code editor showing configuration options",
    align: "left",
    class: '',
    role: 'user',
  },
  {
    title: "User Task",
    description: "User task - a task created by a regular user. Only the user can delete/edit it. No one else can see or access it.",
    icon: <LogsIcon className="h-6 w-6" />,
    image: UserUserTask,
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
    title: "Admin dashboard",
    description: "Main administrator statistics, dynamic information.",
    icon: <Sheet className="h-6 w-6" />,
    image: AdminDashBoard,
    imageAlt: "Code on screen showing delete functionality",
    align: "right",
    class: '',
    role: 'admin'
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
    title: "Tools",
    description: "List of tools: 'Edit' and 'Delete' for deleting or editing a task. 'Add member' is only available to 'admin'. 'Notification' is an option to open a modal window with notifications. 'Profile' and 'Analyze' have a different color and are buttons to navigate to other application pages.",
    icon: <Wrench className="h-6 w-6" />,
    image: AdminProfileTools,
    imageAlt: "Code on screen showing delete functionality",
    align: "left",
    class: '40',
    role: 'both'
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
    title: "Analyze Statistic",
    description: "Analyze statistic - graphs about the history of all tasks throughout your account's history. Information is also displayed by months for six months.",
    icon: <Database className="h-6 w-6" />,
    image: AnalyzePageStasticData,
    imageAlt: "Code on screen showing delete functionality",
    align: "right",
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
    title: "Analyze Dashboard User",
    description: "Analyze information about your account, completed and incomplete tasks. Even if a task is deleted, it will remain in the data on this page and cannot be deleted. The data is dynamic. This data is visible only to you.",
    icon: <LayoutDashboard className="h-6 w-6" />,
    image: AnalyzePageUserStasticData,
    imageAlt: "Code on screen showing delete functionality",
    align: "right",
    class: '80',
    role: 'user'
  }
];

const filterFeatures = typeInsruction ? features.filter(i => i.role == typeInsruction) : features;  
const filteredItems = filterFeatures.filter(({ title, description }) =>
  [title, description].some(text => text.toLowerCase().includes(search.toLowerCase()))
);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-10" >
     
      <InstructionHeader />
      
      <main className="container mx-auto px-4 py-8">

        <section className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto flex flex-col items-center justify-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              How to Use Our Application
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Welcome to our application! This guide will walk you through the main features
              and tools available to help you get the most out of your experience.
            </p>
            <div className="flex justify-center space-x-4">
              
              <Button variant="outline" className="group" onClick={()=>setTypeInstruction('admin')}>
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Admin
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-900 group" onClick={()=>setTypeInstruction('both')}>
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Both
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" className="group" onClick={()=>setTypeInstruction('user')}>
                User
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

            </div>
            <Input className="m-[10px] w-[50%]" placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>
        </section>
        
        <section className="space-y-24 mb-16">
          {filteredItems.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              image={feature.image}
              imageAlt={feature.imageAlt}
              // @ts-ignore
              align={feature.align}
              index={index}
              
              className={feature.class}
            />
          ))}
        </section>
        
        <section className="mb-16">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <Info className="h-6 w-6 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold">Pro Tips</h2>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-900 text-purple-300 mr-3">1</span>
              <p>Try to work carefully with the <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Delete</kbd> option, most deletions are irreversible</p>
              </li>
              <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-900 text-purple-300 mr-3">2</span>
              <p>Choose the name and description for the team carefully, in the current version of the application they cannot be changed</p>
              </li>
              <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-900 text-purple-300 mr-3">3</span>
              <p>Be careful when manipulating tasks, all data is sent to the analyze-page, where it cannot be changed.</p>
              </li>
            </ul>
          </div>
        </section>
        

      </main>
      
      <footer className="bg-gray-800 py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>© 2025 TeamSync. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Instructions;
