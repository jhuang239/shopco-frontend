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

        // Always show first few pages
        if (currentPage <= 4) {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
                pageNumbers.push(i);
            }
            if (totalPages > 5) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        // Always show last few pages
        else if (currentPage > totalPages - 4) {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = Math.max(totalPages - 4, 1); i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }
        // Show pages around current page
        else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between gap-2 my-4 px-4">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1, true)}
                disabled={currentPage === 1 || loading}
                className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-4 py-2 text-gray-700">...</span>
                        ) : (
                            <button
                                disabled={loading}
                                onClick={() => typeof page === 'number' && onPageChange(page, true)}
                                className={`px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed ${currentPage === page
                                    ? 'bg-gray-100 text-gray-900 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
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
                className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;