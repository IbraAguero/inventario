import { apiSlice } from './apiSlice';

export const optionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: (url) => url,
      providesTags: (result, error, url) => ['Options', url],
    }),
    getOption: builder.query({
      query: (url) => url,
      providesTags: (result, error, url) => ['Options', url],
    }),
    addOption: builder.mutation({
      query: ({ url, data }) => ({
        url: url,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { url }) => ['Options', url],
    }),
    editOption: builder.mutation({
      query: ({ url, id, data }) => ({
        url: `${url}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { url }) => ['Options', url],
    }),
    deleteOption: builder.mutation({
      query: ({ url, id }) => ({
        url: `${url}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { url }) => ['Options', url],
    }),
  }),
});

export const {
  useGetOptionsQuery,
  useGetOptionQuery,
  useLazyGetOptionQuery,
  useAddOptionMutation,
  useDeleteOptionMutation,
  useEditOptionMutation,
} = optionsApiSlice;
