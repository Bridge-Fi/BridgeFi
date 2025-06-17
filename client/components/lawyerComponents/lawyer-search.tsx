"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, X } from "lucide-react";

const specializations = [
  "H1B Visa",
  "EB-2 NIW",
  "EB-1 Extraordinary Ability",
  "Family-Based Immigration",
  "Asylum",
  "PERM Labor Certification",
  "Naturalization",
  "Deportation Defense",
];

const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "San Francisco, CA",
  "Boston, MA",
  "Seattle, WA",
  "Miami, FL",
];

export function LawyerSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  const addSpecialization = (spec: string) => {
    if (!selectedSpecializations.includes(spec)) {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const removeSpecialization = (spec: string) => {
    setSelectedSpecializations(
      selectedSpecializations.filter((s) => s !== spec)
    );
  };

  return (
    <div className="bg-white rounded-lg border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lawyers by name or firm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={addSpecialization}>
          <SelectTrigger>
            <SelectValue placeholder="Add specialization" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSpecializations.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSpecializations.map((spec) => (
            <Badge
              key={spec}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {spec}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeSpecialization(spec)}
              />
            </Badge>
          ))}
        </div>
      )}

      <Button className="w-full md:w-auto">
        <Search className="h-4 w-4 mr-2" />
        Search Lawyers
      </Button>
    </div>
  );
}
