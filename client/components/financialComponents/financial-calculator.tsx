"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export function FinancialCalculator() {
  const [visaType, setVisaType] = useState("");
  const [lawyerFees, setLawyerFees] = useState("");
  const [governmentFees, setGovernmentFees] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const visaCosts = {
    H1B: { government: 1440, typical_lawyer: 3000 },
    "EB-2": { government: 1140, typical_lawyer: 5000 },
    "EB-1": { government: 1140, typical_lawyer: 7000 },
    "Family-Based": { government: 1760, typical_lawyer: 3500 },
  };

  const handleVisaTypeChange = (type: string) => {
    setVisaType(type);
    if (visaCosts[type as keyof typeof visaCosts]) {
      const costs = visaCosts[type as keyof typeof visaCosts];
      setGovernmentFees(costs.government.toString());
      setLawyerFees(costs.typical_lawyer.toString());
    }
  };

  const calculateTotal = () => {
    const lawyer = Number.parseFloat(lawyerFees) || 0;
    const government = Number.parseFloat(governmentFees) || 0;
    const other = Number.parseFloat(otherCosts) || 0;
    setTotalCost(lawyer + government + other);
  };

  return (
    <Card className="top-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Cost Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="visa-type">Visa Type</Label>
          <Select value={visaType} onValueChange={handleVisaTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select visa type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="H1B">H1B Visa</SelectItem>
              <SelectItem value="EB-2">EB-2 (NIW/PERM)</SelectItem>
              <SelectItem value="EB-1">EB-1 Extraordinary Ability</SelectItem>
              <SelectItem value="Family-Based">Family-Based</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="government-fees">Government Fees ($)</Label>
          <Input
            id="government-fees"
            type="number"
            value={governmentFees}
            onChange={(e) => setGovernmentFees(e.target.value)}
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="lawyer-fees">Lawyer Fees ($)</Label>
          <Input
            id="lawyer-fees"
            type="number"
            value={lawyerFees}
            onChange={(e) => setLawyerFees(e.target.value)}
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="other-costs">Other Costs ($)</Label>
          <Input
            id="other-costs"
            type="number"
            value={otherCosts}
            onChange={(e) => setOtherCosts(e.target.value)}
            placeholder="Translation, medical exams, etc."
          />
        </div>

        <Button onClick={calculateTotal} className="w-full">
          Calculate Total
        </Button>

        {totalCost > 0 && (
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Estimated Total Cost
            </p>
            <p className="text-2xl font-bold text-primary">
              ${totalCost.toLocaleString()}
            </p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>
            * Costs are estimates and may vary based on individual
            circumstances.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
