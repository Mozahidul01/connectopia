import { Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button } from "./ui/Button";

interface PostMoreDropdownProps {}

const PostMoreDropdown = ({}: PostMoreDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="text-gray-500 h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50 "
        align="end"
      >
        <DropdownMenuItem
          asChild
          className="group dark:hover:bg-slate-950 dark:hover:text-white"
        >
          <Button
            variant="link"
            className="hover:border-none focus:border-none hover:ring-0 focus:ring-0 focus:ring-offset-0"
          >
            <Edit className="mr-2 h-4 w-4 group-hover:text-blue-600" />
            <span>Edit</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="w-0.5 h-8 dark:bg-slate-700" />

        <DropdownMenuItem
          asChild
          className="group dark:hover:bg-slate-950 dark:hover:text-white"
        >
          <Button
            variant="link"
            className="hover:border-none focus:border-none hover:ring-0 focus:ring-0 focus:ring-offset-0"
          >
            <Trash className="mr-2 h-4 w-4 group-hover:text-red-600" />
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMoreDropdown;
