import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


type PageIndicatorProps = {
    productTitle?: string;
}

export const isUUID4 = (str: string): boolean => {
    // UUID v4 pattern: 8-4-4-4-12 hex digits with the version digit being 4
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(str);
};

const Page_Indicator: React.FC<PageIndicatorProps> = ({ productTitle }) => {

    const pageIndicator = [
        { title: "home", path: "/" },
    ];

    const location = useLocation();

    const locationPath = location.pathname.split("/").slice(1);

    locationPath.map((path, index) => {
        if (index > 0 && !isUUID4(path)) {
            return pageIndicator.push({ title: path, path: `${pageIndicator[index].path}/${path}` });
        } else if (index > 0 && isUUID4(path) && productTitle) {
            return pageIndicator.push({ title: productTitle, path: `` });
        } else {
            return pageIndicator.push({ title: path, path: `/${path}` });
        }
    })

    return (
        <>
            {pageIndicator.map((page, index) => {
                if (index != pageIndicator.length - 1) {
                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <Link to={page.path} className="text-sm text-gray-700 hover:text-blue-600 transition-colors">{page.title}</Link>
                            {index !== pageIndicator.length - 1 && <FontAwesomeIcon icon={faChevronRight} className="text-sm text-gray-700" />}
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <p className="text-sm text-gray-800">{page.title}</p>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default Page_Indicator;