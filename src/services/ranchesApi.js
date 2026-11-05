import { api } from './api';

export const ranchesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRanches: builder.query({
            query: () => 'c/0e5e-666c-4f50-92da',
        }),
    }),
});

export const {
    useGetRanchesQuery
} = ranchesApi;