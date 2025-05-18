
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: Product;
  isHighlighted: boolean;
  onClick: () => void;
}

export function ProductItem({ product, isHighlighted, onClick }: ProductItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 cursor-pointer rounded-md transition-colors",
        isHighlighted
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/48x48/gray/white?text=No+Image";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{product.title}</h4>
        <div className="flex items-center text-xs gap-2">
          <span className="text-primary font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-muted-foreground">
            {product.brand}
          </span>
        </div>
      </div>
    </div>
  );
}
