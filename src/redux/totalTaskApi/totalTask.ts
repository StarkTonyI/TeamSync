import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";


const totalTaskApi = createApi({
    reducerPath: 'totalTaskApi',
    tagTypes: ['totalTaskApi'],
    baseQuery:baseQueryWithReauth,
    endpoints: (builder) => ({
        
        totalTaskUser: builder.mutation({
            query: (id) => ({
                url: `/api/analyze/user/analyzeTask/${id}`,
                method: 'POST',
                credentials: 'include'
            })
        }),
        
        totalTaskAdmin: builder.mutation({
            query: (id) => ({
                url: `/api/analyze/admin/analyzeTask/${id}`,
                method: 'POST',
                credentials: 'include'
            })
        }),


    })
});
export const { 
    useTotalTaskUserMutation, useTotalTaskAdminMutation
} = totalTaskApi;

export default totalTaskApi;
