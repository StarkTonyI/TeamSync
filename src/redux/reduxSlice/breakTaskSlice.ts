import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, ToolsOption } from '../../types/task';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../userApi/userApi';
import totalTaskApi from '../totalTaskApi/totalTask'

interface BreakTaskState {
    id:string;
    breakTask:Task[]; 
    editBreakTask: Task | null;
    mainTask:Task[],
    editMainTask:Task | null
}

const initialState: BreakTaskState  = {
  breakTask: [],
  editBreakTask: null,
  mainTask:[],
  editMainTask:null,
  id:''
};

function updateArray(arr1:Task[], arr2:Task[]) {
  const existingIds = new Set(arr1.map(item => item._id));
  const newItems = arr2.filter(item => !existingIds.has(item._id));
  return [...arr1, ...newItems];
}

function editArray(baseArray:Task[], updateArray:Task[]) {
  const updateMap = new Map(updateArray.map(item => [item._id, item]));
  return baseArray.map(item => updateMap.has(item._id) ? { ...item, ...updateMap.get(item._id) } : item);
}

const UpdateMainTaskArray = (mainTaskArray:Task[], id:string) =>{
 
  return mainTaskArray.map(task => {
    const totalTaskUser = task.userId.filter(i => i.id == id);
    const completedTask = totalTaskUser.filter(i => i.completed == 'true').length;
    
    if (completedTask > 0) {
      return { ...task, completed: true }; // Создаём обновлённый объект
    }
    return task; // Возвращаем неизменённый, если условие не выполнено

    });
}

