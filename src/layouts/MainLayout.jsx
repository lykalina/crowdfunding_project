import './MainLayout.css';
import { Outlet, NavLink } from 'react-router-dom';
import CartIcon from '../shared/components/icons/CartIcon';
import ArrowIcon from '../shared/components/icons/ArrowIcon';
import { useCartState } from '../shared/hooks/useCartState';
import { useCurrentUser } from '../shared/hooks/useCurrentUser';
import { useDropdown } from '../shared/hooks/useDropdown';
import { useMenuState } from '../shared/hooks/useMenuState';
import { useHeaderClass } from '../shared/hooks/useHeaderClass';

export default function MainLayout() {
    const {
        invest,
        reserve,
        removeInvest,
        removeReserve,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
    } = useCartState();

    const { user } = useCurrentUser();

    const {
        isOpen: isCartOpen,
        toggle: toggleCart,
        wrapperRef: cartWrapperRef,
    } = useDropdown();

    const {
        isOpen: isUserOpen,
        toggle: toggleUser,
        wrapperRef: userWrapperRef,
    } = useDropdown();

    const { isMenuOpen, toggleMenu, closeMenu } = useMenuState();

    const headerClass = useHeaderClass();

    return (
        <div className="mainLayout">
            <header className={headerClass}>
                <button
                    type="button"
                    className="burger"
                    onClick={toggleMenu}
                    aria-label="Menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="burger__line" />
                    <span className="burger__line" />
                    <span className="burger__line" />
                </button>

                <nav className={isMenuOpen ? 'nav nav--open' : 'nav'}>
                    <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/plots"
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        My plots
                    </NavLink>

                    <NavLink
                        to="/contracts"
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Contracts
                    </NavLink>

                    <NavLink
                        to="/shop"
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Shop
                    </NavLink>

                    <NavLink
                        to="/wallet"
                        onClick={closeMenu}
                        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                        Wallet
                    </NavLink>
                </nav>

                <div className="cart-wrapper" ref={cartWrapperRef}>
                    <button
                        type="button"
                        className="cart"
                        onClick={toggleCart}
                        aria-label="Cart"
                        aria-expanded={isCartOpen}
                    >
                        <CartIcon />
                        {totalCount > 0 && (
                            <span className="cart__badge">{totalCount}</span>
                        )}
                    </button>

                    {isCartOpen && (
                        <div className="cart-dropdown">
                            <div className="cart-dropdown__group">
                                <h4 className="cart-dropdown__title">
                                    Invest ({invest.length})
                                </h4>
                                {invest.length === 0 ? (
                                    <p className="cart-dropdown__empty">No items</p>
                                ) : (
                                    <ul className="cart-dropdown__list">
                                        {invest.map((field) => (
                                            <li key={field.id} className="cart-dropdown__item">
                                                <div>
                                                    <p className="cart-dropdown__name">{field.name}</p>
                                                    <p className="cart-dropdown__meta">
                                                        {field.country} · ${field.guidePrice} × {field.quantity}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="cart-dropdown__remove"
                                                    onClick={() => removeInvest(field.id)}
                                                    aria-label="Remove"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="cart-dropdown__subtotal">
                                    Subtotal: ${investTotal}
                                </p>
                            </div>

                            <div className="cart-dropdown__group">
                                <h4 className="cart-dropdown__title">
                                    Reserve ({reserve.length})
                                </h4>
                                {reserve.length === 0 ? (
                                    <p className="cart-dropdown__empty">No items</p>
                                ) : (
                                    <ul className="cart-dropdown__list">
                                        {reserve.map((field) => (
                                            <li key={field.id} className="cart-dropdown__item">
                                                <div>
                                                    <p className="cart-dropdown__name">{field.name}</p>
                                                    <p className="cart-dropdown__meta">
                                                        {field.country} · ${field.guidePrice}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="cart-dropdown__remove"
                                                    onClick={() => removeReserve(field.id)}
                                                    aria-label="Remove"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="cart-dropdown__subtotal">
                                    Subtotal: ${reserveTotal}
                                </p>
                            </div>

                            <div className="cart-dropdown__total">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="user-wrapper" ref={userWrapperRef}>
                    <button
                        type="button"
                        className="user"
                        onClick={toggleUser}
                        aria-label="User menu"
                        aria-expanded={isUserOpen}
                    >
                        <span className="avatar" aria-hidden="true">
                            {user?.image ? (
                                <img src={user.image} alt="" className="avatar__image" />
                            ) : (
                                user?.firstName?.[0]?.toUpperCase() ?? 'U'
                            )}
                        </span>
                        <ArrowIcon
                            className={
                                isUserOpen
                                    ? 'user__arrow user__arrow--open'
                                    : 'user__arrow'
                            }
                        />
                    </button>

                    {isUserOpen && user && (
                        <div className="user-dropdown">
                            <p className="user-dropdown__name">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="user-dropdown__status">Online</p>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}