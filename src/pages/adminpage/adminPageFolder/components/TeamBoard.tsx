import { useEffect, useState } from 'react';
import AdminModal from '../../../../features/adminModal/AdminModal';
import { useFetchUsersLogoMutation, useGetCommandUsersQuery } from '../../../../redux/adminCommandApi/AdminCommandApi';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import '../../../UserPage/UserPage.css';
import { logoType } from '../../../../types/TaskType';

interface TeamBoardType {
  editOrDelete:string;
} 
const TeamBoard = ({ editOrDelete }:TeamBoardType ) => {
    const [fetchUsersLogo] = useFetchUsersLogoMutation();
    const [usersLogo, setUsersLogo] = useState<logoType[]>([]);
    const { data: userCommand } = useGetCommandUsersQuery({}) || [];

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


 return (
    
  <Swiper 
  slidesPerView={3} 
  spaceBetween={20} 
  navigation 
  modules={[Navigation]}
  className='max-w-full'
  breakpoints={{
    0: { slidesPerView: 1, spaceBetween: 10 },
    638: { slidesPerView: 2, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
  }}
  >
    {
      userCommand?.users.map((member:any) => (
        <SwiperSlide key={member.id}>
          <AdminModal  member={member} logo={usersLogo} editOrDelete={editOrDelete}/> 
        </SwiperSlide>
      ))
    }
  </Swiper>
    
  );
};

export default TeamBoard;




