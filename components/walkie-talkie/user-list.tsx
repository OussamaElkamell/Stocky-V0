import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface User {
  id: number
  name: string
  avatar: string
  status: string
  lastActive: string
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <Tabs defaultValue="users" className="w-[400px]">
      <TabsContent value="users" className="space-y-4 mt-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                    user.status,
                  )}`}
                ></div>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.lastActive}</p>
              </div>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case "available":
      return "bg-emerald-500"
    case "busy":
      return "bg-amber-500"
    case "offline":
      return "bg-slate-300"
    default:
      return "bg-slate-300"
  }
}
