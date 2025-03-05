import React, { useState } from 'react';
import ReactSlider from 'react-slider';


type PriceRangeSliderProps = {
    min: number;
    max: number;
    rangeValues: [number, number];
    onChange: (values: [number, number]) => void;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, rangeValues, onChange }) => {
    const [values, setValues] = useState<[number, number]>(rangeValues);
    const handleChange = (newValues: [number, number]) => {
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <div className="max-w-md mx-auto pb-10">
            <div className="my-4 relative">
                <ReactSlider
                    className="w-full h-1"
                    thumbClassName="absolute w-5 h-5 bg-black rounded-full -top-2 z-10 cursor-grab focus:outline-none"
                    trackClassName="h-1 rounded-full"
                    value={values}
                    onChange={(newValues: [number, number]) => handleChange(newValues)}
                    min={min}
                    max={max}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `$${state.valueNow}`}
                    renderThumb={(props, state) => (
                        <div {...props} className={props.className + " flex flex-col items-center"} key={state.index}>
                            <div className="w-5 h-5 bg-black rounded-full"></div>
                            <div className="absolute top-7 font-medium text-lg whitespace-nowrap">
                                ${state.valueNow}
                            </div>
                        </div>
                    )}
                    renderTrack={(props, state) => (
                        <div

                            {...props}
                            className={`h-1 absolute rounded-full ${state.index === 1 ? 'bg-black' : 'bg-gray-200'
                                }`}
                            key={state.index}
                        />
                    )}
                    pearling
                    minDistance={10}
                />
            </div>
        </div>
    );
};

export default PriceRangeSlider;