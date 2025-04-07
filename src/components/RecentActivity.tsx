import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "submitted grades for Math 101",
    time: "10 minutes ago",
    avatar: "SJ"
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "updated student attendance records",
    time: "25 minutes ago",
    avatar: "MC"
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    action: "scheduled a parent-teacher meeting",
    time: "1 hour ago",
    avatar: "ER"
  },
  {
    id: 4,
    user: "David Kim",
    action: "uploaded new study materials",
    time: "2 hours ago",
    avatar: "DK"
  },
  {
    id: 5,
    user: "Lisa Patel",
    action: "created a new event: Science Fair",
    time: "3 hours ago",
    avatar: "LP"
  },
  {
    id: 6,
    user: "James Wilson",
    action: "approved budget for field trip",
    time: "5 hours ago",
    avatar: "JW"
  }
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 py-2">
            <Avatar>
              <AvatarFallback>{activity.avatar}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}