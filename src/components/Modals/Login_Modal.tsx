import { MouseEvent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../../utils/http';
import { PageContext } from '../../context/pageContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const pageCtx = useContext(PageContext);
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            pageCtx.setToken(data.token);
            pageCtx.setIsLogged(true);
            onClose();
        }
    });

    const logout = () => {
        pageCtx.removeToken();
        onClose();
    }

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const data = { username, password };
        mutate(data);
    };

    // This function stops event propagation to prevent closing when clicking on the modal
    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden" onClick={handleModalClick}>
                {/* Header */}
                {!pageCtx.isLogged ?
                    <>
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Login</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faXmark} size='lg' />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6">
                            {isError && <div className="text-red-500 mb-4">Login Failed</div>}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    name='username'
                                    type="text"
                                    defaultValue={"kimwong1119"}
                                    className={`w-full px-3 py-2 border ${!isError ? "border-gray-300" : "border-red-400"} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    defaultValue={"password"}
                                    className={`w-full px-3 py-2 border ${!isError ? "border-gray-300" : "border-red-400"} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer"
                            >
                                Sign In
                            </button>
                        </form>
                    </>
                    :
                    <div className="px-6 py-8 flex flex-col space-y-4 justify-start">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-xl font-bold">Want to Logout?</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faXmark} size='lg' />
                            </button>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer">
                            Logout
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default LoginModal;