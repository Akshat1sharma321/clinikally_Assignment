
import React from "react";

export function ProductItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-muted pulse"></div>
      <div className="flex-1">
        <div className="h-4 w-3/4 bg-muted rounded pulse mb-2"></div>
        <div className="h-3 w-1/2 bg-muted rounded pulse"></div>
      </div>
    </div>
  );
}
