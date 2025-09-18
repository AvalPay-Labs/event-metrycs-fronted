import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  href?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onRemove: (id: string) => void;
}

function NotificationItem({ notification, onRead, onRemove }: NotificationItemProps) {
  const typeStyles = {
    info: "bg-info/10 border-info",
    success: "bg-success/10 border-success",
    warning: "bg-warning/10 border-warning",
    error: "bg-error/10 border-error",
  };

  const typeIcons = {
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-info"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-success"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-warning"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-error"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  };

  const itemContent = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{typeIcons[notification.type]}</div>
          <div>
            <h4 className={cn("font-medium text-text", !notification.read && "font-semibold")}>
              {notification.title}
            </h4>
            <p className="text-sm text-textSecondary mt-1">{notification.message}</p>
            <p className="text-xs text-textSecondary mt-2">
              {formatDate(notification.timestamp)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!notification.read && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRead(notification.id);
              }}
              className="text-textSecondary hover:text-text p-1"
              aria-label="Mark as read"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(notification.id);
            }}
            className="text-textSecondary hover:text-error p-1"
            aria-label="Remove notification"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "p-4 border-l-2 rounded-r-md hover:bg-element/50 transition-colors",
        notification.read ? "bg-card" : typeStyles[notification.type]
      )}
    >
      {notification.href ? (
        <a
          href={notification.href}
          className="block"
          onClick={() => !notification.read && onRead(notification.id)}
        >
          {itemContent}
        </a>
      ) : (
        itemContent
      )}
    </div>
  );
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  className?: string;
  maxHeight?: string;
}

export function Notifications({
  notifications,
  onMarkAsRead,
  onRemove,
  onMarkAllAsRead,
  onClearAll,
  className,
  maxHeight = "400px",
}: NotificationsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn(
        "w-full max-w-sm bg-card border border-element rounded-md shadow-lg",
        className
      )}
    >
      <div className="p-4 border-b border-element">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text">
            Notifications{" "}
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-text">
                {unreadCount}
              </span>
            )}
          </h3>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-primary hover:text-primaryHover"
              >
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-textSecondary hover:text-text"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-textSecondary mb-3"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <p className="text-textSecondary">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-element">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={onMarkAsRead}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Dropdown version
interface NotificationDropdownProps {
  trigger: React.ReactNode;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  className?: string;
  maxHeight?: string;
}

export function NotificationDropdown({
  trigger,
  notifications,
  onMarkAsRead,
  onRemove,
  onMarkAllAsRead,
  onClearAll,
  className,
  maxHeight = "400px",
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 min-w-[320px]">
          <Notifications
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
            onRemove={onRemove}
            onMarkAllAsRead={onMarkAllAsRead}
            onClearAll={onClearAll}
            className={className}
            maxHeight={maxHeight}
          />
        </div>
      )}
    </div>
  );
}