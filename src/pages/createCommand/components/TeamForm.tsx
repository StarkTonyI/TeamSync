
import React, { useState } from 'react';
import { useToast } from '../../../uiCompoents/hooks/use-toast';
import { Button } from '../../../uiCompoents/ui/button';
import { Input } from '../../../uiCompoents/ui/input';
import { Textarea } from '../../../uiCompoents/ui/textarea';
import { Slider } from '../../../uiCompoents/ui/slider';
import TeamImageUpload from './TeamImageUpload';
import { Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getBaseUrl from '../../../features/getBaseUrl';

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
  
  const getAnimationDelay = (index: number) => {
    return { animationDelay: `${0.2 + index * 0.1}s` };
  };



  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <TeamImageUpload onImageChange={handleImageChange} />
      
      <div className="space-y-6">
        <div className="animate-fade-up" style={getAnimationDelay(0)}>
          <div className="inline-block px-2.5 py-1 mb-2 rounded-full bg-white/10 text-xs font-medium tracking-wider text-white/70">
            TEAM DETAILS
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                Team Name
              </label>
              <Input
                id="name"
                name="commandName"
                placeholder="Enter team name"
                value={formData.commandName}
                onChange={handleChange}
                className="bg-white/5 border-white/10 input-focus-effect h-12"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
                Command Task
              </label>
              <Input
                id="name"
                name="commandTask"
                placeholder="Enter command task"
                value={formData.commandTask}
                onChange={handleChange}
                className="bg-white/5 border-white/10 input-focus-effect h-12"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-1.5">
                Description
              </label>
              <Textarea
                id="description"
                name="commandDescription"
                placeholder="What's this team about?"
                value={formData.commandDescription}
                onChange={handleChange}
                className="bg-white/5 border-white/10 input-focus-effect min-h-[120px] resize-none"
              />
            </div>
          </div>
        </div>
        
        <div className="animate-fade-up" style={getAnimationDelay(1)}>
          <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-white/10 text-xs font-medium tracking-wider text-white/70 flex items-center gap-1.5">
            <Users size={12} />
            <span>TEAM CAPACITY</span>
          </div>
          
          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-white/70">Members allowed</span>
              <div className="bg-white/10 rounded-lg px-3 py-1 text-white font-medium">
                {formData.maxUsers}
              </div>
            </div>
            
            <Slider
              defaultValue={[5]}
              max={20}
              min={1}
              step={1}
              value={[formData.maxUsers]}
              onValueChange={handleUserSliderChange}
              className="my-4"
            />
            
            <div className="flex justify-between text-xs text-white/50 px-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>
        </div>
        
        <div 
          className="pt-6 animate-fade-up flex justify-center" 
          style={getAnimationDelay(2)}
        >
          <Button 
            type="submit" 
            className="bg-white text-black hover:bg-white/90 transition-all px-8 py-6 h-auto rounded-full group button-shine min-w-[200px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus size={18} className="group-hover:scale-110 transition-transform" />
                <span>Create Team</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TeamForm;
