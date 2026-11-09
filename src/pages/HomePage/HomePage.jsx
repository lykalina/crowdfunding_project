import './HomePage.css';
import img1 from '../../assets/images/1.webp';
import img2 from '../../assets/images/2.webp';
import img3 from '../../assets/images/3.webp';
import SearchIcon from '../../components/icons/SeachIcon';
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';
import { useHomePageViewModel } from './useHomePageViewModel';
import { Link } from "react-router-dom";

export default function HomePage() {
    const {
        scrollToLocations,
        mapRef,
        ymapsRef,
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
        ranches,
        handleBoundsChange,
        handleMapLoad,
    } = useHomePageViewModel();

    return (
        <div className="home-page">
            <div className="home-page__content home-page__hero">
                <h2 className="home-page__title">
                    Rent your own field, invest in farming, and grow your own vegetables
                </h2>

                <button
                    className="home-page__button"
                    onClick={scrollToLocations}
                >
                    Let's start
                </button>

                <div className="home-page__cards">
                    <div className="home-page__card">
                        <img
                            src={img1}
                            alt="img1"
                            className="home-page__card-image"
                            loading="lazy"
                        />

                        <p className="home-page__card-info">
                            Rent your own piece of farmland and watch your vegetables grow.
                        </p>
                    </div>

                    <div className="home-page__card">
                        <img
                            src={img2}
                            alt="img2"
                            className="home-page__card-image"
                            loading="lazy"
                        />

                        <p className="home-page__card-info">
                            Enjoy, year after year, the wonders of nature with your rented vegetable farmland (60 sqm / 30 sqm).
                        </p>
                    </div>

                    <div className="home-page__card">
                        <img
                            src={img3}
                            alt="img3"
                            className="home-page__card-image"
                            loading="lazy"
                        />

                        <p className="home-page__card-info">
                            Grow your own piece of land, from planting seeds in the lush soil to harvesting your own vegetables.
                        </p>
                    </div>
                </div>
            </div>

            <YMaps
                query={{
                    apikey: process.env.YANDEX_MAPS_API_KEY,
                    lang: 'en_US',
                }}
            >
                <div
                    className="home-page__content home-page__locations"
                    id="locations"
                >
                    <h2 className="home-page__title">Locations</h2>

                    <div className="home-page__search">
                        <div
                            className="home-page__search-wrapper"
                            ref={searchWrapperRef}
                        >
                            <div className="home-page__input">
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
                            </div>

                            {isDropdownOpen && (
                                <div className="home-page__dropdown">
                                    {searchResults.map((result) => (
                                        <button
                                            type="button"
                                            className="home-page__dropdown-item"
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
                            className="home-page__button home-page__button--small"
                            onClick={handleSearch}
                            disabled={isSearching}
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {searchError && (
                        <p>{searchError}</p>
                    )}

                    <div className="home-page__map-block">
                        <div className="home-page__map-results">
                            {ranches.length === 0 ? (
                                <p className="home-page__map-empty">
                                    0 results
                                </p>
                            ) : (
                                <ul className="home-page__results-list">
                                    {ranches.map((ranch) => (
                                        <li
                                            className="home-page__results-item"
                                            key={ranch.id}
                                        >
                                            <img
                                                className="home-page__results-image"
                                                src={ranch.image}
                                                alt={ranch.name}
                                            />

                                            <div className="home-page__results-info">
                                                <div>
                                                    <p className="home-page__results-name">
                                                        {ranch.name}
                                                    </p>

                                                    <p className="home-page__results-country">
                                                        {ranch.country}
                                                    </p>
                                                </div>
                                                <Link to={`/shop?ranchId=${ranch.id}`}>
                                                    <button
                                                        className="home-page__results-button"
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

                        <div className="home-page__map">
                            <Map
                                instanceRef={(map) => {
                                    mapRef.current = map;
                                }}
                                onLoad={handleMapLoad}
                                onBoundsChange={handleBoundsChange}
                                modules={['util.bounds']}
                                defaultState={{
                                    center: [55.751574, 37.573856],
                                    zoom: 9
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
                                    />
                                ))}
                            </Map>
                        </div>
                    </div>
                </div>
            </YMaps>
        </div>
    );
}