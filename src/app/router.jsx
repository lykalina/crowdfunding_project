import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage/HomePage';
import MyPlotsPage from "../pages/MyPlotsPage/MyPlotsPage";
import ContractsPage from "../pages/ContractsPage/ContractsPage";
import WalletPage from "../pages/WalletPage/WalletPage";
import ShopPage from "../pages/ShopPage/ShopPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/plots" element={<MyPlotsPage />} />
                <Route path="/contracts" element={<ContractsPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/wallet" element={<WalletPage />} />
            </Route>
        </Routes>
    );
}