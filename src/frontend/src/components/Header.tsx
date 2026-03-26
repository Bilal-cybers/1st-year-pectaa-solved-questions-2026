import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Shield, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface HeaderProps {
  onNavigate: (page: Page, params?: Record<string, unknown>) => void;
  onSearch: (query: string) => void;
}

export function Header({ onNavigate, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-navy shadow-md"
      data-ocid="header.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            type="button"
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => onNavigate("year")}
            data-ocid="nav.home.link"
            aria-label="PECTAA Prep home"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange flex items-center justify-center shadow">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl tracking-tight hidden sm:block">
              PECTAA <span className="text-orange">Prep</span>
            </span>
          </button>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                type="search"
                placeholder="سوال تلاش کریں..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 h-8 w-52 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm focus-visible:ring-orange focus-visible:border-orange"
                data-ocid="header.search_input"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-8 bg-orange hover:bg-orange-dark text-white border-none text-xs px-3"
              data-ocid="header.search_submit.button"
            >
              Go
            </Button>
          </form>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 py-3 space-y-3">
          <button
            type="button"
            className="block text-white/80 hover:text-white text-sm font-medium py-1 w-full text-left"
            onClick={() => {
              onNavigate("year");
              setMobileOpen(false);
            }}
            data-ocid="nav.home.mobile.link"
          >
            🏠 ہوم — Home
          </button>
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setMobileOpen(false);
            }}
            className="flex gap-2 pt-1"
          >
            <Input
              type="search"
              placeholder="سوال تلاش کریں..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
              data-ocid="header.mobile_search_input"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-orange hover:bg-orange-dark text-white border-none"
              data-ocid="header.mobile_search.button"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
