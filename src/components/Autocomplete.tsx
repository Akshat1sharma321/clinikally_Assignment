
import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { ProductItem } from "./ProductItem";
import { ProductItemSkeleton } from "./ProductItemSkeleton";
import { Pagination } from "./Pagination";
import { Input } from "@/components/ui/input";
import { Search, XCircle, Loader } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PRODUCTS_PER_PAGE = 5;

export function Autocomplete() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounce(query, 300);

  // Fetch products when debounced query or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (debouncedQuery.length < 2) {
          setProducts([]);
          setTotalPages(1);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const skip = currentPage * PRODUCTS_PER_PAGE;
        const result = await searchProducts(debouncedQuery, PRODUCTS_PER_PAGE, skip);
        
        setProducts(result.products);
        setTotalPages(Math.ceil(result.total / PRODUCTS_PER_PAGE));
        
        // Only open dropdown if we have results
        if (result.products.length > 0) {
          setIsOpen(true);
        } else if (debouncedQuery.length >= 2) {
          // No results for valid query
          setIsOpen(true);
        }
      } catch (error) {
        toast.error("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery, currentPage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Reset page when query changes
    setCurrentPage(0);
    
    // Display empty state if input is less than 2 chars
    setIsOpen(value.length >= 2 || isFocused);
    
    // Reset highlight when typing
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < products.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < products.length) {
          selectProduct(products[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setHighlightedIndex(-1); // Reset highlight on page change
  };

  const selectProduct = (product: Product) => {
    setQuery(product.title);
    setIsOpen(false);
    toast.success(`Selected: ${product.title}`);
  };

  const clearSearch = () => {
    setQuery("");
    setProducts([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (query.length >= 2) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className="pl-9 pr-8"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-popover rounded-md shadow-lg border border-border overflow-hidden"
        >
          <div className="max-h-80 overflow-y-auto p-1 space-y-0.5">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <ProductItemSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  isHighlighted={index === highlightedIndex}
                  onClick={() => selectProduct(product)}
                />
              ))
            ) : query.length >= 2 ? (
              <div className="py-8 text-center text-muted-foreground">
                No products found for "{query}"
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Type at least 2 characters to search
              </div>
            )}
          </div>
          
          {products.length > 0 && (
            <div className="border-t">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            </div>
          )}
          
          {isLoading && products.length > 0 && (
            <div className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm rounded-full p-1">
              <Loader className="h-4 w-4 animate-spin text-primary" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
