import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";

const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['authApi'],
    baseQuery:baseQueryWithReauth,
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url:'/api/auth/profile',
                method:'GET',
                credentials:'include'
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/register',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        editProfile: builder.mutation({
            query: (data) => ({
                url: '/api/auth/profile/edit',
                method: 'PUT',
                body: data,
                credentials: 'include'
            })
        }),
        leaveProfile: builder.mutation({
            query: (id) => ({
                url: `/api/auth/profile/leave/${id}`,
                method: 'PUT',
            })
        }),
        deleteProfile: builder.mutation({
            query: (id) => ({
                url: `/api/auth/profile/delete/${id}`,
                method: 'DELETE',
            })
        }),
    })
});
export const { 
    useGetProfileQuery, 
    useLoginUserMutation,
    useEditProfileMutation,
    useRegisterUserMutation,
    useDeleteProfileMutation,
    useLeaveProfileMutation
} = authApi;

export default authApi;
