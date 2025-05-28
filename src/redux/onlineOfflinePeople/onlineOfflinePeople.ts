import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    username: string;
}

interface OnlineOfflinePeopleState {
    onlinePeople: Record<string, string>;
    offlinePeople: Record<string, string>;
}

const initialState: OnlineOfflinePeopleState = {
    onlinePeople: {},
    offlinePeople: {}
};

const onlineOfflinePeopleSlice = createSlice({
    name: 'onlineOfflinePeople',
    initialState,
    reducers: {
        showOnlinePeople(state, action: PayloadAction<{ online: User[] }>) {
            const onlineObj: Record<string, string> = {};
            const filteredArr = action.payload.online.filter(obj => Object.keys(obj).length > 0);
            filteredArr.forEach(({ id, username }) => {
                onlineObj[id] = username;
            });
            state.onlinePeople = onlineObj;
        },

        fetchPeopleList(state, action: PayloadAction<{ listCommandData: User[], id: string }>) {       
        const { listCommandData, id } = action.payload;
            if (listCommandData && id) {
                const listCommandDataFilter = listCommandData.filter(i => i.id);
                const offlinePeople = listCommandDataFilter?.filter(
                    (user) => user.id !== id && !state.onlinePeople[user.id]
                );
                const offlinePeopleMap = offlinePeople.reduce((acc: Record<string, string>, 
                { id, username }) => {
                    acc[id] = username;
                    return acc;
                }, {});


                state.offlinePeople = offlinePeopleMap;
                state.onlinePeople = { ...state.onlinePeople };
       
                }
        }
    }
});

export const selectOnlinePeople = (state: { onlineOfflinePeople: OnlineOfflinePeopleState }) => 
state.onlineOfflinePeople.onlinePeople;
export const selectOfflinePeople = (state: { onlineOfflinePeople: OnlineOfflinePeopleState }) => 
state.onlineOfflinePeople.offlinePeople;

export const {
    showOnlinePeople,
    fetchPeopleList,
} = onlineOfflinePeopleSlice.actions;

export const selectAllPeople = (state: { onlineOfflinePeople: OnlineOfflinePeopleState }) => ({
    ...state.onlineOfflinePeople.onlinePeople,
    ...state.onlineOfflinePeople.offlinePeople
});

export default onlineOfflinePeopleSlice.reducer;