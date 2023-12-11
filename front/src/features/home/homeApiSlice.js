import { apiSlice } from "../../app/api/apiSlice";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalDevices: builder.query({
      query: () => "/estadisticas/dispositivos",
      providesTags: ["Dispositivos"],
    }),
    getDevicesByPlace: builder.query({
      query: () => "/estadisticas/dispositivos/lugares",
      providesTags: ["Dispositivos"],
    }),
    getDevicesByState: builder.query({
      query: () => "/estadisticas/dispositivos/estados",
      providesTags: ["Dispositivos"],
    }),
    getLatestAggregations: builder.query({
      query: () => "/estadisticas/agregaciones",
      providesTags: ["Dispositivos"],
    }),
  }),
});

export const {
  useGetTotalDevicesQuery,
  useGetDevicesByPlaceQuery,
  useGetDevicesByStateQuery,
  useGetLatestAggregationsQuery,
} = homeApiSlice;
