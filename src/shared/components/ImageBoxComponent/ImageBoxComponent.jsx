import './ImageBoxComponent.css';

export default function ImageBoxComponent({ imageInfo }) {
    return (
        <div className="imageBox">
            <img
                src={imageInfo.img}
                alt={imageInfo.alt}
                className="imageBox-image"
                loading="lazy"
            />

            <p className="imageBox-info">
                {imageInfo.info}
            </p>
        </div>
    );
}