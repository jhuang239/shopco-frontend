import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isUUID4 } from "../../../utils/isUUID4";

type PageIndicatorProps = {
    productTitle?: string;
    categoryTitle?: string;
}

const Page_Indicator: React.FC<PageIndicatorProps> = ({ productTitle }) => {

    const pageIndicator = [
        { title: "Home", path: "/" },
    ];

    const location = useLocation();

    const locationPath = location.pathname.split("/").slice(1);

    locationPath.map((path, index) => {
        if (index > 0 && isUUID4(path) && productTitle) {
            return pageIndicator.push({ title: productTitle, path: `` });
        } else if (index > 0 && !isUUID4(path)) {
            return pageIndicator.push({ title: path, path: `${pageIndicator[index].path}/${path}` });
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