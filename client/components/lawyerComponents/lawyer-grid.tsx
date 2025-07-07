"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Award, Loader2 } from "lucide-react";
import { LawyerApi } from "@/app/api/LawyerApi";
import { BookingDialog } from "../BookingDialog";

interface RawLawyer {
  id: number;
  fullName?: string;
  firmName?: string;
  location?: string;
  yearsOfExperience?: number;
  averageRating?: number;
  reviewCount?: number;
  barNumber?: string;
  visaSpecialties?: string[];
  imageUrl?: string;
  consultationFee?: number;
}

interface LawyerGridProps {
  searchTerm: string;
  locationTerm: string;
  specTerm: string;
}

export function LawyerGrid({
  searchTerm,
  locationTerm,
  specTerm,
}: LawyerGridProps) {
  const [lawyers, setLawyers] = useState<RawLawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await LawyerApi.getLawyers();
        if (data instanceof Error) throw data;

        // Debug: Log the entire response
        console.log("Full API response:", data);

        // Debug: Check if imageUrl field exists in the first lawyer
        if (data.length > 0) {
          console.log("First lawyer object:", data[0]);
          console.log("imageUrl field:", data[0].imageUrl);
        }

        setLawyers(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load lawyers.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (error) {
    return <div className="w-full text-center text-red-500 py-20">{error}</div>;
  }

  // apply three filters with safe defaults
  const filtered = lawyers.filter((l) => {
    const nameLower = (l.fullName ?? "").toLowerCase();
    const firmLower = (l.firmName ?? "").toLowerCase();
    const locLower = (l.location ?? "").toLowerCase();
    const specsLower = (l.visaSpecialties ?? []).map((s) =>
      (s ?? "").toLowerCase()
    );

    const matchesNameOrFirm =
      nameLower.includes(searchTerm.toLowerCase()) ||
      firmLower.includes(searchTerm.toLowerCase());

    const matchesLocation = locLower.includes(locationTerm.toLowerCase());

    const matchesSpec = specsLower.some((s) =>
      s.includes(specTerm.toLowerCase())
    );

    return matchesNameOrFirm && matchesLocation && matchesSpec;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((l) => (
        <Card key={l.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <img
                src={l.imageUrl ?? "/placeholder.svg"}
                alt={l.fullName}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{l.fullName}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {l.firmName}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">
                    {typeof l.averageRating === "number"
                      ? l.averageRating.toFixed(1)
                      : "—"}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({l.reviewCount ?? 0})
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {l.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {l.yearsOfExperience} years
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              Bar #: {l.barNumber}
            </div>
            <div className="flex flex-wrap gap-1">
              {(l.visaSpecialties ?? []).map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
            <div className="pt-2 border-t">
              <BookingDialog lawyerId={l.id}>
                <Button className="w-full">Contact Lawyer</Button>
              </BookingDialog>
            </div>
          </CardContent>
        </Card>
      ))}

      {filtered.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground">
          No lawyers found matching your criteria.
        </p>
      )}
    </div>
  );
}
