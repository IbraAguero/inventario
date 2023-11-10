import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const monitorsAdapter = createEntityAdapter({});

const initialState = monitorsAdapter.getInitialState();

export const monitorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMonitors: builder.query({
      query: () => "/monitores",
      transformResponse: (responseData) => {
        const loadedMonitors = responseData.map((monitor) => {
          monitor.id = monitor._id;
          return monitor;
        });
        return monitorsAdapter.setAll(initialState, loadedMonitors);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Monitor", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Monitor", id })),
          ];
        } else return [{ type: "Monitor", id: "LIST" }];
      },
    }),
    createMonitor: builder.mutation({
      query: (newMonitor) => ({
        url: "/monitores",
        method: "POST",
        body: newMonitor,
      }),
      invalidatesTags: [{ type: "Monitor", id: "LIST" }],
    }),
    updateMonitor: builder.mutation({
      query: (updateMonitor) => ({
        url: `/monitores/${updateMonitor.id}`,
        method: "PUT",
        body: updateMonitor,
      }),
      invalidatesTags: [{ type: "Monitor", id: "LIST" }],
    }),
    deleteMonitor: builder.mutation({
      query: (monitorId) => ({
        url: `/monitores/${monitorId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Monitor", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMonitorsQuery,
  useCreateMonitorMutation,
  useUpdateMonitorMutation,
  useDeleteMonitorMutation,
  useGetMakersOptionsQuery,
} = monitorsApiSlice;

export const selectMonitorsResult =
  monitorsApiSlice.endpoints.getMonitors.select();

const selectMonitorsData = createSelector(
  selectMonitorsResult,
  (monitorsResult) => monitorsResult.data
);

export const {
  selectAll: selectAllMonitors,
  selectById: selectMonitorById,
  selectIds: selectMonitorIds,
} = monitorsAdapter.getSelectors(
  (state) => selectMonitorsData(state) ?? initialState
);
