import { api } from './api';

export const ranchesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRanches: builder.query({
            query: () => 'c/9f32-57bb-46c3-90f3',
        }),
    }),
});

export const {
    useGetRanchesQuery
} = ranchesApi;