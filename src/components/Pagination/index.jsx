import React, { useMemo } from 'react';
import styles from './Pagination.module.css';
import {
  FiChevronsRight,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
} from 'react-icons/fi';

const DOTS = 'DOTS';

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}

/**
 * usePagination - returns an array representing page items:
 * numbers and DOTS placeholders where appropriate.
 *
 * @param {Object} params
 * @param {number} params.totalPages
 * @param {number} params.currentPage
 * @param {number} params.siblingCount - how many pages to show on each side of current
 */
function usePagination({ totalPages, currentPage, siblingCount = 1 }) {
  return useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const pages = [];

    pages.push(1);

    if (shouldShowLeftDots) {
      pages.push(DOTS);
    } else {
      pages.push(...range(2, leftSiblingIndex - 1));
    }

    pages.push(...range(leftSiblingIndex, rightSiblingIndex));

    if (shouldShowRightDots) {
      pages.push(DOTS);
    } else {
      pages.push(...range(rightSiblingIndex + 1, totalPages - 1));
    }

    pages.push(totalPages);

    return pages;
  }, [totalPages, currentPage, siblingCount]);
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = '',
  ariaLabel = 'Pagination',
}) => {
  const paginationRange = usePagination({ totalPages, currentPage, siblingCount });

  if (totalPages === 0) return null;

  const onNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const onPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const onFirst = () => {
    if (currentPage !== 1) onPageChange(1);
  };

  const onLast = () => {
    if (currentPage !== totalPages) onPageChange(totalPages);
  };

  return (
    <nav
      className={`${styles.pagination} ${className}`}
      aria-label={ariaLabel}
      role="navigation"
    >
      {showFirstLast && (
        <FiChevronsLeft
          onClick={onFirst}
          disabled={currentPage === 1}
          aria-label="First page"
          className={`${styles.anchorIcon} ${currentPage === 1 ? styles.disabled : ''}`}
          style={{
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        />
      )}

      <FiChevronLeft
        onClick={onPrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${styles.anchorIcon} ${currentPage === 1 ? styles.disabled : ''}`}
      />

      {paginationRange.map((page, idx) => {
        if (page === DOTS) {
          return (
            <FiMoreHorizontal
              key={`dots-${idx}`}
              aria-hidden="true"
              style={{ padding: '6px 8px', userSelect: 'none' }}
            />
          );
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={
              page === currentPage ? `Page ${page}, current page` : `Go to page ${page}`
            }
            className={`${styles.pageItem} ${page === currentPage ? styles.active : ''}`}
            disabled={page === currentPage}
          >
            {page}
          </button>
        );
      })}

      <FiChevronRight
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${styles.anchorIcon} ${currentPage === totalPages ? styles.disabled : ''}`}
      />

      {showFirstLast && (
        <>
          <FiChevronsRight
            onClick={onLast}
            disabled={currentPage === totalPages}
            aria-label="Last page"
            className={`${styles.anchorIcon} ${currentPage === totalPages ? styles.disabled : ''}`}
          />
        </>
      )}
    </nav>
  );
};
