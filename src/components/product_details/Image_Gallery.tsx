import { useState } from "react";

type ImagePros = {
    id: string;
    file_name: string;
    url: string;
}

type ImageGalleryProps = {
    images: ImagePros[];
}

const Image_Gallery: React.FC<ImageGalleryProps> = ({ images }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {/* Main Image - will appear first on mobile, second on desktop */}
            <div className="md:col-span-3 md:order-2 order-1">
                <img
                    src={images[activeIndex].url}
                    alt={images[activeIndex].file_name}
                    className="w-full h-[500px] object-cover rounded-md"
                />
            </div>

            {/* Thumbnails - will appear second on mobile, first on desktop */}
            <div className="md:col-span-1 order-2 md:order-1 flex md:flex-col flex-row gap-4 md:max-h-[500px] md:overflow-y-auto overflow-x-auto no-scrollbar justify-between">
                {images.map((image, index) => {
                    return (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={image.file_name}
                            className={`md:w-full w-30 h-24 md:h-40 flex-shrink-0 cursor-pointer object-cover rounded-md ${activeIndex === index ? 'border-2 border-gray-600' : 'border-0'}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Image_Gallery;