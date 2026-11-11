import ButtonComponent from '../../../shared/components/ButtonComponent/ButtonComponent';
import FilterIcon from '../../../shared/components/icons/FilterIcon';
import './FilterDropdownComponent.css';
import {useDropdown} from "../../hooks/useDropdown";

export default function FilterDropdownComponent({
                                                    countries,
                                                    draftFilters,
                                                    setDraftFilter,
                                                    onApply,
                                                    onReset,
                                                }) {
    const {
        isOpen,
        toggle,
        close,
        wrapperRef,
    } = useDropdown();

    const handleApply = () => {
        onApply();
        close();
    };

    const handleReset = () => {
        onReset();
        close();
    };

    return (
        <div className="filter-dropdown" ref={wrapperRef}>
            <ButtonComponent
                variant="outline-gray"
                className="filter-dropdown__toggle"
                onClick={toggle}
                aria-expanded={isOpen}
            >
                Filter
                <FilterIcon />
            </ButtonComponent>

            {isOpen && (
                <div className="filter-dropdown__menu">
                    <div className="filter-dropdown__group">
                        <label className="filter-dropdown__label">
                            Country
                        </label>
                        <select
                            className="filter-dropdown__select"
                            value={draftFilters.country}
                            onChange={(e) =>
                                setDraftFilter('country', e.target.value)
                            }
                        >
                            <option value="">All countries</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-dropdown__group">
                        <label className="filter-dropdown__label">
                            Price
                        </label>
                        <div className="filter-dropdown__range">
                            <input
                                type="number"
                                className="filter-dropdown__input"
                                placeholder="Min"
                                value={draftFilters.minPrice}
                                onChange={(e) =>
                                    setDraftFilter('minPrice', e.target.value)
                                }
                            />
                            <span>—</span>
                            <input
                                type="number"
                                className="filter-dropdown__input"
                                placeholder="Max"
                                value={draftFilters.maxPrice}
                                onChange={(e) =>
                                    setDraftFilter('maxPrice', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="filter-dropdown__group">
                        <label className="filter-dropdown__label">
                            Size (sqm)
                        </label>
                        <div className="filter-dropdown__range">
                            <input
                                type="number"
                                className="filter-dropdown__input"
                                placeholder="Min"
                                value={draftFilters.minSize}
                                onChange={(e) =>
                                    setDraftFilter('minSize', e.target.value)
                                }
                            />
                            <span>—</span>
                            <input
                                type="number"
                                className="filter-dropdown__input"
                                placeholder="Max"
                                value={draftFilters.maxSize}
                                onChange={(e) =>
                                    setDraftFilter('maxSize', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="filter-dropdown__actions">
                        <ButtonComponent
                            variant="primary"
                            onClick={handleApply}
                            className="filter-dropdown__apply"
                        >
                            Show
                        </ButtonComponent>
                        <ButtonComponent
                            variant="outline-gray"
                            onClick={handleReset}
                            className="filter-dropdown__reset"
                        >
                            Reset
                        </ButtonComponent>
                    </div>
                </div>
            )}
        </div>
    );
}