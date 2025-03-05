import { DressStyleProps } from "./Filter"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type DressStyleListProps = {
    dressStyleList: DressStyleProps[];
    onChange: (style: string) => void;
}

const DressStyleList: React.FC<DressStyleListProps> = ({ dressStyleList, onChange }) => {

    const [styles, setStyles] = useState<DressStyleProps[]>(dressStyleList);

    const styleHandler = (style: string) => {
        setStyles(styles.map((s: DressStyleProps) => {
            if (s.style === style) {
                return {
                    ...s,
                    checked: !s.checked
                }
            }
            return s;
        }))
        onChange(style);
    }

    return (
        <div className="flex flex-col gap-4 h-35">
            {styles.map((dressStyle, index) => {
                let classes = "text-gray-600 capitalize";
                if (dressStyle.checked) {
                    classes += " font-bold";
                }
                return (
                    <div key={`style_${index}`} className="flex flex-row items-center hover:cursor-pointer justify-between" onClick={() => styleHandler(dressStyle.style)}>
                        <p className={classes}>{dressStyle.style}</p>
                        <FontAwesomeIcon icon={faChevronRight} className={dressStyle.checked ? "text-gray-800" : "text-gray-600"} />
                    </div>
                )
            })}
        </div>
    )
}

export default DressStyleList;