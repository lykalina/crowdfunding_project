import { api } from './api';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => 'c/30be-6876-41ee-8266',
            transformResponse: (response) => ({
                id: response.id,
                firstName: response.firstName,
                lastName: response.lastName,
                image: response.image,
                email: response.email,
            }),
            providesTags: ['User'],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
} = userApi;