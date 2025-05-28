import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";



const adminCommandApi = createApi({
    reducerPath: 'adminCommandApi',
    tagTypes: ['adminCommandApi'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        getCommand: builder.query({
            query: () => "/api/command/admin/command",
            providesTags: ["adminCommandApi"]
        }),
        getCommandUsers:builder.query({
            query:()=>"/api/command/admin/command/users",
            providesTags:["adminCommandApi"]
        }),
        getNotificationCommand:builder.query({
            query:() => "/api/command/admin/notificatoin",
            providesTags:["adminCommandApi"]
        }),
        getUser:builder.mutation({
            query: (id) => ({
                url: `/api/command/admin/command/fetch/user/${id}`, 
                method: 'GET'
            }),
        }),
        getMainTaskUser:builder.mutation({
            query: (id) => ({
                url: `/api/command/admin/command/fetch/maintask/user/${id}`, 
                method: 'GET'
            }),
        }),
        createCommand:builder.mutation({
            query: (data) => ({
                url: `/api/command/admin/create`, 
                method: 'POST',
                body:data
            }),
        }),
        acceptUser:builder.mutation({
            query: (id)=> ({
                url:`/api/command/admin/accept/user/${id}`,
                method:'PUT',
            })
        }),
        deleteUser:builder.mutation({
            query:(id) => ({
                url:`/api/command/admin/delete/user/${id}`,
                method:'DELETE'
            })
        }),
        deleteCommand: builder.mutation({
            query: () => ({
                url: `/api/command/admin/delete`, 
                method: 'DELETE',
            }),
            invalidatesTags: ["adminCommandApi"],
        }),
        fetchUsersLogo:builder.mutation({
            query: (ids) => ({
                url: `/api/command/admin/fetch/user/logo`, 
                method: 'POST',
                body:ids
            }),
            invalidatesTags: ["adminCommandApi"],
        }),
    })
});

export const { 
    useGetCommandQuery,
    useGetMainTaskUserMutation, 
    useDeleteCommandMutation,
    useCreateCommandMutation,
    useGetCommandUsersQuery,
    useDeleteUserMutation,
    useGetNotificationCommandQuery,
    useAcceptUserMutation,
    useGetUserMutation,
    useFetchUsersLogoMutation
} = adminCommandApi;
export default adminCommandApi;
