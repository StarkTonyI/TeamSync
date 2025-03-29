import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";


const userCommandApi = createApi({
    reducerPath: 'userCommandApi',
    tagTypes: ['userCommandApi'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        
        commandList: builder.query({
            query: () => "/api/command/user/list",
            providesTags: ["userCommandApi"],
        }),
        getAdminData: builder.query({
            query: () => "/api/command/user/get/admin/data",
            providesTags: ["userCommandApi"],
        }),
        getUserCommand: builder.query({
            query: () => "/api/command/user/user/command",
            providesTags: ["userCommandApi"],
        }),
        
        getOfflinePeople:builder.mutation({
            query:(data) => ({
                url:`/api/command/user/offline/people`, 
                method:'GET',
                credentials: 'include',
                body:data
            })
        }),
        joinTeam: builder.mutation({
            query: (id) => ({
                url: `/api/command/user/join/${id}`, // Adjust URL as needed
                method: 'PUT',
            }),
            invalidatesTags: ["userCommandApi"], // To refetch affected queries
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `/api/command/user/delete/user`, 
                method: 'DELETE',
            }),
            invalidatesTags: ["userCommandApi"],
        }),
        sendInvitation:builder.mutation({
            query:(id) => ({
                url:`/api/command/user/send/invitation/${id}`, 
                method:'PUT',
                credentials: 'include'
            })
        }),
    })
});

export const { 
    useCommandListQuery, 
    useJoinTeamMutation,
    useGetUserCommandQuery,
    useDeleteUserMutation,
    useSendInvitationMutation,
    useGetOfflinePeopleMutation,
    useGetAdminDataQuery
} = userCommandApi;
export default userCommandApi;
