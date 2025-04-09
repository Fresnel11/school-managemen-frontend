import * as Toast from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
}

export function Notification({
  message,
  type = "success",
  duration = 3000,
  onOpenChange,
}: NotificationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const typeStyles = {
    success: "border-green-500 bg-green-50 text-green-800",
    error: "border-red-500 bg-red-50 text-red-800",
    info: "border-blue-500 bg-blue-50 text-blue-800",
  };

  return (
    <Toast.Root
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (onOpenChange) onOpenChange(isOpen);
      }}
      duration={duration}
      className={cn(
        "fixed bottom-4 right-4 z-50 w-80",
        open ? "animate-slideInRight" : "animate-slideOutRight"
      )}
    >
      <Card
        className={cn(
          "flex flex-col items-start p-4 border-l-4 shadow-lg relative",
          typeStyles[type]
        )}
      >
        <div className="flex w-full items-center justify-between">
          <Toast.Description className="text-sm font-medium">
            {message}
          </Toast.Description>
          <Toast.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </Button>
          </Toast.Close>
        </div>

        {/* Progress Bar */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-1 bg-current opacity-30",
            type === "success" && "bg-green-500",
            type === "error" && "bg-red-500",
            type === "info" && "bg-blue-500"
          )}
          style={{
            animation: `progressBar ${duration}ms linear forwards`,
            width: "100%",
          }}
        />
      </Card>
    </Toast.Root>
  );
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Viewport className="fixed bottom-0 right-0 p-4 flex flex-col gap-3 w-80" />
    </Toast.Provider>
  );
}

export function useNotification() {
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: NotificationType; duration?: number }[]
  >([]);

  const addNotification = (
    message: string,
    type: NotificationType = "success",
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return { notifications, addNotification, removeNotification };
}