export const fetchBreakTask = createAsyncThunk<Task[], { taskType:string, id:string }>(
  '/fetch/breakTask', 
    async ({ taskType, id }, { rejectWithValue, dispatch }) => {
    try {
        const task = await dispatch(
        userApi.endpoints.fetchBreakTask.initiate({taskType, id})  
     ).unwrap();
    
     return task;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createBreakTask = createAsyncThunk<Task[], { breakTask: Task, mainTaskId: string | undefined, taskType:string, id:string}>(
  '/create/breakTask', async ({ breakTask, mainTaskId, taskType, id }, { rejectWithValue, dispatch }) => {
    try {
      const data = await dispatch(
        userApi.endpoints.breakUpTheTask.initiate({ breakTask, mainTaskId, taskType })
      ).unwrap();
      await dispatch(totalTaskApi.endpoints.totalTaskUser.initiate(id))


      return data[taskType];

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const makeCompleteBreakTask = createAsyncThunk<Task[], { breakTaskId: string, taskType:string }>(
  '/makeComplete/breakTask', async ({ breakTaskId, taskType } , { rejectWithValue, dispatch }) => {
    try {
        const data = await dispatch(
        userApi.endpoints.breakTaskComplete.initiate({ breakTaskId, taskType })
      ).unwrap();
      
      return data[taskType];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const editBreakTaskFunction = createAsyncThunk<Task[], { breakTask: Task, taskId: string | undefined, taskType:string}>(
  '/edit/breakTask', async ({ breakTask, taskId, taskType }, { rejectWithValue, dispatch }) => {
    try {
 const data = await dispatch(
        userApi.endpoints.editBreakTask.initiate({breakTask,taskType, taskId })
      ).unwrap();
    
      return data[taskType];

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteBreakTask = createAsyncThunk<ToolsOption, { taskId:string, taskType:string }>(
  '/delete/breakTask', async ({taskId, taskType}, { rejectWithValue, dispatch }) => {
    try {
        const data = await dispatch(
        userApi.endpoints.deleteBreakTask.initiate({taskId, taskType})
      ).unwrap();
      
      return data;

    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const breakTaskSlice = createSlice({
    name: 'breakTask',
    initialState,
    reducers: {
  
        isEditTask(state, action: PayloadAction<Task | null>) {
          if(action.payload){
            console.log(action.payload)
            if(action.payload.priority){
              state.editMainTask = { ...action.payload, mainTaskId:'suavassav' }
            }else{
              state.editBreakTask = action.payload 
        }
      }else{
        state.editBreakTask = null;
      }
    },
        addIdMethod(state, action:PayloadAction<string | null>){
          if(action.payload){
            state.id = action.payload;
          }
        }
  },
    extraReducers: (builder) => {
      
      builder
            .addCase(fetchBreakTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
              if(state.breakTask.length == 0 || state.mainTask.length == 0){
                  const currentMainTask = JSON.parse(JSON.stringify(state.mainTask));
                  if(action.payload[0]?.mainTaskId){
                      state.breakTask = action.payload;
                    } else{
                      if(!currentMainTask.length)
                      state.mainTask = UpdateMainTaskArray(action.payload, state.id)
                     }
                }
            })

            .addCase(fetchBreakTask.rejected, (_, action) => {
                  console.error('Failed to fetch messages:', action.payload);
            })

            .addCase(createBreakTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
              console.log(action.payload)
              if(action.payload[0].mainTaskId){
                console.log('break')
                state.breakTask = action.payload;
                } else {
                  console.log('no brea')
                const currentMainTask = JSON.parse(JSON.stringify(state.mainTask));
                const correctArray = updateArray(currentMainTask, action.payload); 

                state.mainTask = UpdateMainTaskArray(correctArray, state.id)
                 }
            })

            .addCase(createBreakTask.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })

            .addCase(makeCompleteBreakTask.fulfilled, (state, action: PayloadAction<Task[]>) => {
                const currentMainTask = JSON.parse(JSON.stringify(state.mainTask));
              if(action.payload[0].priority) {
                const correctChange = editArray(currentMainTask, action.payload);
                state.mainTask = UpdateMainTaskArray(correctChange, state.id)
              } else {
                state.breakTask = action.payload
              }

            })

            .addCase(makeCompleteBreakTask.rejected, (_, action) => {
                console.error('Failed to fetch messages:', action.payload);
            }) 

            .addCase(editBreakTaskFunction.fulfilled, (state, action: PayloadAction<Task[]>) => {
              if(action.payload[0].priority){
                const currentMainTask = JSON.parse(JSON.stringify(state.mainTask));
                const correctEditMainTask = editArray(currentMainTask, action.payload);
                state.mainTask = UpdateMainTaskArray(correctEditMainTask, state.id)
              }else{
                state.breakTask = action.payload
              }
            })

            .addCase(editBreakTaskFunction.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })

            .addCase(deleteBreakTask.fulfilled, (state, action: PayloadAction<ToolsOption>) => {

                if(action.payload.taskType == 'mainTask'){
                  const currentMainTask = JSON.parse(JSON.stringify(state.mainTask));
                  const deleteMainTaskFilter = currentMainTask.filter((i: Task) => i._id !== action.payload.id);
                  state.mainTask = UpdateMainTaskArray(deleteMainTaskFilter, state.id);
                }else{
                    const currentBreakTask = JSON.parse(JSON.stringify(state.breakTask));
                    const deleteMainTaskFilter = currentBreakTask.filter((i:Task) => i._id !== action.payload.id);
                    state.breakTask = deleteMainTaskFilter;
                }
            })

            .addCase(deleteBreakTask.rejected, (_, action) => {
              console.error('Failed to fetch messages:', action.payload);
            })
              
    
            },
      
});

export const breakTaskState = (state: {breakTask:BreakTaskState}) => state.breakTask.breakTask;
export const editBreakTaskState = (state: {breakTask:BreakTaskState}) => state.breakTask.editBreakTask;

export const mainTaskState = (state: {breakTask:BreakTaskState}) => state.breakTask.mainTask;
export const editMainTaskState = (state: {breakTask:BreakTaskState}) => state.breakTask.editMainTask;

export const { isEditTask, addIdMethod } = breakTaskSlice.actions;

export default breakTaskSlice.reducer;