import { NavLink } from 'react-router-dom';
import './TabComponent.css';

export default function TabComponent({ to, end = false, children, onClick }) {
    return (
        <NavLink
            to={to}
            end={end}
            onClick={onClick}
            className={({ isActive }) =>
                isActive ? 'tab tab--active' : 'tab'
            }
        >
            {children}
        </NavLink>
    );
}