import { useShopPageViewModel } from './useShopPageViewModel';
import './ShopPage.css';
import ArrowIcon from '../../components/icons/ArrowIcon';
import FilterIcon from '../../components/icons/FilterIcon';
import MapIcon from '../../components/icons/MapIcon';
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';

export default function ShopPage() {
    const {
        fields,
        ranchId,
        allRanches,
        countries,
        sortFilter,
        isSortOpen,
        toggleSort,
        selectRanch,
        sortWrapperRef,
        isFilterOpen,
        toggleFilter,
        filterWrapperRef,
        draftFilters,
        setDraftFilter,
        applyFilters,
        resetFilters,
        isMapOpen,
        toggleMap,
    } = useShopPageViewModel();

    return (
        <div className="shop-page">
            <div className="shop-page__invest">
                <p className="shop-page__invest-text">Invest</p>
            </div>

            <div className="shop-page__filters">
                <div className="shop-page__filters-controls">
                    <div
                        className="shop-page__filters-sort-wrapper"
                        ref={sortWrapperRef}
                    >
                        <button
                            type="button"
                            className="shop-page__filters-sort"
                            onClick={toggleSort}
                            aria-expanded={isSortOpen}
                        >
                            <p>
                                Sort by <span>{sortFilter}</span>
                            </p>
                            <ArrowIcon
                                className={
                                    isSortOpen
                                        ? 'shop-page__filters-arrow shop-page__filters-arrow--open'
                                        : 'shop-page__filters-arrow'
                                }
                            />
                        </button>

                        {isSortOpen && (
                            <div className="shop-page__dropdown">
                                <button
                                    type="button"
                                    className={
                                        !ranchId
                                            ? 'shop-page__dropdown-item shop-page__dropdown-item--active'
                                            : 'shop-page__dropdown-item'
                                    }
                                    onClick={() => selectRanch(null)}
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
                                                ? 'shop-page__dropdown-item shop-page__dropdown-item--active'
                                                : 'shop-page__dropdown-item'
                                        }
                                        onClick={() => selectRanch(r.id)}
                                    >
                                        <span>{r.name}</span>
                                        <small>{r.country}</small>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className="shop-page__filters-filter-wrapper"
                        ref={filterWrapperRef}
                    >
                        <button
                            type="button"
                            className="shop-page__filters-filter"
                            onClick={toggleFilter}
                            aria-expanded={isFilterOpen}
                        >
                            Filter
                            <FilterIcon />
                        </button>

                        {isFilterOpen && (
                            <div className="shop-page__filter-dropdown">
                                <div className="shop-page__filter-group">
                                    <label className="shop-page__filter-label">
                                        Country
                                    </label>
                                    <select
                                        className="shop-page__filter-select"
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

                                <div className="shop-page__filter-group">
                                    <label className="shop-page__filter-label">
                                        Price
                                    </label>
                                    <div className="shop-page__filter-range">
                                        <input
                                            type="number"
                                            className="shop-page__filter-input"
                                            placeholder="Min"
                                            value={draftFilters.minPrice}
                                            onChange={(e) =>
                                                setDraftFilter('minPrice', e.target.value)
                                            }
                                        />
                                        <span>—</span>
                                        <input
                                            type="number"
                                            className="shop-page__filter-input"
                                            placeholder="Max"
                                            value={draftFilters.maxPrice}
                                            onChange={(e) =>
                                                setDraftFilter('maxPrice', e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="shop-page__filter-group">
                                    <label className="shop-page__filter-label">
                                        Size (sqm)
                                    </label>
                                    <div className="shop-page__filter-range">
                                        <input
                                            type="number"
                                            className="shop-page__filter-input"
                                            placeholder="Min"
                                            value={draftFilters.minSize}
                                            onChange={(e) =>
                                                setDraftFilter('minSize', e.target.value)
                                            }
                                        />
                                        <span>—</span>
                                        <input
                                            type="number"
                                            className="shop-page__filter-input"
                                            placeholder="Max"
                                            value={draftFilters.maxSize}
                                            onChange={(e) =>
                                                setDraftFilter('maxSize', e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="shop-page__filter-actions">
                                    <button
                                        type="button"
                                        className="shop-page__filter-apply"
                                        onClick={applyFilters}
                                    >
                                        Show
                                    </button>
                                    <button
                                        type="button"
                                        className="shop-page__filter-reset"
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="shop-page__filters-map"
                        onClick={toggleMap}
                        aria-expanded={isMapOpen}
                    >
                        <MapIcon />
                        Map
                    </button>
                </div>
            </div>

            <div
                className={
                    isMapOpen
                        ? 'shop-page__content shop-page__content--with-map'
                        : 'shop-page__content'
                }
            >
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
                                        <button className="shop-page__item-controls-invest">
                                            Invest
                                        </button>
                                        <button className="shop-page__item-controls-reserve">
                                            Reserve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {isMapOpen && (
                    <div className="shop-page__map">
                        <YMaps
                            query={{
                                apikey: process.env.YANDEX_MAPS_API_KEY,
                                lang: 'en_US',
                            }}
                        >
                            <Map
                                key={fields.map((f) => f.id).join('-')}
                                defaultState={{ center: [48.5, 10.0], zoom: 3 }}
                                modules={['util.bounds']}
                                width="100%"
                                height="100%"
                            >
                                {fields.map((field) => (
                                    <Placemark
                                        key={field.id}
                                        geometry={[
                                            field.coordinates.lat,
                                            field.coordinates.lng,
                                        ]}
                                        properties={{
                                            iconCaption: field.name,
                                        }}
                                    />
                                ))}
                            </Map>
                        </YMaps>
                    </div>
                )}
            </div>
        </div>
    );
}