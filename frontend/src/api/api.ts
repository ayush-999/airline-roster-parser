import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadRoster: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("roster", file);
        return {
          url: "/roster/upload",
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        };
      },
    }),
    getEvents: builder.query({
      query: ({ startDate, endDate }) => ({
        url: "/events",
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }),
    }),
    getFlightsNextWeek: builder.query({
      query: () => "/flights/next-week",
    }),
    getFlightsFromLocation: builder.query({
      query: (location) => `/flights/from/${location}`,
    }),
    getStandbyNextWeek: builder.query({
      query: () => "/standby/next-week",
    }),
  }),
});

export const {
  useUploadRosterMutation,
  useGetEventsQuery,
  useGetFlightsNextWeekQuery,
  useGetFlightsFromLocationQuery,
  useGetStandbyNextWeekQuery,
} = api;
