import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../baseQueryWithReauth";

export const messageApi = createApi({
    reducerPath: 'messageApi',
    tagTypes: ['messageApi'],
    baseQuery:baseQueryWithReauth,
    endpoints: (builder) => ({
        getLastMessageChat:builder.query({
            query:()=>"/api/messages/fetch/lastMessages",
        }),
        getMessages: builder.mutation({
            query: (id) => ({
                url:`/api/messages/list/${id}`,
                method:'POST',
                credentials:'include'
            })
        }),
        deleteMessage: builder.mutation({
            query: ({data, status}) => ({
                url: `/api/messages/delete/?status=${status}`,
                method: 'DELETE',
                body:data
            })
        }),
    })
});
export const { 
    useGetLastMessageChatQuery,
    useDeleteMessageMutation,
    useGetMessagesMutation
} = messageApi;

export default messageApi;
