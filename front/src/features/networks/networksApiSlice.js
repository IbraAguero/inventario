import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const networksAdapter = createEntityAdapter({});

const initialState = networksAdapter.getInitialState();

export const networksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNetworks: builder.query({
      query: () => "/redes",
      transformResponse: (responseData) => {
        const loadedNetworks = responseData.map((network) => {
          network.id = network._id;
          return network;
        });
        return networksAdapter.setAll(initialState, loadedNetworks);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Network", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Network", id })),
          ];
        } else return [{ type: "Network", id: "LIST" }];
      },
    }),
    createNetwork: builder.mutation({
      query: (newNetwork) => ({
        url: "/redes",
        method: "POST",
        body: newNetwork,
      }),
      invalidatesTags: [{ type: "Network", id: "LIST" }],
    }),
    updateNetwork: builder.mutation({
      query: (updateNetwork) => ({
        url: `/redes/${updateNetwork.id}`,
        method: "PUT",
        body: updateNetwork,
      }),
      invalidatesTags: [{ type: "Network", id: "LIST" }],
    }),
    deleteNetwork: builder.mutation({
      query: (networkId) => ({
        url: `/redes/${networkId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Network", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNetworksQuery,
  useCreateNetworkMutation,
  useUpdateNetworkMutation,
  useDeleteNetworkMutation,
  useGetMakersOptionsQuery,
} = networksApiSlice;

export const selectNetworksResult =
  networksApiSlice.endpoints.getNetworks.select();

const selectNetworksData = createSelector(
  selectNetworksResult,
  (networksResult) => networksResult.data
);

export const {
  selectAll: selectAllNetworks,
  selectById: selectNetworkById,
  selectIds: selectNetworkIds,
} = networksAdapter.getSelectors(
  (state) => selectNetworksData(state) ?? initialState
);
