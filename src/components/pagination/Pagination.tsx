import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    loading: boolean;
    onPageChange: (page: number, loading: boolean) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    loading,
    onPageChange,
}) => {
    // Generate the page numbers to display
    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];

        // For fewer pages, just show all of them
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }

        // Always add page 1
        pageNumbers.push(1);

        // Check if we need an ellipsis after page 1
        if (currentPage > 3) {
            pageNumbers.push("...");
        }

        // Calculate the range of pages to show around current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Adjust the range to show at least 3 pages if possible
        if (currentPage <= 3) {
            endPage = Math.min(4, totalPages - 1);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - 3, 2);
        }

        // Add the range of page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Check if we need an ellipsis before the last page
        if (currentPage < totalPages - 2) {
            pageNumbers.push("...");
        }

        // Always add the last page (unless it's already been added)
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between gap-2 my-4 md:px-4">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1, true)}
                disabled={currentPage === 1 || loading}
                className="flex items-center md:px-4 py-2 px-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "..." ? (
                            <span className="px-4 py-2 text-gray-700">...</span>
                        ) : (
                            <button
                                disabled={loading || currentPage === page}
                                onClick={() =>
                                    typeof page === "number" &&
                                    onPageChange(page, true)
                                }
                                className={`px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                                    currentPage === page
                                        ? "bg-gray-100 text-gray-900 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Next button */}
            <button
                onClick={() => onPageChange(currentPage + 1, true)}
                disabled={currentPage === totalPages || loading}
                className="flex items-center md:px-2 px-1 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;
