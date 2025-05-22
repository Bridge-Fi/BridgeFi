"use client";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Helper to generate page numbers with ellipses
  const getPages = (): (number | "ellipsis")[] => {
    const delta = 2;
    const range: (number | "ellipsis")[] = [];
    let left = currentPage - delta;
    let right = currentPage + delta;

    if (left < 1) {
      right += 1 - left;
      left = 1;
    }
    if (right > totalPages) {
      left -= right - totalPages;
      right = totalPages;
    }
    left = Math.max(left, 1);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (left > 2) {
      range.unshift("ellipsis");
    }
    if (left > 1) {
      range.unshift(1);
    }
    if (right < totalPages - 1) {
      range.push("ellipsis");
    }
    if (right < totalPages) {
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPages();

  return (
    <nav
      className="flex justify-center items-center space-x-1"
      aria-label="Pagination"
    >
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        &lt;
      </Button>

      {/* Page numbers with ellipses */}
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`el-${idx}`} className="px-2 text-gray-500">
            &hellip;
          </span>
        ) : (
          <Button
            key={p}
            variant={p === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p as number)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        &gt;
      </Button>
    </nav>
  );
}
