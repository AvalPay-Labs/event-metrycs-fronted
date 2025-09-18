import React from "react";
import { cn } from "@/lib/utils";

// Contexto para los tabs
interface TabsContextValue {
  selectedTab: string;
  onChange: (id: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultValue, value, onValueChange, className, ...props }, ref) => {
    const [selectedTab, setSelectedTab] = React.useState<string>(
      value || defaultValue || ""
    );

    const handleTabChange = React.useCallback(
      (id: string) => {
        if (value === undefined) {
          setSelectedTab(id);
        }
        onValueChange?.(id);
      },
      [onValueChange, value]
    );

    // Si el valor cambia externamente
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedTab(value);
      }
    }, [value]);

    return (
      <TabsContext.Provider value={{ selectedTab, onChange: handleTabChange }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// Hook para usar el contexto
const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "underline";
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-element p-1 rounded-md",
      outline: "border-b border-element",
      underline: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: "default" | "outline" | "underline";
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, variant = "default", ...props }, ref) => {
    const { selectedTab, onChange } = useTabsContext();
    const isSelected = selectedTab === value;

    const variants = {
      default: cn(
        "rounded-sm px-3 py-1.5 transition-colors",
        isSelected
          ? "bg-background text-text shadow-sm"
          : "text-textSecondary hover:bg-element/80 hover:text-text"
      ),
      outline: cn(
        "px-3 py-2 border-b-2 transition-colors",
        isSelected
          ? "border-primary text-text"
          : "border-transparent text-textSecondary hover:text-text"
      ),
      underline: cn(
        "px-3 py-2 border-b-2 transition-colors",
        isSelected
          ? "border-primary text-text"
          : "border-transparent text-textSecondary hover:text-text"
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          "font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        onClick={() => onChange(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { selectedTab } = useTabsContext();
    const isSelected = selectedTab === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        className={cn("mt-4", className)}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };