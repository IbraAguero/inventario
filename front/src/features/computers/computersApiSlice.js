import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const computersAdapter = createEntityAdapter({});

const initialState = computersAdapter.getInitialState();

export const computersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComputers: builder.query({
      query: () => "/computadoras",
      transformResponse: (responseData) => {
        const loadedComputers = responseData.map((computer) => {
          computer.id = computer._id;
          return computer;
        });
        return computersAdapter.setAll(initialState, loadedComputers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Computer", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Computer", id })),
          ];
        } else return [{ type: "Computer", id: "LIST" }];
      },
    }),
    createComputer: builder.mutation({
      query: (newComputer) => ({
        url: "/computadoras",
        method: "POST",
        body: newComputer,
      }),
      invalidatesTags: [{ type: "Computer", id: "LIST" }],
    }),
    updateComputer: builder.mutation({
      query: (updateComputer) => ({
        url: `/computadoras/${updateComputer.id}`,
        method: "PUT",
        body: updateComputer,
      }),
      invalidatesTags: [{ type: "Computer", id: "LIST" }],
    }),
    deleteComputer: builder.mutation({
      query: (computerId) => ({
        url: `/computadoras/${computerId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Computer", id: "LIST" }],
    }),
  }),
});

export const {
  useGetComputersQuery,
  useCreateComputerMutation,
  useUpdateComputerMutation,
  useDeleteComputerMutation,
  useGetMakersOptionsQuery,
} = computersApiSlice;

export const selectComputersResult =
  computersApiSlice.endpoints.getComputers.select();

const selectComputersData = createSelector(
  selectComputersResult,
  (computersResult) => computersResult.data
);

export const {
  selectAll: selectAllComputers,
  selectById: selectComputerById,
  selectIds: selectComputerIds,
} = computersAdapter.getSelectors(
  (state) => selectComputersData(state) ?? initialState
);
