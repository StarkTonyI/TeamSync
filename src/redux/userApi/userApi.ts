import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";


const userApi = createApi({
    reducerPath:'userApi',
    tagTypes:['userApi'],
    baseQuery:baseQueryWithReauth,
    endpoints:(builder)=>({

        fetchBreakTask: builder.mutation({
            query: ({taskType, id}) => ({
                url:`/api/user/fetch/task/${id}/?taskType=${taskType}`,
                providesTags: ["userApi"],
                method:'GET'
            })
         
        }),
        breakUpTheTask:builder.mutation({
            query:({breakTask, mainTaskId, taskType}) => ({
                url:`/api/user/create/task/${mainTaskId}?taskType=${taskType}`,
                method:'PUT',
                body:breakTask,
                credentials:'include'
            })
        }),
        editBreakTask:builder.mutation({
            query:({breakTask,taskType, taskId}) => ({
                url:`/api/user/edit/breakTask/${taskId}?taskType=${taskType}`,
                method:'PUT',
                body:breakTask,
                credentials:'include'
            })
        }),
        deleteBreakTask:builder.mutation({
            query:({taskId, taskType}) => ({
                url:`/api/user/delete/breakTask/${taskId}?taskType=${taskType}`,
                method:'PUT',
                credentials:'include'
            })
        }),
        
        breakTaskComplete:builder.mutation({
            query:({breakTaskId, taskType})=>({
                url:`/api/user/complete/breakTask/${breakTaskId}?taskType=${taskType}`,
                method:'PUT',
                credentials:'include'
            })
        }),

        deleteBreakUpTheTask:builder.mutation({
            query:({data})=>({
            url: '/api/user/break/task/delete', 
            method:'DELETE',
            body:{data}
        })
    }),
    leaveCommand:builder.mutation({
        query:(id)=>({
        url: `/api/user/leave/command/${id}`, 
        method:'DELETE'
    })
})
    
})
})

export const { 
    useBreakUpTheTaskMutation, useDeleteBreakUpTheTaskMutation, 
    useFetchBreakTaskMutation, useBreakTaskCompleteMutation,
    useLeaveCommandMutation } = userApi;
export default userApi;