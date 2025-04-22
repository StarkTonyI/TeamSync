
import React, { useState } from 'react';
import { useToast } from '../../../uiCompoents/hooks/use-toast';
import { Button } from '../../../uiCompoents/ui/button';
import { Input } from '../../../uiCompoents/ui/input';
import { Textarea } from '../../../uiCompoents/ui/textarea';
import { Slider } from '../../../uiCompoents/ui/slider';
import TeamImageUpload from './TeamImageUpload';
import { Users, Plus, ClipboardList, Hash, Target, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getBaseUrl from '../../../features/getBaseUrl';
import { motion } from 'framer-motion';
import { Label } from '../../../uiCompoents/ui/label';

interface FormData {
  commandName: string;
  commandDescription: string;
  maxUsers: number;
  commandTask:string;
  image: File | null;
}

const TeamForm: React.FC = () => {
  const { toast } = useToast(); 
  const navigate = useNavigate();
  // @ts-ignore
  const tokenState = useSelector(state => state.auth.accessToken);
  const [formData, setFormData] = useState<FormData>({
    commandName: '',
    commandDescription: '',
    maxUsers: 5,
    image: null,
    commandTask:''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const formDataForBackEnd = new FormData();    
    if (!formData.commandName.trim() ||
    formData.commandName.length > 20 || 
    formData.commandDescription.length > 100 || 
    formData.commandTask.length > 30) {
      toast({
        title: "Team name required or too long command name",
        description: "the length of the team name is no more than 20 characters, description 100, main task 30",
        variant: "destructive"
      });
      return 
    }
    setIsSubmitting(true)

    if(formData.image) formDataForBackEnd.append('file', formData.image);
    if(formData.commandDescription) formDataForBackEnd.append('commandDescription', formData.commandDescription);
    if(formData.maxUsers) formDataForBackEnd.append('maxUsers', formData.maxUsers.toString());
    if(formData.commandTask) formDataForBackEnd.append('commandTask', formData.commandTask)
    formDataForBackEnd.append('commandName', formData.commandName);


    try {
       await axios.post(
        `${getBaseUrl()}/api/command/admin/create`,
        formDataForBackEnd,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${tokenState}` // Вот тут пуляем токен
          }, 
          withCredentials: true 
        }
      );
    } catch (error) {
      console.error('Ошибка загрузки:', error);
  } finally {
    navigate('/admin');
    setTimeout(()=>{
      window.location.reload()
    }, 600)
  }
  

 
  setTimeout(() => {
      toast({
        title: "Team created successfully",
        description: `"${formData.commandName}" has been created with ${formData.maxUsers} member slots.`,
        variant: "default"
      });
      //navigate('/admin')
      setIsSubmitting(false);
    }, 800);

  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, image: file }));
  };
  
  const handleUserSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, maxUsers: value[0] }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-12">
    <TeamImageUpload onImageChange={handleImageChange} />

    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Team Details Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-slate-300 font-medium border-b border-slate-700/50 pb-4">
          <ClipboardList className="h-5 w-5 text-blue-400" />
          <span>Team Configuration</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="flex items-center gap-2 text-slate-300">
              <Hash className="h-4 w-4 text-blue-400" />
              Team name
            </Label>
            <Input
              name="commandName"
              placeholder="Team name"
              value={formData.commandName}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-700 focus:border-blue-400/50 rounded-xl h-12 px-4 text-slate-200 placeholder-slate-500 focus:ring-0"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="task" className="flex items-center gap-2 text-slate-300">
              <Target className="h-4 w-4 text-purple-400" />
              Team goal
            </Label>
            <Input
              name="commandTask"
              placeholder="Describe the team's goals in more detail."
              value={formData.commandTask}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-700 focus:border-purple-400/50 rounded-xl h-12 px-4 text-slate-200 placeholder-slate-500 focus:ring-0"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="flex items-center gap-2 text-slate-300">
              <FileText className="h-4 w-4 text-amber-400" />
              Team Description
            </Label>
            <Textarea
              name="commandDescription"
              placeholder="Describe your team's vision, goals and culture..."
              value={formData.commandDescription}
              onChange={handleChange}
              className="bg-slate-800/50 border-slate-700 focus:border-amber-400/50 rounded-xl min-h-[150px] p-4 text-slate-200 placeholder-slate-500 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Team Capacity Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-slate-300 font-medium border-b border-slate-700/50 pb-4">
          <Users className="h-5 w-5 text-emerald-400" />
          <span>Team Capacity</span>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-lg">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-400/90">Collaboration Scale</span>
            <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/30">
              {formData.maxUsers} Members
            </div>
          </div>

          <Slider
            value={[formData.maxUsers]}
            onValueChange={handleUserSliderChange}
            min={1}
            max={20}
            step={1}
            className="my-6"
            //@ts-ignore
            thumbClassName="h-5 w-5 bg-blue-500 border-2 border-blue-300/50 focus:ring-4 focus:ring-blue-500/20"
            trackClassName="bg-slate-700 h-2 rounded-full"
            rangeClassName="bg-blue-500 h-2 rounded-full"
          />

          <div className="flex justify-between text-sm text-slate-500 px-1">
            {[1, 5, 10, 15, 20].map((num) => (
              <span key={num} className="w-8 text-center">{num}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.div 
        className="pt-8 flex justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          className="relative overflow-hidden w-full max-w-xs py-6 text-lg font-medium rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
            shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30
            transition-all duration-300"
          disabled={isSubmitting}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          {isSubmitting ? (
            <div className="flex items-center gap-2 justify-center">
              <div className="h-5 w-5 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
              <span>Assembling Team...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center">
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
              <span>Launch Team</span>
            </div>
          )}
        </Button>
      </motion.div>
    </motion.div>
  </form>
  );
};

export default TeamForm;
