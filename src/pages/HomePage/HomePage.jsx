import './HomePage.css'
import img1 from '../../assets/images/1.webp'
import img2 from '../../assets/images/2.webp'
import img3 from '../../assets/images/3.webp'
import SearchIcon from "../../components/icons/SeachIcon";
import { YMaps, Map } from '@mr-igorinni/react-yandex-maps-fork';
import {useMainLayoutViewModel} from "../../layouts/useMainLayoutViewModel";

export default function HomePage() {
    const { scrollToLocations } = useMainLayoutViewModel();

    return (
        <div className="homePage">
            <div className="contentBlock heroBlock">
                <h2 className="block__title">Rent your own field, invest in farming, and grow your own vegetables</h2>
                <button className="contentBlock__button" onClick={scrollToLocations}>Let's start</button>
                <div className="heroBlock__cards">
                    <div className="card">
                        <img
                            src={img1}
                            alt='img1'
                            className="cardImg"
                            loading="lazy"
                        />
                        <p className="cardInfo">
                            Rent your own piece of farmland and watch your vegetables grow.
                        </p>
                    </div>
                    <div className="card">
                        <img
                            src={img2}
                            alt='img2'
                            className="cardImg"
                            loading="lazy"
                        />
                        <p className="cardInfo">
                            Enjoy, year after year, the wonders of nature with your rented vegetable farmland (60 sqm / 30 sqm).
                        </p>
                    </div>
                    <div className="card">
                        <img
                            src={img3}
                            alt='img3'
                            className="cardImg"
                            loading="lazy"
                        />
                        <p className="cardInfo">
                            Grow your own piece of land, from planting seeds in the lush soil to harvesting your own  vegetables.
                        </p>
                    </div>
                </div>
            </div>
            <YMaps query={{ apikey: '950fb4ea-a92a-4e5b-a0f3-d4e69f9aecb9', lang: 'ru_RU' }}>
                <div className="contentBlock locationsBlock" id="locations">
                    <h2 className="block__title">Locations</h2>
                    <div className="inputBlock">
                        <div className="inputText">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search by city, country, village places"
                            />
                        </div>
                        <button className="contentBlock__button smallButton">Search</button>
                    </div>
                    <div className="mapBlock">
                        <div className="mapResults">
                            <p>Search results</p>
                        </div>
                        <div className="map">
                            <Map
                                defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
                                width="100%"
                                height="400px"
                            />
                        </div>
                    </div>
                </div>
            </YMaps>
        </div>
    )
}