import { useRouteError } from "react-router-dom";

interface RouterError {
    message: string;
}

const Error_Page: React.FC = () => {
    const error = useRouteError() as RouterError;
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-header'>Error</h1>
            <p className='text-[12px] text-gray-700 mt-4'>{error.message}</p>
        </div>
    )
}

export default Error_Page;