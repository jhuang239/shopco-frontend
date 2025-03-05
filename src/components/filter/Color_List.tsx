import { ColorProps } from "./Filter";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type ColorListProps = {
    colorList: ColorProps[];
    onChange: (color: string) => void;
};

const ColorList: React.FC<ColorListProps> = ({ colorList, onChange }) => {

    const [colors, setColors] = useState<ColorProps[]>(colorList);

    const colorHandler = (color: string) => {
        setColors(colors.map((c: ColorProps) => {
            if (c.color === color) {
                return {
                    ...c,
                    checked: !c.checked
                }
            }
            return c;
        }))
        onChange(color);
    }

    return (
        <div className="flex flex-wrap gap-2 pb-4">
            {colors.map((color) => {
                return (
                    <div key={color.color} className="inline-flex">
                        <div
                            className="w-10 h-10 rounded-full hover:cursor-pointer flex items-center justify-center"
                            style={{ backgroundColor: color.color }}
                            onClick={() => colorHandler(color.color)}
                        >
                            {color.checked && <FontAwesomeIcon icon={faCheck} className="text-white text-xl" />}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ColorList;