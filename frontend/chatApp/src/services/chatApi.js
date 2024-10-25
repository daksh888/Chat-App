import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),

  // Register
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/users/',
        method: 'POST',
        body: userData,  
      }),
    }),
    
    // Login
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/jwt/create/',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useRegisterUserMutation, useLoginUserMutation } = chatApi;
