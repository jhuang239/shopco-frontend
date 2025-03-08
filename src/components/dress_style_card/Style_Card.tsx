import causal from '../../assets/images/styles/Casual.png';
import formal from '../../assets/images/styles/Formal.png';
import party from '../../assets/images/styles/Party.png';
import gym from '../../assets/images/styles/Gym.png';

const Style_Cards: React.FC = () => {
    return (
        <div className="flex flex-col flex-wrap items-center justify-center bg-[#f0f0f0] rounded-2xl shadow-lg py-4 ">
            <h1 className="font-header uppercase sm:text-3xl text-2xl px-4">browse by dress style</h1>
            <div className="grid grid-cols-6 gap-4 w-full p-6">
                <div className="md:col-span-2 col-span-6 bg-white rounded-[20px] overflow-hidden relative md:h-[300px] h-[200px]">
                    <h4 className="text-bold absolute top-6 left-6 text-2xl font-medium z-10">Casual</h4>
                    <div
                        className="w-full h-full bg-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                        style={{ backgroundImage: `url(${causal})`, backgroundPosition: 'right 40% top 0%' }}
                    >
                    </div>
                </div>
                <div className="md:col-span-4 col-span-6 bg-white rounded-[20px] overflow-hidden relative md:h-[300px] h-[200px]">
                    <h4 className="text-bold absolute top-6 left-6 text-2xl font-medium z-10">Formal</h4>
                    <div
                        className="w-full h-full bg-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer" style={{ backgroundImage: `url(${formal})`, backgroundPosition: 'right 40% top 0%' }}
                    >
                    </div>
                </div>
                <div className="md:col-span-4 col-span-6 bg-white rounded-[20px] overflow-hidden relative md:h-[300px] h-[200px]">
                    <h4 className="text-bold absolute top-6 left-6 text-2xl font-medium z-10">Party</h4>
                    <div
                        className="w-full h-full bg-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer" style={{ backgroundImage: `url(${party})`, backgroundPosition: 'right 40% top 0%' }}
                    >
                    </div>
                </div>
                <div className="md:col-span-2 col-span-6 bg-white rounded-[20px] overflow-hidden relative md:h-[300px] h-[200px]">
                    <h4 className="text-bold absolute top-6 left-6 text-2xl font-medium z-10">Party</h4>
                    <div
                        className="w-full h-full bg-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer" style={{ backgroundImage: `url(${gym})`, backgroundPosition: 'right 40% top 0%' }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Style_Cards;