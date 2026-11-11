import { useGetCurrentUserQuery } from '../../services/userApi';

export function useCurrentUser() {
    const { data: user } = useGetCurrentUserQuery();

    return { user };
}