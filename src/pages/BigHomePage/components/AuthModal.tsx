// @ts-nocheck
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../uiCompoents/ui/dialog";
import { Button } from "../../../uiCompoents/ui/button";
import { Label } from "../../../uiCompoents/ui/label";
import { Input } from "../../../uiCompoents/ui/input";
import { UserPlus, LogIn } from "lucide-react";
import '../../RegisterLogin/RegisterLoginStyle.css'
import { useForm } from 'react-hook-form';
import { useLoginUserMutation, useRegisterUserMutation } from '../../../redux/authApi/authApi';
import { useState } from "react";
import LoadingSpinner from "../../../features/loadingSpinner/loadingSpinner";
import { useToast } from "../../../uiCompoents/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuthRole } from "../../../redux/reduxSlice/authSlice";
import { AppDispatch } from "../../../redux/store";
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
}


const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  
  const dispatch:AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);  
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const [registerApi] = useRegisterUserMutation();
  const [loginApi] = useLoginUserMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
const onSubmit = async (data: object) => {
    setLoading(true); 
    try {
      if (type === 'register') {
        await registerApi(data).unwrap();
        toast({
          title: "Account created",
          description: "Now login your account!",
        });
      } else if(type == 'login'){
        const response = await loginApi(data).unwrap();
        const jwtResponst = jwtDecode(response)
        localStorage.setItem('role', JSON.stringify(jwtResponst.role));
        dispatch(setAuthRole(jwtResponst.role))
        navigate(`/${jwtResponst.role}`)
      }
    } catch (e) {
      toast({
        title: "Error",
        description: `Failed to create account:${e.data}`,
      });
    } finally {
      setLoading(false); // В любом случае выключаем загрузку
    }
  };
 
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass-modal sm:max-w-md">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent -z-10" />
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            {type === 'login' ? (
              <>
                <LogIn className="h-5 w-5 text-primary" />
                <span>Welcome Back</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 text-primary" />
                <span>Join TeamSync</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {type === 'register' && (
            <div className="space-y">
              <Label htmlFor="name" className="text-sm font-medium">
          Full Name
              </Label>
              <Input
        id="username" // Consistent with the field name
        {...register("username", { 
          required: "This field is required!", // You can add a message
          minLength: {
            value: 5, // Minimum length of 5 characters
            message: "At least 5 characters!"
          },
          maxLength: {
            value: 15,
            message: "No more than 15 characters!"
          },
          pattern: {
            value: /^\S+$/, // Only non-whitespace characters
            message: "Spaces are not allowed!"
          }
        })}
             
        className="bg-secondary/50 border-secondary"
        placeholder="Enter your name"/>
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
         
        </div>
           
        )}
            { type === 'register' && 
          <div className="space-y">
          <Label htmlFor="login" className="text-sm font-medium">
            Last name
          </Label>
          <Input
            id="Lastname"
            type="text"
            { ...register('lastname', { required:true, 
          minLength: {
            value: 3, // Minimum length of 3 characters
            message: "At least 3 characters!"
          },
          maxLength: {
            value: 15,
            message: "No more than 15 characters!"
          },
          pattern: {
            value: /^\S+$/, // Only non-whitespace characters
            message: "Spaces are not allowed!"
          }
             } ) }
            className="bg-secondary/50 border-secondary"
            placeholder="Enter your login"
            required
          />
          {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
        </div>
            }
          <div className="space-y">
            <Label htmlFor="text" className="text-sm font-medium">
              Login
            </Label>
            <Input
              id="login"
              type="text"
              { ...register('login', { required:true, 
            minLength: {
              value: 3, // Minimum length of 3 characters
              message: "At least 3 characters!"
            },
            maxLength: {
              value: 15,
              message: "No more than 15 characters!"
            },
            pattern: {
              value: /^\S+$/, // Only non-whitespace characters
              message: "Spaces are not allowed!"
            }
               } ) }
              className="bg-secondary/50 border-secondary"
              placeholder="Enter your login"
              required
            />
            {errors.login && <p className="text-red-500">{errors.login.message}</p>}
          </div>
            
          <div className="space-y">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              { ...register('password', { required:true,
            minLength: {
              value: 8, // Minimum length of 8 characters
              message: "At least 8 characters!"
            },
            pattern: {
              value: /^\S+$/, // Only non-whitespace characters
              message: "Spaces are not allowed!"
            }
               })}
              className="bg-secondary/50 border-secondary"
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
            
            { type == 'register' && (
        <div id="firstFilter" className="filter-switch">
        <input
             {...register("role", { required: true })}
          id="option1"
          type="radio"
          value="user" // Set a value for this radio button
          defaultChecked
             />
        <label className="option" htmlFor="option1">User</label>

        <input
             {...register("role", { required: true })}
          id="option2"
          type="radio"
          value="admin" // Set a value for this radio button
        />
        <label className="option" htmlFor="option2">Admin</label>

        <span className="background"></span>
            </div>
            ) }    
            

          <Button 
            type="submit" 
            className={`w-full ${ !loading  ? 'bg-primary' : 'bg-white/30'}  hover:bg-primary/90 transition-colors `}>
           
           { loading && <LoadingSpinner/> }
           {type === 'login' ? 'Login' : 'Create Account'}
          
          </Button>
          
          {type === 'login' ? (
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => {
            onClose();
            setTimeout(() => onClose(), 100);
          }}
              >
         
          Sign up
              </button>
            </p>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              
              <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => {
            onClose();
            setTimeout(() => onClose(), 100);
          }}
              >
          Sign in
              </button>
            </p>
          )}
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
