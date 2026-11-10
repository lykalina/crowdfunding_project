import './ShopPage.css';
import MapIcon from '../../shared/components/icons/MapIcon';
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';
import { useCart } from '../../shared/slices/useCart';
import { useShopData } from '../../shared/hooks/useShopData';
import { useShopFilters } from '../../shared/hooks/useShopFilters';
import { useShopFields } from '../../shared/hooks/useShopFields';
import { useShopPagination } from '../../shared/hooks/useShopPagination';
import { useShopMap } from '../../shared/hooks/useShopMap';
import ButtonComponent from '../../shared/components/ButtonComponent/ButtonComponent';
import SortDropdownComponent from "../../shared/components/SortDropdownComponent/SortDropdownComponent";
import FilterDropdownComponent from "../../shared/components/FilterDropdownComponent/FilterDropdownComponent";
import FieldCardComponent from "../../shared/components/FieldCardComponent/FieldCardComponent";

export default function ShopPage() {
    const { allRanches } = useShopData();

    const {
        ranchId,
        filterCountry,
        filterMinPrice,
        filterMaxPrice,
        filterMinSize,
        filterMaxSize,
        draftFilters,
        setDraftFilter,
        applyFilters,
        resetFilters,
        selectRanch,
    } = useShopFilters();

    const { fields, countries, ranch } = useShopFields({
        allRanches,
        ranchId,
        filterCountry,
        filterMinPrice,
        filterMaxPrice,
        filterMinSize,
        filterMaxSize,
    });

    const resetKey = `${ranchId ?? ''}-${filterCountry}-${filterMinPrice}-${filterMaxPrice}-${filterMinSize}-${filterMaxSize}`;

    const { visibleFields, hasMore, showMore } = useShopPagination({
        fields,
        resetKey,
    });

    const {
        isMapOpen,
        toggleMap,
        activeFieldId,
        selectFieldFromList,
        handleInstanceRef,
    } = useShopMap({ fields });

    const {
        addInvest,
        incrementInvest,
        decrementInvest,
        addReserve,
        removeReserve,
        getInvestQuantity,
        isReserved,
    } = useCart();

    return (
        <div className="shop-page">
            <div className="shop-page__invest">
                <p className="shop-page__invest-text">Invest</p>
            </div>

            <div className="shop-page__filters">
                <div className="shop-page__filters-controls">
                    <SortDropdownComponent
                        allRanches={allRanches}
                        ranchId={ranchId}
                        sortLabel={ranch?.name ?? 'All'}
                        onSelectRanch={selectRanch}
                    />

                    <FilterDropdownComponent
                        countries={countries}
                        draftFilters={draftFilters}
                        setDraftFilter={setDraftFilter}
                        onApply={applyFilters}
                        onReset={resetFilters}
                    />

                    <ButtonComponent
                        variant="primary"
                        size="small"
                        className="shop-page__filters-map"
                        onClick={toggleMap}
                        aria-expanded={isMapOpen}
                    >
                        <MapIcon />
                        Map
                    </ButtonComponent>
                </div>
            </div>

            <div
                className={
                    isMapOpen
                        ? 'shop-page__content shop-page__content--with-map'
                        : 'shop-page__content'
                }
            >
                <div className="shop-page__list-wrapper">
                    <ul className="shop-page__list">
                        {visibleFields.map((field) => (
                            <FieldCardComponent
                                key={field.id}
                                field={field}
                                isActive={field.id === activeFieldId}
                                isMapOpen={isMapOpen}
                                investQuantity={getInvestQuantity(field.id)}
                                reserved={isReserved(field.id)}
                                onSelect={() => selectFieldFromList(field)}
                                onAddInvest={() => addInvest(field)}
                                onIncrementInvest={() => incrementInvest(field.id)}
                                onDecrementInvest={() => decrementInvest(field.id)}
                                onAddReserve={() => addReserve(field)}
                                onRemoveReserve={() => removeReserve(field.id)}
                            />
                        ))}
                    </ul>

                    {hasMore && (
                        <div className="shop-page__show-more-wrapper">
                            <ButtonComponent
                                variant="outline"
                                className="shop-page__show-more"
                                onClick={showMore}
                            >
                                Show more
                            </ButtonComponent>
                        </div>
                    )}
                </div>

                {isMapOpen && (
                    <div className="shop-page__map">
                        <YMaps
                            query={{
                                apikey: process.env.YANDEX_MAPS_API_KEY,
                                lang: 'en_US',
                            }}
                        >
                            <Map
                                key={visibleFields.map((f) => f.id).join('-')}
                                instanceRef={handleInstanceRef}
                                defaultState={{ center: [48.5, 10.0], zoom: 3 }}
                                modules={['util.bounds']}
                                width="100%"
                                height="100%"
                            >
                                {visibleFields.map((field) => (
                                    <Placemark
                                        key={field.id}
                                        geometry={[
                                            field.coordinates.lat,
                                            field.coordinates.lng,
                                        ]}
                                        properties={{
                                            iconCaption: field.name,
                                        }}
                                        options={{
                                            preset:
                                                field.id === activeFieldId
                                                    ? 'islands#redIcon'
                                                    : 'islands#greenIcon',
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