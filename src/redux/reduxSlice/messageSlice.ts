import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { messageApi } from '../messageApi/messageApi';



interface Message { 
    _id: string;
    messageText: string;
    sender: string;
    recipient: string;
}

interface MessageState {
    messagesState: Message[];
    loading: boolean;
}

interface FetchMessagesPayload {
    selectedUserId: string;
}

interface DeleteMessagePayload {
    messageDeleteArray: [{
        message: string;
        sender: string;
        id: string | undefined;
    }],
    status:boolean
  }
  
  interface DeleteMessageArgs {
    messageDeleteArray: [{
        message: string;
        sender: string;
        id: string | undefined;
    }],
    status:boolean
  }
//message, sender, id
  
type Item1 = { _id: number; [key: string]: any };
type Item2 = { id: number; [key: string]: any };

    const removeItemsById = (first: Item1[], second: Item2[]): Item1[]=> {
        const idsToRemove = new Set(second.map(item => item.id));           
        return first.filter(item => !idsToRemove.has(item._id));
};



export const deleteMessageAsync = createAsyncThunk<DeleteMessagePayload, DeleteMessageArgs>(
    'messages/deleteMessage',
    async ({ messageDeleteArray, status }, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(
                 messageApi.endpoints.deleteMessage.initiate({
                    status:status,
                    data: messageDeleteArray
                })
            ).unwrap();
            return { messageDeleteArray, status }
        } catch (err: any) {
            return rejectWithValue(err.message); // Pass error message to the state
        }
    }
);

export const fetchMessages = createAsyncThunk<Message[], FetchMessagesPayload>(
    'messages/fetchMessages', 
    async( { selectedUserId }, { rejectWithValue, dispatch }) => {
    if (selectedUserId) {
        try {
            const messages = await dispatch(messageApi.endpoints.getMessages.initiate(selectedUserId)).unwrap();
           
            return messages;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
});

export const fetchLastMessages = createAsyncThunk<Message[], FetchMessagesPayload>(
    'messages/fetchMessages', 
    async( _, { rejectWithValue, dispatch }) => {
        try {
            const messages = await dispatch(messageApi.endpoints. getMessages.initiate({})).unwrap();
            return messages;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
});

const initialState: MessageState = { messagesState:[], loading: false };

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messagesState.push(action.payload); 
    
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;  // Начали загрузку
            })
            .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.messagesState = action.payload;  
                state.loading = false
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.error('Failed to fetch messages:', action.payload);
                state.loading = false;
            })
            .addCase(deleteMessageAsync.fulfilled, (state, action: PayloadAction<DeleteMessagePayload>) => {
                const { messageDeleteArray } = action.payload;
                console.log(action.payload)
                const currentMainTask = JSON.parse(JSON.stringify(state.messagesState));
                if(messageDeleteArray.length > 0){
                //@ts-ignore
                const deleteMessage = removeItemsById(currentMainTask, messageDeleteArray); state.messagesState = deleteMessage
                }
                
            })
            .addCase(deleteMessageAsync.rejected, (_, action) => {
                console.error('Error deleting message:', action.payload);
               
            });
    }
});

export const selectMessages = (state: { messages: MessageState }) => state.messages.messagesState;
export const selectLoading = (state: { messages:MessageState }) => state.messages.loading;

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
