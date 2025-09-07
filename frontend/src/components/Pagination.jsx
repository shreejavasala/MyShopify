import React from 'react'

const Pagination = ({ page, totalPages, applyFilters, scrollTargetRef }) => {

  const handlePrev = () => {
    if (page > 1) {
      applyFilters(page - 1);
      scrollTargetRef?.current?.scrollToView({ behavior: "smooth" }); // scroll to top of items
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      applyFilters(page + 1);
      scrollTargetRef?.current?.scrollToView({ behavior: "smooth" }); // scroll to top of items
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-4xl mt-8 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 rounded-md bg-white/10 text-white hover:bg-indigo-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-md bg-white/10 text-white hover:bg-indigo-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
  )
}

export default Pagination