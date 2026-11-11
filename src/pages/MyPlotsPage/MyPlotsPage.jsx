import './MyPlotsPage.css';
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';
import { useRanches } from '../../shared/hooks/useRanches';
import { useRanchMap } from '../../shared/hooks/useRanchMap';
import { useShopPagination } from '../../shared/hooks/useShopPagination';
import ButtonComponent from '../../shared/components/ButtonComponent/ButtonComponent';
import RanchCardComponent from '../../shared/components/RanchCardComponent/RanchCardComponent';
import SearchFieldComponent from '../../shared/components/SearchFieldComponent/SearchFieldComponent';

export default function MyPlotsPage() {
    const { allRanches } = useRanches();

    const { visibleFields, hasMore, showMore } = useShopPagination({
        fields: allRanches,
        resetKey: 'plots',
    });

    const {
        mapRef,
        activeRanchId,
        handleMapLoad,
        selectRanchFromList,
        centerOnCoords,
    } = useRanchMap(allRanches);

    return (
        <YMaps
            query={{
                apikey: process.env.YANDEX_MAPS_API_KEY,
                lang: 'en_US',
            }}
        >
            <div className="plots-page__content">
                <h2 className="plots-page__title">Locations</h2>

                <SearchFieldComponent
                    onLocationSelect={(location) => {
                        centerOnCoords(location.latitude, location.longitude, 9);
                    }}
                />

                <div className="plots-page__map-block">
                    <div className="plots-page__map-results">
                        {allRanches.length === 0 ? (
                            <p className="plots-page__map-empty">
                                0 results
                            </p>
                        ) : (
                            <ul className="plots-page__results-list">
                                {visibleFields.map((ranch) => (
                                    <RanchCardComponent
                                        key={ranch.id}
                                        ranch={ranch}
                                        isActive={ranch.id === activeRanchId}
                                        onSelect={() => selectRanchFromList(ranch)}
                                    />
                                ))}
                            </ul>
                        )}

                        {hasMore && (
                            <div className="plots-page__show-more-wrapper">
                                <ButtonComponent
                                    variant="outline"
                                    className="plots-page__show-more"
                                    onClick={showMore}
                                >
                                    Show more
                                </ButtonComponent>
                            </div>
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
                            {allRanches.map((ranch) => (
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