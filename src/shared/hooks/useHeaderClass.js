import {useLocation} from 'react-router-dom';

export function useHeaderClass() {
    const { pathname } = useLocation();

    return pathname === '/' ? 'header header--hero' :
        pathname.startsWith('/shop') ? 'header header--shop' :
            pathname.startsWith('/plots') ? 'header header--plots' :
                'header';
}