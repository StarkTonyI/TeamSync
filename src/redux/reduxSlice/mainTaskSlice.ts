import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../taskDashboard/types/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import adminApi from '../adminApi/adminApi';
import { TaskType } from '../../types/TaskType';

interface BreakTaskState {
    mainTask:Task[],
    editMainTask:TaskType | null
}

const initialState: BreakTaskState  = {
  mainTask:[],
  editMainTask:null
};

export const fetchMainTask = createAsyncThunk(
  '/fetch/mainTask', 
    async (_, { rejectWithValue, dispatch }) => {
    try {
        const task = await dispatch(
        adminApi.endpoints.fetchMainTask.initiate({})  
     ).unwrap();
     return task;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const assignMainTask = createAsyncThunk<Task[], { userId:string, task:Task, description:string  }>(
  '/assign/mainTask', 
    async ({userId, task, description}, { rejectWithValue, dispatch }) => {
      try {
      const taskObject = {
        task,
        description
      }
      const mainTaskAssign = await dispatch(
     
        adminApi.endpoints.assignTask.initiate({userId, taskObject})  
     ).unwrap();
  
     return mainTaskAssign;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
)


export const createMainTask = createAsyncThunk<Task, { mainTask: Task  }>(
  '/create/mainTask', async ({ mainTask, }, { rejectWithValue, dispatch }) => {
    try {
      const data = await dispatch(
        adminApi.endpoints.createMainTask.initiate({ mainTask })
      ).unwrap();
      return data;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const makeCompleteBreakTask = createAsyncThunk<Task[], { breakTaskId: Task}>(
  '/makeComplete/breakTask', async ({ breakTaskId } , { rejectWithValue, dispatch }) => {
    try {

      const data = await dispatch(
        adminApi.endpoints.breakTaskComplete.initiate({ breakTaskId })
      ).unwrap();

      return data.breakTask;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editMainTaskFunction = createAsyncThunk<Task[], { mainTask: Task, taskId: string | undefined}>(
  '/edit/mainTask', async ({ mainTask, taskId }, { rejectWithValue, dispatch }) => {
    try {    
      const data = await dispatch(
        adminApi.endpoints.editMainTask.initiate({mainTask, taskId })
      ).unwrap();

      return data.mainTask;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const makeCompleteMainTaskForTotal = createAsyncThunk<Task[], { breakTaskId: Task}>(
  '/makeComplete/breakTask', async ({ breakTaskId } , { rejectWithValue, dispatch }) => {
    try {

      const data = await dispatch(
        adminApi.endpoints.breakTaskComplete.initiate({ breakTaskId })
      ).unwrap();

      return data.breakTask;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



export const deleteMainTask = createAsyncThunk<Task, { taskId:string }>(
  '/delete/mainTask', async ({taskId}, { rejectWithValue, dispatch }) => {
    try {
      const data = await dispatch(
        adminApi.endpoints.deleteMainTask.initiate({taskId})
      ).unwrap();

      return data;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const mainTaskSlice = createSlice({
    name: 'mainTask',
    initialState,
    reducers: {
        isEditMainTask(state, action: PayloadAction<TaskType | null>) {
          if(action.payload){
            state.editMainTask = { ...action.payload }
      }    
    },
},
     extraReducers: (builder) => {
          builder
            .addCase(fetchMainTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
              if(state.mainTask.length == 0){
                    state.mainTask = action.payload
                }
            })
            .addCase(fetchMainTask.rejected, (_, action) => {
                  console.error('Failed to fetch messages:', action.payload);
            })
  
            .addCase(createMainTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.mainTask = action.payload.mainTask
            })
            .addCase(createMainTask.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })
            .addCase(makeCompleteBreakTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
              state.mainTask = action.payload
            })
            .addCase(makeCompleteBreakTask.rejected, (_, action) => {
                console.error('Failed to fetch messages:', action.payload);
            })
            .addCase(assignMainTask.fulfilled, (state, action: PayloadAction<Task[]>) => {

             state.mainTask = action.payload
            })
            .addCase(assignMainTask.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })
            .addCase(editMainTaskFunction.fulfilled, (state, action: PayloadAction<Task[]>) => {
              state.mainTask = action.payload
            })
            .addCase(editMainTaskFunction.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })
            .addCase(deleteMainTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.mainTask = action.payload.mainTask
              
            })
            .addCase(deleteMainTask.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })
              

      },
});


export const mainTaskStateAdmin = (state: {mainTask:BreakTaskState}) => state.mainTask.mainTask;
export const editMainTaskStateAdmin = (state: {mainTask:BreakTaskState}) => state.mainTask.editMainTask;

export const { isEditMainTask } = mainTaskSlice.actions;

export default mainTaskSlice.reducer;