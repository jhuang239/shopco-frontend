import { createContext, ReactNode, useState, useEffect } from "react";
import {
    getToken,
    isTokenExpired,
    removeToken,
    saveToken,
} from "../../utils/Token";
import { getCartQuantity } from "../../utils/http";

type PageContextType = {
    showSidebar: boolean;
    setShowSidebar: () => void;
    showFilterSidebar: boolean;
    setShowFilterSidebar: () => void;
    showLoginModal: boolean;
    setShowLoginModal: () => void;
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
    isLogged: boolean;
    setIsLogged: (logged: boolean) => void;
    cartQuantity: { id: string }[];
    setCartQuantity: (id: string, type: string) => void;
    clearCartQuantity: () => void;
};

const PageContext = createContext<PageContextType>({
    showSidebar: false,
    setShowSidebar: () => {},
    showFilterSidebar: false,
    setShowFilterSidebar: () => {},
    showLoginModal: false,
    setShowLoginModal: () => {},
    token: null,
    setToken: () => {},
    removeToken: () => {},
    isLogged: false,
    setIsLogged: () => {},
    cartQuantity: [],
    setCartQuantity: () => {},
    clearCartQuantity: () => {},
});

const PageContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [cartQuantity, setCartQuantity] = useState<{ id: string }[]>([]);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const toggleFilterSidebar = () => {
        setShowFilterSidebar((prev) => !prev);
    };

    const toggleLoginModal = () => {
        setShowLoginModal((prev) => !prev);
    };

    const setTokenHandler = (token: string) => {
        saveToken(token);
        setToken(token);
    };

    const removeTokenHandler = () => {
        removeToken();
        setIsLogged(false);
        setToken(null);
        setCartQuantity([]);
    };

    const setCartQuantityHandler = (id: string, type: string) => {
        if (type === "add") {
            setCartQuantity((prev) => {
                return [...prev, { id: id }];
            });
        } else if (type === "remove") {
            setCartQuantity((prev) => {
                return prev.filter((item) => item.id !== id);
            });
        }
    };

    const clearCartQuantityHandler = () => {
        setCartQuantity([]);
    };

    const contextValue: PageContextType = {
        showSidebar,
        setShowSidebar: toggleSidebar,
        showFilterSidebar,
        setShowFilterSidebar: toggleFilterSidebar,
        showLoginModal,
        setShowLoginModal: toggleLoginModal,
        token,
        setToken: setTokenHandler,
        removeToken: removeTokenHandler,
        isLogged,
        setIsLogged,
        cartQuantity,
        setCartQuantity: setCartQuantityHandler,
        clearCartQuantity: clearCartQuantityHandler,
    };

    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
            getCartQuantity().then((data) => {
                setCartQuantity(data);
            });
            setToken(token);
            setIsLogged(true);
        } else {
            removeTokenHandler();
            setIsLogged(false);
        }
    }, [token]);

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    );
};

export { PageContext };
export default PageContextProvider;
