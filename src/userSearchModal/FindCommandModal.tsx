
import { Dispatch, SetStateAction } from 'react';
import TeamModal from './components/TeamModal';

export interface CommandListType {
  admin: string;
  commandDescription: string;
  commandMemberNumber: string;
  commandName: string;
  commandTask: string;
  notification: [];
  users: [];
  _id: string;
}

interface CommandType {
  commandList: CommandListType[]; // Updated to an array
  setCommandModal: Dispatch<SetStateAction<boolean>>;
  commandModal: boolean;
}

const CommandModalSearch = ({ commandList, commandModal, setCommandModal }: CommandType) => {
  return (
    <>
      {commandList?.length > 0 && (
        <TeamModal
          isOpen={commandModal}
          onClose={() => setCommandModal(false)}
          commandList={commandList} // Pass the array
        />
      )}
    </>
  );
};

export default CommandModalSearch;