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
import { Search, MapPin, Briefcase, X } from "lucide-react";

const visaTypes = ["H1B", "L1", "O-1", "TN", "E-2", "EB-2", "EB-3"];

const jobTypes = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Research Scientist",
  "Marketing Manager",
  "Financial Analyst",
  "Consultant",
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Remote",
];

export function EmployerSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVisaTypes, setSelectedVisaTypes] = useState<string[]>([]);
  const [selectedJobType, setSelectedJobType] = useState("");

  const addVisaType = (visa: string) => {
    if (!selectedVisaTypes.includes(visa)) {
      setSelectedVisaTypes([...selectedVisaTypes, visa]);
    }
  };

  const removeVisaType = (visa: string) => {
    setSelectedVisaTypes(selectedVisaTypes.filter((v) => v !== visa));
  };

  return (
    <div className="bg-white rounded-lg border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedJobType} onValueChange={setSelectedJobType}>
          <SelectTrigger>
            <Briefcase className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={addVisaType}>
          <SelectTrigger>
            <SelectValue placeholder="Visa type" />
          </SelectTrigger>
          <SelectContent>
            {visaTypes.map((visa) => (
              <SelectItem key={visa} value={visa}>
                {visa}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedVisaTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedVisaTypes.map((visa) => (
            <Badge
              key={visa}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {visa}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeVisaType(visa)}
              />
            </Badge>
          ))}
        </div>
      )}

      <Button className="w-full md:w-auto">
        <Search className="h-4 w-4 mr-2" />
        Search Jobs
      </Button>
    </div>
  );
}
