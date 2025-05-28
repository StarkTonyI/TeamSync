
import React, { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useFetchUsersLogoMutation, useGetCommandUsersQuery } from "../../../../redux/adminCommandApi/AdminCommandApi";
import { logoType, userTypeInterface } from "../../../../types/TaskType";


interface UsersGridProps {
  onUserClick: (user: userTypeInterface, logo:logoType[]) => void;
}

export const UsersGrid: React.FC<UsersGridProps> = ({ onUserClick }) => {
 
     const [fetchUsersLogo] = useFetchUsersLogoMutation();
      const [usersLogo, setUsersLogo] = useState<logoType[]>([]);
     const { data: userCommand, isLoading } = useGetCommandUsersQuery({}) || [];
 
     const isEmpty = (obj:any) => Object.keys(obj).length > 0;
 
     const result = userCommand?.users.reduce((acc:any, item:any) => {
       acc[item.id] = item.username; // Создаём ключ id, значением делаем name
       return acc;
     }, {});
 
 
   useEffect(()=>{
    async function fetchUsersLogoFunction(){    
     if(isEmpty(result || {})){
       const userLogo = await fetchUsersLogo(result).unwrap();
       setUsersLogo(userLogo);
     }
   }
     fetchUsersLogoFunction()
   }, [userCommand]);
 
 
   if(isLoading){
    return null;
   }

  return (
    
    <Swiper 
    slidesPerView={3} 
    spaceBetween={15} 
    navigation 
    modules={[Navigation]}
    className='w-full max-w-full'
    breakpoints={{
      0: { slidesPerView: 1, spaceBetween: 15 },
      638: { slidesPerView: 1, spaceBetween: 15 },
      1024: { slidesPerView: 2, spaceBetween: 20 }}}>

    { userCommand?.users.map((user:userTypeInterface, index:number) => (
      <SwiperSlide key={index}>
          <UserCard key={user.id} user={user} onClick={() => onUserClick(user, usersLogo)} logo={usersLogo}/>
      </SwiperSlide>       
    ))}
  </Swiper>

  );
};
