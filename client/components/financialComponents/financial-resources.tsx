import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  CreditCard,
  Building,
  GraduationCap,
  Send,
} from "lucide-react";

const resourceCategories = [
  {
    title: "Banking Services",
    icon: Building,
    description: "Banks that welcome international clients",
    resources: [
      {
        name: "Chase Bank",
        description: "Offers accounts for new immigrants with ITIN",
        features: ["No minimum balance", "Online banking", "Mobile app"],
        link: "#",
      },
      {
        name: "Bank of America",
        description: "International student and professional accounts",
        features: [
          "Credit building",
          "International transfers",
          "Multiple locations",
        ],
        link: "#",
      },
      {
        name: "Capital One",
        description: "Credit cards for building U.S. credit history",
        features: [
          "No foreign transaction fees",
          "Credit monitoring",
          "Rewards program",
        ],
        link: "#",
      },
    ],
  },
  {
    title: "Money Transfer",
    icon: Send,
    description: "Affordable remittance services",
    resources: [
      {
        name: "Wise (formerly TransferWise)",
        description: "Low-cost international money transfers",
        features: ["Real exchange rates", "Low fees", "Fast transfers"],
        link: "#",
      },
      {
        name: "Remitly",
        description: "Digital remittance service",
        features: [
          "Mobile app",
          "Multiple payout options",
          "Competitive rates",
        ],
        link: "#",
      },
    ],
  },
  {
    title: "Credit Building",
    icon: CreditCard,
    description: "Build your U.S. credit history",
    resources: [
      {
        name: "Secured Credit Cards",
        description: "Build credit with a security deposit",
        features: [
          "No credit history required",
          "Graduate to unsecured",
          "Credit reporting",
        ],
        link: "#",
      },
      {
        name: "Credit Monitoring",
        description: "Track your credit score progress",
        features: [
          "Free credit scores",
          "Identity monitoring",
          "Credit alerts",
        ],
        link: "#",
      },
    ],
  },
  {
    title: "Education Funding",
    icon: GraduationCap,
    description: "Scholarships and education loans",
    resources: [
      {
        name: "International Student Loans",
        description: "Private loans for international students",
        features: [
          "No cosigner required",
          "Competitive rates",
          "Flexible repayment",
        ],
        link: "#",
      },
      {
        name: "Scholarship Database",
        description: "Scholarships for international students",
        features: ["Merit-based", "Need-based", "Country-specific"],
        link: "#",
      },
    ],
  },
];

export function FinancialResources() {
  return (
    <div className="space-y-8">
      {resourceCategories.map((category) => (
        <Card key={category.title}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <category.icon className="h-5 w-5" />
              <span>{category.title}</span>
            </CardTitle>
            <p className="text-muted-foreground">{category.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {category.resources.map((resource) => (
                <div key={resource.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{resource.name}</h4>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {resource.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
