import './HomePage.css'
import img1 from '../../assets/images/1.webp'
import img2 from '../../assets/images/2.webp'
import img3 from '../../assets/images/3.webp'

export default function HomePage() {
    return (
        <div className="homePage">
            <div className="heroBlock">
                <h2 className="heroBlock__title">Rent your own field, invest in farming, and grow your own vegetables</h2>
                <button className="heroBlock__button">Let's start</button>
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

        </div>
    )
}