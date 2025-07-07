"use client";

import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter } from "lucide-react";

interface LawyerSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  locationTerm: string;
  onLocationChange: (value: string) => void;
  specTerm: string;
  onSpecChange: (value: string) => void;
}

export function LawyerSearch({
  searchTerm,
  onSearchChange,
  locationTerm,
  onLocationChange,
  specTerm,
  onSpecChange,
}: LawyerSearchProps) {
  return (
    <div className="bg-white rounded-lg border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Name or Firm */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lawyers by name or firm..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={locationTerm}
            onChange={(e) => onLocationChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Specialization */}
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search specialization..."
            value={specTerm}
            onChange={(e) => onSpecChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
