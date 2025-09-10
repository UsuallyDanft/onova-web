import React from 'react';
import './Pagination.css';

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 3, 
  onPageChange = () => {} 
}) {
  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        {renderPageNumbers()}
        
        {currentPage < totalPages && (
          <button
            className="next-btn"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}