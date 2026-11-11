import './SearchFieldComponent.css';
import SearchIcon from '../../../shared/components/icons/SeachIcon';
import CloseIcon from '../../../shared/components/icons/CloseIcon';
import ButtonComponent from '../../../shared/components/ButtonComponent/ButtonComponent';
import {useLocationSearch} from "../../hooks/useLocationSearch";

export default function SearchFieldComponent({ onLocationSelect }) {
    const {
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
    } = useLocationSearch({ onLocationSelect });

    return (
        <div className="search-field">
            <div className="search-field__row">
                <div
                    className="search-field__wrapper"
                    ref={searchWrapperRef}
                >
                    <div className="search-field__input">
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
                                className="search-field__clear"
                                onClick={clearSearch}
                                aria-label="Clear search"
                            >
                                <CloseIcon size={18} />
                            </button>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <div className="search-field__dropdown">
                            {searchResults.map((result) => (
                                <button
                                    type="button"
                                    className="search-field__dropdown-item"
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

                <ButtonComponent
                    variant="primary"
                    size="small"
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="search-field__button"
                >
                    {isSearching ? 'Searching...' : 'Search'}
                </ButtonComponent>
            </div>

            {searchError && (
                <p className="search-field__error">{searchError}</p>
            )}
        </div>
    );
}