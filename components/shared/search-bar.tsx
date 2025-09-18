import React from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
  value?: string;
  buttonText?: string;
  showButton?: boolean;
  rounded?: "none" | "small" | "medium" | "large" | "full";
}

export function SearchBar({
  onSearch,
  className,
  placeholder = "Search...",
  value,
  buttonText = "Search",
  showButton = true,
  rounded = "medium",
  ...props
}: SearchBarProps) {
  const [query, setQuery] = React.useState(value || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
    if (!showButton) {
      handleSearch(newValue);
    }
  };

  const handleSearch = (searchQuery = query) => {
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const roundedClasses = {
    none: "rounded-none",
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "flex items-center",
        showButton ? "w-full" : "relative w-full",
        className
      )}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-4 py-2 text-text bg-input border border-element focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
            showButton ? roundedClasses[rounded] + " rounded-r-none" : roundedClasses[rounded]
          )}
          {...props}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary">
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
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      {showButton && (
        <button
          type="button"
          onClick={() => handleSearch()}
          className={cn(
            "px-4 py-2 bg-primary text-text hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            roundedClasses[rounded] + " rounded-l-none"
          )}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}