import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";
const adminApi = createApi({
    reducerPath:'adminApi',
    tagTypes:['adminApi'],
    baseQuery: baseQueryWithReauth,
    endpoints:(builder) => ({
        
        getUsers:builder.query({
            query:()=>"/api/admin/users",
        }),
        
        getNotificatoinAndCommandUsers:builder.query({
            query:()=>'/api/admin/fetch/notification',
    }
),
        deleteNotification:builder.mutation({
            query:(id)=>({
                url:`/api/admin/notification/delete/${id}`,
                method:'PUT', 
            })
        }),
        makeReadNotification:builder.mutation({
            query:()=>({
                url:`/api/admin/notification/read`,
                method:'PUT', 
            })
        }),
        assignTask:builder.mutation({
            query:({userId, taskObject})=>({
                url:`/api/admin/assign/task/${userId}`,
                method:'PUT', 
                body:taskObject
            })
        }),
        inviteUser:builder.mutation({
            query:(id)=>({
                url:`/api/admin/invite/user/${id}`,
                method:"PUT"
            }),
            invalidatesTags: ["adminApi"],
        }),
        fetchMainTask: builder.mutation({
            query: () => ({
                url:`/api/admin/fetch/mainTask`,
                method:'GET',
                providesTags: ["adminApi"]
            })
        }),   
        
        fetchUserMainTask: builder.mutation({
            query: (id) => ({
                url:`/api/admin/fetch/user/mainTask/${id}`,
                method:'GET',
                providesTags: ["adminApi"]
            })
        }),

        createMainTask:builder.mutation({
            query:({mainTask}) => ({
                url:`/api/admin/create/task`,
                method:'PUT',
                body:mainTask,
                credentials:'include'
            })
        }),
        editMainTask:builder.mutation({
            query:({mainTask, taskId}) => ({
                url:`/api/admin/edit/mainTask/${taskId}`,
                method:'PUT',
                body:mainTask,
                credentials:'include'
            })
        }),
        deleteMainTask:builder.mutation({
            query:({taskId}) => ({
                url:`/api/admin/delete/mainTask/${taskId}`,
                method:'PUT',
                credentials:'include'
            })
        }),
        breakTaskComplete:builder.mutation({
            query:({breakTaskId})=>({
                url:`/api/admin/complete/breakTask/${breakTaskId}`,
                method:'PUT',
                credentials:'include'
            })
        }),
        deleteBreakUpTheTask:builder.mutation({
            query:({data})=>({
            url: '/api/admin/break/task/delete', 
            method:'DELETE',
            body:{data}
            })
        }),
        deleteCommand:builder.mutation({
            query:(id)=>({
            url: `/api/admin/delete/command/${id}`, 
            method:'DELETE',
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
            url: `/api/admin/delete/user/${id}`, 
            method:'DELETE',
            })
        }),
      
    })
});
export const { 
    useGetUsersQuery, useInviteUserMutation, useAssignTaskMutation, 
    useBreakTaskCompleteMutation, useCreateMainTaskMutation, useDeleteMainTaskMutation,
    useDeleteBreakUpTheTaskMutation, useEditMainTaskMutation, useFetchUserMainTaskMutation, 
    useFetchMainTaskMutation, useGetNotificatoinAndCommandUsersQuery, 
    useDeleteNotificationMutation, useMakeReadNotificationMutation, useDeleteCommandMutation,useDeleteUserMutation

} = adminApi;

export default adminApi;