import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableColumnHeaderProps {
  column: {
    header: string;
    accessor: string;
    sortable?: boolean;
  };
  sortConfig: { key: string; direction: 'ascending' | 'descending' } | null;
  onSort: (key: string) => void;
}

export function TableColumnHeader({ 
  column, 
  sortConfig, 
  onSort 
}: TableColumnHeaderProps) {
  if (!column.sortable) {
    return <span>{column.header}</span>;
  }

  const isSorted = sortConfig?.key === column.accessor;
  const direction = sortConfig?.direction;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => onSort(column.accessor)}
    >
      <span>{column.header}</span>
      {isSorted ? (
        direction === 'ascending' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}