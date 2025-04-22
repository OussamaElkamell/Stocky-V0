import { Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfile() {
  return (
    <div className="mt-auto p-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/confident-woman.png" alt="Your Avatar" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Sophie Martin</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <p className="text-xs text-gray-500">Available</p>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
              Available
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              Busy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
              Offline
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
