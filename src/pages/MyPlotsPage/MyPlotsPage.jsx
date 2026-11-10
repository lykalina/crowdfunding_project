import './MyPlotsPage.css';
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';
import { Link } from 'react-router-dom';
import SearchIcon from '../../components/icons/SeachIcon';
import useMyPlotsPageModel from './useMyPlotsPageModel';

export default function MyPlotsPage() {
    const {
        mapRef,
        searchWrapperRef,
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        searchError,
        isDropdownOpen,
        setIsDropdownOpen,
        handleSearch,
        selectLocation,
        clearSearch,
        ranches,
        activeRanchId,
        handleMapLoad,
        selectRanchFromList,
    } = useMyPlotsPageModel();

    return (
        <YMaps
            query={{
                apikey: process.env.YANDEX_MAPS_API_KEY,
                lang: 'en_US',
            }}
        >
            <div className="plots-page__content">
                <h2 className="plots-page__title">Locations</h2>

                <div className="plots-page__search">
                    <div
                        className="plots-page__search-wrapper"
                        ref={searchWrapperRef}
                    >
                        <div className="plots-page__input">
                            <SearchIcon />

                            <input
                                type="text"
                                placeholder="Search by city, country, village places"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsDropdownOpen(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                onFocus={() => {
                                    if (searchResults.length > 0) {
                                        setIsDropdownOpen(true);
                                    }
                                }}
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    className="plots-page__clear"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {isDropdownOpen && (
                            <div className="plots-page__dropdown">
                                {searchResults.map((result) => (
                                    <button
                                        type="button"
                                        className="plots-page__dropdown-item"
                                        key={result.id}
                                        onClick={() => selectLocation(result)}
                                    >
                                        <span>{result.name}</span>
                                        <small>{result.description}</small>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="plots-page__button plots-page__button--small"
                        onClick={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {searchError && (
                    <p>{searchError}</p>
                )}

                <div className="plots-page__map-block">
                    <div className="plots-page__map-results">
                        {ranches.length === 0 ? (
                            <p className="plots-page__map-empty">
                                0 results
                            </p>
                        ) : (
                            <ul className="plots-page__results-list">
                                {ranches.map((ranch) => (
                                    <li
                                        className={
                                            ranch.id === activeRanchId
                                                ? 'plots-page__results-item plots-page__results-item--active'
                                                : 'plots-page__results-item'
                                        }
                                        key={ranch.id}
                                        onClick={() => selectRanchFromList(ranch)}
                                    >
                                        <img
                                            className="plots-page__results-image"
                                            src={ranch.image}
                                            alt={ranch.name}
                                            loading="lazy"
                                        />

                                        <div className="plots-page__results-info">
                                            <div>
                                                <p className="plots-page__results-name">
                                                    {ranch.name}
                                                </p>

                                                <p className="plots-page__results-country">
                                                    {ranch.country}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/shop?ranchId=${ranch.id}`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    className="plots-page__results-button"
                                                >
                                                    Shop
                                                </button>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="plots-page__map">
                        <Map
                            instanceRef={(map) => {
                                mapRef.current = map;
                            }}
                            onLoad={handleMapLoad}
                            defaultState={{
                                center: [47.5, 19.0],
                                zoom: 12,
                            }}
                            width="100%"
                            height="100%"
                        >
                            {ranches.map((ranch) => (
                                <Placemark
                                    key={ranch.id}
                                    geometry={[ranch.coordinates.lat, ranch.coordinates.lng]}
                                    properties={{
                                        iconCaption: ranch.name,
                                    }}
                                    options={{
                                        preset:
                                            ranch.id === activeRanchId
                                                ? 'islands#redIcon'
                                                : 'islands#greenIcon',
                                    }}
                                />
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        </YMaps>
    );
}