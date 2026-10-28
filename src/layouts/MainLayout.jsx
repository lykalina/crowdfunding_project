import './MainLayout.css'
import {Outlet, NavLink} from 'react-router-dom';
import CartIcon from "../components/icons/CartIcon";
import ArrowIcon from "../components/icons/ArrowIcon";

export default function MainLayout() {
    return (
        <div className="mainLayout">
            <header className="header">
                <nav className="nav">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/plots"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        My plots
                    </NavLink>

                    <NavLink
                        to="/contracts"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Contracts
                    </NavLink>

                    <NavLink
                        to="/shop"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Shop
                    </NavLink>

                    <NavLink
                        to="/wallet"
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Wallet
                    </NavLink>
                </nav>
                <div className="cart">
                    <CartIcon />
                </div>
                <div className="user">
                    <span className="avatar" aria-hidden="true">
                        U
                    </span>
                    <ArrowIcon />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}