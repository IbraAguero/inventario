import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const peripheralsAdapter = createEntityAdapter({});

const initialState = peripheralsAdapter.getInitialState();

export const peripheralsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPeripherals: builder.query({
      query: () => "/perifericos",
      transformResponse: (responseData) => {
        const loadedPeripherals = responseData.map((peripheral) => {
          peripheral.id = peripheral._id;
          return peripheral;
        });
        return peripheralsAdapter.setAll(initialState, loadedPeripherals);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Peripheral", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Peripheral", id })),
          ];
        } else return [{ type: "Peripheral", id: "LIST" }];
      },
    }),
    createPeripheral: builder.mutation({
      query: (newPeripheral) => ({
        url: "/perifericos",
        method: "POST",
        body: newPeripheral,
      }),
      invalidatesTags: [{ type: "Peripheral", id: "LIST" }],
    }),
    updatePeripheral: builder.mutation({
      query: (updatePeripheral) => ({
        url: `/perifericos/${updatePeripheral.id}`,
        method: "PUT",
        body: updatePeripheral,
      }),
      invalidatesTags: [{ type: "Peripheral", id: "LIST" }],
    }),
    deletePeripheral: builder.mutation({
      query: (peripheralId) => ({
        url: `/perifericos/${peripheralId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Peripheral", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPeripheralsQuery,
  useCreatePeripheralMutation,
  useUpdatePeripheralMutation,
  useDeletePeripheralMutation,
  useGetMakersOptionsQuery,
} = peripheralsApiSlice;

export const selectPeripheralsResult =
  peripheralsApiSlice.endpoints.getPeripherals.select();

const selectPeripheralsData = createSelector(
  selectPeripheralsResult,
  (peripheralsResult) => peripheralsResult.data
);

export const {
  selectAll: selectAllPeripherals,
  selectById: selectPeripheralById,
  selectIds: selectPeripheralIds,
} = peripheralsAdapter.getSelectors(
  (state) => selectPeripheralsData(state) ?? initialState
);
