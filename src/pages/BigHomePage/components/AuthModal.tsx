
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../uiCompoents/ui/dialog";
import { Button } from "../../../uiCompoents/ui/button";
import { Label } from "../../../uiCompoents/ui/label";
import { Input } from "../../../uiCompoents/ui/input";
import { UserPlus, LogIn } from "lucide-react";
import '../../RegisterLogin/RegisterLoginStyle.css'
import { useForm } from 'react-hook-form';
import { useLoginUserMutation, useRegisterUserMutation } from '../../../redux/authApi/authApi';
import { useState } from "react";
import { useToast } from "../../../uiCompoents/hooks/use-toast";
import {  useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuthRole } from "../../../redux/reduxSlice/authSlice";
import { AppDispatch } from "../../../redux/store";
import Spinner from "../../../features/spinner/spinner";
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
        localStorage.removeItem('chart_start_date')
        const response = await loginApi(data).unwrap();
        interface CustomJwtPayload extends JwtPayload {
          role: string;
        }
        const jwtResponst = jwtDecode<CustomJwtPayload>(response);
        localStorage.setItem('role', JSON.stringify(jwtResponst.role));
        dispatch(setAuthRole(jwtResponst.role))
        navigate(`/${jwtResponst.role}`)
      }
    } catch (e) {
      const errorMessage = (e as { data?: string })?.data || "Unknown error";
      toast({
        title: "Error",
        description: `Failed to create account: ${errorMessage}`,
      });
    } finally {
      setLoading(false); // В любом случае выключаем загрузку
    }
  };
 
return <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
<DialogContent className="bg-gradient-to-b from-[#0d1117] to-[#1a2232] border border-[#2d3748] rounded-3xl p-8 max-w-md space-y-6 shadow-xl">
  <DialogHeader>
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="p-4 rounded-full bg-[#1e2a3a] shadow-lg mb-2">
        {type === 'login' ? (
          <LogIn className="h-7 w-7 text-cyan-400" />
        ) : (
          <UserPlus className="h-7 w-7 text-cyan-400" />
        )}
      </div>
      <DialogTitle className="text-3xl font-extrabold text-white drop-shadow-sm">
        {type === 'login' ? 'Welcome Back' : 'Create Account'}
      </DialogTitle>
     
    </div>
  </DialogHeader>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {type === 'register' && (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-cyan-100">
            First name
          </Label>
          <Input
            id="username"
            {...register("username")}
            className="bg-[#1f2937] text-white border border-[#374151] focus:ring-2 focus:ring-cyan-500"
            placeholder="John"
          />
          {errors.username && (
            <p className="text-sm text-red-400 mt-1">{errors.username?.message?.toString()}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastname" className="text-cyan-100">
            Last name
          </Label>
          <Input
            id="lastname"
            {...register('lastname')}
            className="bg-[#1f2937] text-white border border-[#374151] focus:ring-2 focus:ring-cyan-500"
            placeholder="Doe"
          />
          {errors.lastname && (
            <p className="text-sm text-red-400 mt-1">{errors?.lastname?.message?.toString()}</p>
          )}
        </div>
      </div>
    )}

    <div className="space-y-2">
      <Label htmlFor="login" className="text-cyan-100">
        Username
      </Label>
      <Input
        id="login"
        {...register('login')}
        className="bg-[#1f2937] text-white border border-[#374151] focus:ring-2 focus:ring-cyan-500"
        placeholder="johndoe"
      />
      {errors.login && (
        <p className="text-sm text-red-400 mt-1">{errors?.login?.message?.toString()}</p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="password" className="text-cyan-100">
        Password
      </Label>
      <Input
        id="password"
        type="password"
        {...register('password')}
        className="bg-[#1f2937] text-white border border-[#374151] focus:ring-2 focus:ring-cyan-500"
        placeholder="••••••••"
      />
      {errors.password && (
        <p className="text-sm text-red-400 mt-1">{errors?.password?.message?.toString()}</p>
      )}
    </div>

    {type === 'register' && (
      <div className="space-y-2">
        <Label className="text-cyan-100">Account Type</Label>
        <div className="flex gap-3">
          <label className="flex-1">
            <input
              type="radio"
              {...register("role")}
              value="user"
              className="peer hidden"
            />
            <div className="p-3 text-center rounded-xl border border-[#374151] peer-checked:border-cyan-500 peer-checked:bg-[#132736] cursor-pointer transition-all text-white">
              Member
            </div>
          </label>
          <label className="flex-1">
            <input
              type="radio"
              {...register("role")}
              value="admin"
              className="peer hidden"
            />
            <div className="p-3 text-center rounded-xl border border-[#374151] peer-checked:border-cyan-500 peer-checked:bg-[#132736] cursor-pointer transition-all text-white">
              Admin
            </div>
          </label>
        </div>
      </div>
    )}

    <Button
      type="submit"
      className="w-full h-12 text-base font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all duration-200 shadow-md"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner />
          Processing...
        </div>
      ) : type === 'login' ? (
        'Sign In'
      ) : (
        'Create Account'
      )}
    </Button>

 
  </form>
</DialogContent>

</Dialog>
};

export default AuthModal;
