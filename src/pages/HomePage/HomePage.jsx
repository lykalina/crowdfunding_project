import './HomePage.css';
import { useHomePageViewModel } from './useHomePageViewModel';
import { Link } from "react-router-dom";
import ImageBoxComponent from "../../shared/components/ImageBoxComponent/ImageBoxComponent";

export default function HomePage() {
    const {
        imageBoxesData
    } = useHomePageViewModel();

    return (
        <div className="home-page">
            <div className="home-page__content home-page__hero">
                <h2 className="home-page__title">
                    Rent your own field, invest in farming, and grow your own vegetables
                </h2>

                <Link
                    className="home-page__button"
                    to='/plots'
                >
                    Let's start
                </Link>

                <div className="home-page__cards">
                    {imageBoxesData.map(imageBox =>
                        <ImageBoxComponent
                            key={imageBox.id}
                            imageInfo={imageBox}
                        />)}
                </div>
            </div>
        </div>
    );
}