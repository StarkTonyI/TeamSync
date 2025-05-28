import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import adminApi from '../adminApi/adminApi';


export const fetchJoinUserOrCommand = createAsyncThunk(
    '/joinUserOrTeam/fetch',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await dispatch(
                adminApi.endpoints.getNotificatoinAndCommandUsers.initiate({})
            ).unwrap();
        
            return response
        } catch (err: any) {
            return rejectWithValue(err.message); // Pass error message to the state
        }
    }
);

interface JoinState {
    joinState: string[]; // Replace 'string' with the appropriate type if needed
    loading: boolean;
    hasInitialized: boolean;
}

const initialState: JoinState = { joinState: [], loading: false, hasInitialized: false };

const joinSlice = createSlice({
    name: 'join',
    initialState,
    reducers: {
        addJoinId: (state, action) => {
           state.joinState.push(action.payload);
        },
        setInitialized: (state) => {
            state.hasInitialized = true;
          },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchJoinUserOrCommand.fulfilled, (state, action) => {
            const currentJoinState = JSON.parse(JSON.stringify(state.joinState));
          
            if (!currentJoinState.length) {
              state.joinState = Array.isArray(action.payload.allIds) ? action.payload.allIds : [];
            }
          })
        .addCase(fetchJoinUserOrCommand.rejected, (_, action) => {
          console.error('Failed to fetch messages:', action.payload);
        })
    }
});
 
export const { addJoinId, setInitialized } = joinSlice.actions;
//export const joinIdState = (state: {join:JoinState}) => state.join.joinState;
export default joinSlice.reducer;
