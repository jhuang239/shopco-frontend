import { SizeProps } from "./Filter";
import { useState } from "react";

type SizeListProps = {
    sizeList: SizeProps[];
    onChange: (size: string) => void;
};

const SizeList: React.FC<SizeListProps> = ({ sizeList, onChange }) => {
    const [sizes, setSizes] = useState<SizeProps[]>(sizeList);

    const sizeHandler = (name: string) => {
        setSizes(sizes.map((s: SizeProps) => {
            if (s.name === name) {
                return {
                    ...s,
                    checked: !s.checked
                }
            }
            return s;
        }))
        onChange(name);
    }

    return (
        <div className="flex flex-wrap gap-2 pb-4">
            {sizes.map((size) => {
                return (
                    <div key={size.name} className="inline-flex">
                        <div
                            className={`py-2 px-4 rounded-4xl hover:cursor-pointer flex items-center justify-center ${size.checked ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                                }`}
                            onClick={() => sizeHandler(size.name)}
                        >
                            <p className={`${size.checked ? "text-white" : "text-gray-600"}`}>{size.name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SizeList;