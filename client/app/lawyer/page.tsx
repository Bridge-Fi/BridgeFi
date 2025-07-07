"use client";

import { useState } from "react";
import { LawyerSearch } from "@/components/lawyerComponents/lawyer-search";
import { LawyerGrid } from "@/components/lawyerComponents/lawyer-grid";

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationTerm, setLocationTerm] = useState<string>("");
  const [specTerm, setSpecTerm] = useState<string>("");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Find Immigration Lawyers
        </h1>
        <p className="text-muted-foreground mt-2">
          Connect with vetted immigration attorneys who specialize in your case
          type.
        </p>
      </div>

      <LawyerSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        locationTerm={locationTerm}
        onLocationChange={setLocationTerm}
        specTerm={specTerm}
        onSpecChange={setSpecTerm}
      />

      <LawyerGrid
        searchTerm={searchTerm}
        locationTerm={locationTerm}
        specTerm={specTerm}
      />
    </div>
  );
}
