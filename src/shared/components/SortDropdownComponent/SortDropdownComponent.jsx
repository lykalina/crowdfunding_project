import { useDropdown } from '../../hooks/useDropdown';
import ArrowIcon from '../../../shared/components/icons/ArrowIcon';
import './SortDropdownComponent.css';

export default function SortDropdownComponent({
                                                  allRanches,
                                                  ranchId,
                                                  sortLabel,
                                                  onSelectRanch,
                                              }) {
    const {
        isOpen,
        toggle,
        close,
        wrapperRef,
    } = useDropdown();

    const handleSelect = (id) => {
        onSelectRanch(id);
        close();
    };

    return (
        <div className="sort-dropdown" ref={wrapperRef}>
            <button
                type="button"
                className="sort-dropdown__toggle"
                onClick={toggle}
                aria-expanded={isOpen}
            >
                <p>
                    Sort by <span>{sortLabel}</span>
                </p>
                <ArrowIcon
                    className={
                        isOpen
                            ? 'sort-dropdown__arrow sort-dropdown__arrow--open'
                            : 'sort-dropdown__arrow'
                    }
                />
            </button>

            {isOpen && (
                <div className="sort-dropdown__menu">
                    <button
                        type="button"
                        className={
                            !ranchId
                                ? 'sort-dropdown__item sort-dropdown__item--active'
                                : 'sort-dropdown__item'
                        }
                        onClick={() => handleSelect(null)}
                    >
                        <span>All</span>
                        <small>All ranches</small>
                    </button>

                    {allRanches.map((r) => (
                        <button
                            key={r.id}
                            type="button"
                            className={
                                Number(ranchId) === r.id
                                    ? 'sort-dropdown__item sort-dropdown__item--active'
                                    : 'sort-dropdown__item'
                            }
                            onClick={() => handleSelect(r.id)}
                        >
                            <span>{r.name}</span>
                            <small>{r.country}</small>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}