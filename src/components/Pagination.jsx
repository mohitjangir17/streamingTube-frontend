// eslint-disable-next-line react/prop-types
export function Pagination({ totalNumberPages, currentPage, onpageChange }) {

    const handlePageChange = (page) => {
        onpageChange(page)
    };
    return (
        <div className="pagination flex items-center justify-evenly">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-700 disabled:hover:bg-slate-700 "
            >
                Previous
            </button>
            <span>{` Page ${currentPage} out of ${totalNumberPages}`}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalNumberPages}
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-700 disabled:hover:bg-slate-700"
            >
                Next
            </button>
        </div>
    )
}