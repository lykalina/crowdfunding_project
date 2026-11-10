import './HomePage.css';
import { useHomePageViewModel } from './useHomePageViewModel';
import ImageBoxComponent from '../../shared/components/ImageBoxComponent/ImageBoxComponent';
import ButtonLinkComponent from "../../shared/components/ButtonLinkComponent/ButtonLinkComponent";

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

                <ButtonLinkComponent
                    to="/plots"
                    variant="primary"
                    className="home-page__button"
                >
                    Let's start
                </ButtonLinkComponent>

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