import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Color: React.FC = () => {

    const [selectedColor, setSelectedColor] = useState<string>('');
    const [randomColors, setRandomColors] = useState<string[]>([]);

    useEffect(() => {
        // Function to generate a random RGB color
        const generateRandomRGBColor = () => {
            const r = Math.floor(Math.random() * 256); // Random value between 0-255
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        };

        // Generate an array of 5 random RGB colors
        const generateRandomColors = (count: number) => {
            const colors = [];
            for (let i = 0; i < count; i++) {
                colors.push(generateRandomRGBColor());
            }
            return colors;
        };

        // Set the state with 5 random colors
        setRandomColors(generateRandomColors(5));

        // If you want to keep the colors for the component's lifetime,
        // this effect should only run once on mount
    }, []);

    const colorHandler = (color: string) => {
        setSelectedColor(color);
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