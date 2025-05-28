// @ts-nocheck
import getBaseUrl from "../features/getBaseUrl.ts";
import authSlice from './reduxSlice/authSlice.ts';
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
        baseUrl: `${getBaseUrl()}`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          }
});

let isRefreshing = false;
let refreshPromise = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = baseQuery('/refresh', api, extraOptions).then((refreshResult) => {
                isRefreshing = false;
                return refreshResult.data.accessToken;
            });
        }
        const newToken = await refreshPromise;
        
        if (newToken) {
            api.dispatch(authSlice.actions.setToken(newToken));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(authSlice.actions.logout());
        }
    }

    return result;
};

export default baseQueryWithReauth;