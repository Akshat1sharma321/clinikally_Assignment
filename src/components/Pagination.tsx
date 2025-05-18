
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({ 
  currentPage, 
  totalPages,
  onPageChange,
  disabled = false
}: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-2 px-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || disabled}
        className="h-8 px-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Previous</span>
      </Button>

      <span className="text-xs text-muted-foreground">
        Page {currentPage + 1} of {Math.max(1, totalPages)}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1 || totalPages <= 1 || disabled}
        className="h-8 px-2"
      >
        <span>Next</span>
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
