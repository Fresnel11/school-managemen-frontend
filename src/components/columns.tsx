import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";

// Example column definition for the DataTable
export const columns = [
  {
    header: "User",
    accessor: "name",
    sortable: true,
    cell: (row: any) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.avatar} alt={row.name} />
          <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: "role",
    sortable: true,
    cell: (row: any) => (
      <Badge variant={row.role === "Admin" ? "default" : "secondary"}>
        {row.role}
      </Badge>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    sortable: true,
    cell: (row: any) => {
      const statusMap: Record<string, { color: string; bg: string }> = {
        active: { color: "text-green-700", bg: "bg-green-100" },
        inactive: { color: "text-gray-700", bg: "bg-gray-100" },
        pending: { color: "text-amber-700", bg: "bg-amber-100" },
      };
      
      const style = statusMap[row.status.toLowerCase()] || { color: "text-gray-700", bg: "bg-gray-100" };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.color} ${style.bg}`}>
          {row.status}
        </span>
      );
    },
  },
  {
    header: "Last Login",
    accessor: "lastLogin",
    sortable: true,
  },
  {
    header: "Actions",
    accessor: "actions",
    cell: (row: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];