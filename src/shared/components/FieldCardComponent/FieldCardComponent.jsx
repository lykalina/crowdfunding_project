import './FieldCardComponent.css';
import ButtonComponent from '../../../shared/components/ButtonComponent/ButtonComponent';

export default function FieldCardComponent({
                                               field,
                                               isActive,
                                               isMapOpen,
                                               investQuantity,
                                               reserved,
                                               onSelect,
                                               onAddInvest,
                                               onIncrementInvest,
                                               onDecrementInvest,
                                               onAddReserve,
                                               onRemoveReserve,
                                           }) {
    const inCart = investQuantity > 0 || reserved;

    const className = [
        'field-card',
        isMapOpen && isActive ? 'field-card--active' : '',
        inCart ? 'field-card--in-cart' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const handleStop = (callback) => (e) => {
        e.stopPropagation();
        callback();
    };

    return (
        <li className={className} onClick={onSelect}>
            <div className="field-card__wrapper">
                <img
                    src={field.image}
                    alt={field.name}
                    className="field-card__img"
                    loading="lazy"
                />
                <div className="field-card__content">
                    <h3>{field.name}</h3>
                    <p>{field.country}</p>
                    <p>Size: {field.sizeSqm}</p>
                    <p>Guide Price: ${field.guidePrice}</p>
                    <div className="field-card__controls">
                        {investQuantity > 0 ? (
                            <div className="field-card__counter">
                                <ButtonComponent
                                    variant="ghost"
                                    className="field-card__counter-btn"
                                    onClick={handleStop(onDecrementInvest)}
                                    aria-label="Decrease investment"
                                >
                                    −
                                </ButtonComponent>
                                <span className="field-card__counter-value">
                                    {investQuantity}
                                </span>
                                <ButtonComponent
                                    variant="ghost"
                                    className="field-card__counter-btn"
                                    onClick={handleStop(onIncrementInvest)}
                                    aria-label="Increase investment"
                                >
                                    +
                                </ButtonComponent>
                            </div>
                        ) : (
                            <ButtonComponent
                                variant="outline"
                                className="field-card__invest"
                                onClick={handleStop(onAddInvest)}
                            >
                                Invest
                            </ButtonComponent>
                        )}

                        <ButtonComponent
                            variant={reserved ? 'active' : 'outline'}
                            className="field-card__reserve"
                            onClick={handleStop(
                                reserved ? onRemoveReserve : onAddReserve
                            )}
                        >
                            {reserved ? 'Reserved' : 'Reserve'}
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </li>
    );
}