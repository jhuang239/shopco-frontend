import { Sizes } from "../../dummyData/dummy";
import { useEffect, useState } from "react";

const Size: React.FC = () => {

    const [randomSizes, setRandomSizes] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('');

    const generateRandomSizes = (count: number) => {
        // Check if we're asking for more sizes than exist in the array
        if (count > Sizes.length) {
            throw new Error(`Cannot select ${count} unique sizes from an array of ${Sizes.length} sizes`);
        }

        // Create a copy of indices array (0 to Sizes.length-1)
        const availableIndices = Array.from({ length: Sizes.length }, (_, i) => i);
        const sizes = [];

        // Select 'count' random sizes using unique indices
        for (let i = 0; i < count; i++) {
            // Generate a random index from the remaining available indices
            const randomPosition = Math.floor(Math.random() * availableIndices.length);

            // Get the actual index value at that position
            const randomIndex = availableIndices[randomPosition];

            // Add the size at randomIndex to our result array
            sizes.push(Sizes[randomIndex]);

            // Remove the used index from available indices to ensure uniqueness
            availableIndices.splice(randomPosition, 1);
        }

        return sizes;
    };

    const sizeHandler = (size: string) => {
        setSelectedSize(size);
    }

    useEffect(() => {
        setRandomSizes(generateRandomSizes(4));
    }, []);

    return (
        <div className="flex flex-col gap-2 py-2 border-t-2 border-gray-200">
            <span className="text-gray-600">Select Sizes</span>
            <div className="flex flex-wrap gap-2">
                {randomSizes.map((size) => {
                    return (
                        <div key={size} className="inline-flex">
                            <div
                                className={`py-2 px-4 rounded-4xl hover:cursor-pointer flex items-center justify-center ${size === selectedSize ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                                    }`}
                                onClick={() => sizeHandler(size)}
                            >
                                <p className={`${size === selectedSize ? "text-white" : "text-gray-600"}`}>{size}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Size;