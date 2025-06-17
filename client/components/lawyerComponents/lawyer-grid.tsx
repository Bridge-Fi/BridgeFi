"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Award } from "lucide-react";
import { Loader2 } from "lucide-react";
import { LawyerApi } from "@/app/api/LawyerApi";
import { BookingDialog } from "../BookingDialog";

interface Lawyer {
  id: number;
  fullName: string;
  firm: string;
  location: string;
  experience: number;
  rating: number;
  reviews: number;
  barNumber: string;
  specializations: string[];
  imageUrl?: string;
  consultationFee: number;
}

export function LawyerGrid() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await LawyerApi.getLawyers();
        if (data instanceof Error) {
          throw data;
        }
        // map your API’s shape into the grid’s props if needed
        setLawyers(
          data.map((l: any) => ({
            id: l.id,
            fullName: l.fullName,
            firm: l.firmName, // adjust to your API field
            location: `${l.city}, ${l.state}`,
            experience: l.yearsOfExperience,
            rating: l.averageRating,
            reviews: l.reviewCount,
            barNumber: l.barNumber,
            specializations: l.visaSpecialties,
            imageUrl: l.photoUrl, // or fallback avatar
            consultationFee: l.consultationFee,
          }))
        );
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lawyers.map((lawyer) => (
        <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <img
                src={lawyer.imageUrl ?? "/placeholder.svg"}
                alt={lawyer.fullName}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {lawyer.fullName}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {lawyer.firm}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">
                    {typeof lawyer.rating === "number"
                      ? lawyer.rating.toFixed(1)
                      : "—"}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    ({lawyer.reviews ?? 0})
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {lawyer.location}
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {lawyer.experience} years
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              Bar #: {lawyer.barNumber}
            </div>

            <div className="flex flex-wrap gap-1">
              {lawyer.specializations.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  Consultation
                </span>
                <span className="font-semibold">${lawyer.consultationFee}</span>
              </div>
              <BookingDialog lawyerId={lawyer.id}>
                <Button className="w-full">Contact Lawyer</Button>
              </BookingDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
