import { useShopPageViewModel } from './useShopPageViewModel';
import './ShopPage.css';

export default function ShopPage() {
    const { ranch, fields, isLoading, isError, ranchId } = useShopPageViewModel();

    return (
        <div className="shop-page">
            <div className="shop-page__invest">
                <p className="shop-page__invest-text">Invest</p>
            </div>
            <ul className="shop-page__list">
                {fields.map((field) => (
                    <li key={field.id} className="shop-page__item">
                        <div className="shop-page__item-wrapper">
                            <img
                                src={field.image}
                                alt={field.name}
                                className="shop-page__item-img"
                                loading="lazy"
                            />
                            <div className="shop-page__item-content">
                                <h3>{field.name}</h3>
                                <p>{field.country}</p>
                                <p>Size: {field.sizeSqm}</p>
                                <p>Guide Price: ${field.guidePrice}</p>
                                <div className="shop-page__item-controls">
                                    <button
                                        className="shop-page__item-controls-invest"
                                    >
                                        Invest
                                    </button>
                                    <button
                                        className="shop-page__item-controls-reserve"
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}