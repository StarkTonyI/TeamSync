import './profileCard.css'
import { User } from '../findUserModal/findUserModal';
import { UserModalInvite } from '../userModalIvite/UserModal';
import { useState } from 'react';

interface Command {
  _id: string;
  commandName: string;
  commandDescription: string;
  admin:string;
  commandTask:string;
}
interface ProfileCardProps {
  animate: string;
  profileData:Command | User
}

export default function ProfileCard({ animate, profileData }: ProfileCardProps) {
  const [isModalOpen,setIsModalOpen] = useState(true);

return <UserModalInvite
        animate={animate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // @ts-ignore
        user={profileData}
      />
} 