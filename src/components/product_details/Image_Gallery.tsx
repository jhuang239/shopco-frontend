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
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 flex flex-col gap-4 max-h-[500px] overflow-y-auto no-scrollbar">
                {images.map((image, index) => {
                    return (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={image.file_name}
                            className={`w-full h-40 cursor-pointer object-cover rounded-md ${activeIndex === index ? 'border-2 border-gray-600' : 'border-0'}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    )
                })}
            </div>
            <div className="col-span-3">
                <img
                    src={images[activeIndex].url}
                    alt={images[activeIndex].file_name}
                    className="w-full h-[500px] object-cover rounded-md"
                />
            </div>
        </div>
    )
}

export default Image_Gallery;