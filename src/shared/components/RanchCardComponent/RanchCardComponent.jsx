import './RanchCardComponent.css';
import ButtonLinkComponent from '../../../shared/components/ButtonLinkComponent/ButtonLinkComponent';

export default function RanchCardComponent({ ranch, isActive, onSelect }) {
    return (
        <li
            className={
                isActive
                    ? 'ranch-card ranch-card--active'
                    : 'ranch-card'
            }
            onClick={onSelect}
        >
            <img
                className="ranch-card__image"
                src={ranch.image}
                alt={ranch.name}
                loading="lazy"
            />

            <div className="ranch-card__info">
                <div>
                    <p className="ranch-card__name">{ranch.name}</p>
                    <p className="ranch-card__country">{ranch.country}</p>
                </div>
                <ButtonLinkComponent
                    to={`/shop?ranchId=${ranch.id}`}
                    variant="outline"
                    className="ranch-card__button"
                    onClick={(e) => e.stopPropagation()}
                >
                    Shop
                </ButtonLinkComponent>
            </div>
        </li>
    );
}