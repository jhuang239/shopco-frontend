import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../../dummyData/dummy";

type ColorProps = {
    onChange: (color: string) => void;
};

const Color: React.FC<ColorProps> = ({ onChange }) => {

    const [selectedColor, setSelectedColor] = useState<string>('');
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {

        // Generate an array of unique random colors from the Colors array
        const generateRandomColors = (count: number) => {
            // Ensure we don't try to get more colors than exist in the array
            const maxCount = Math.min(count, Colors.length);

            // Create a copy of indices array (0 to Colors.length-1)
            const availableIndices = Array.from({ length: Colors.length }, (_, i) => i);

            // Array to store our selected colors
            const selectedColors = [];

            // Select 'maxCount' unique random colors
            for (let i = 0; i < maxCount; i++) {
                // Get a random index from the remaining available indices
                const randomIndex = Math.floor(Math.random() * availableIndices.length);

                // Get the color index from our available indices
                const colorIndex = availableIndices[randomIndex];

                // Add the color to our selected colors
                selectedColors.push(Colors[colorIndex]);

                // Remove the used index from available indices to ensure uniqueness
                availableIndices.splice(randomIndex, 1);
            }

            return selectedColors;
        };

        // Set the state with 5 random colors
        setRandomColors(generateRandomColors(5));

        // If you want to keep the colors for the component's lifetime,
        // this effect should only run once on mount
    }, []);

    const colorHandler = (color: string) => {
        setSelectedColor(color);
        onChange(color);
    }

    return (
        <div className="flex flex-col gap-2 mt-2 py-2 border-t-2 border-gray-200">
            <span className="text-gray-600">Select Colors</span>
            <div className="flex flex-wrap gap-2">
                {randomColors.map((color, index) => {
                    return (
                        <div key={`${color}_${index}`} className="inline-flex">
                            <div
                                className="w-10 h-10 rounded-full hover:cursor-pointer flex items-center justify-center"
                                style={{ backgroundColor: color }}
                                onClick={() => colorHandler(color)}
                            >
                                {selectedColor === color && <FontAwesomeIcon icon={faCheck} className="text-white text-xl" />}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Color;