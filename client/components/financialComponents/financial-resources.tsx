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

export function FinancialResources() {
  return (
    <div className="space-y-8">
      {/* Banking Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Banking Services</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Banks that welcome international clients
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chase Bank */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Chase Bank</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.chase.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Offers accounts for new immigrants with ITIN.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  No minimum balance
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Online banking
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Mobile app
                </Badge>
              </div>
            </div>
            {/* Bank of America */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Bank of America</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.bankofamerica.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                International student and professional accounts.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Credit building
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  International transfers
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Multiple locations
                </Badge>
              </div>
            </div>
            {/* Capital One */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Capital One</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.capitalone.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Credit cards for building U.S. credit history.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  No foreign transaction fees
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Credit monitoring
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Rewards program
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Transfer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Money Transfer</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Affordable remittance services
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Wise */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Wise (TransferWise)</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://wise.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Low-cost international money transfers.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Real exchange rates
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Low fees
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Fast transfers
                </Badge>
              </div>
            </div>
            {/* Remitly */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Remitly</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.remitly.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Digital remittance service.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Mobile app
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Multiple payout options
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Competitive rates
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Building */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Credit Building</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Build your U.S. credit history
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Secured Credit Cards */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Secured Credit Cards</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.experian.com/blogs/ask-experian/what-are-secured-credit-cards/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Build credit with a security deposit.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  No credit history required
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Graduate to unsecured
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Credit reporting
                </Badge>
              </div>
            </div>
            {/* Credit Monitoring */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Credit Monitoring</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.annualcreditreport.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Track your credit score progress.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Free credit scores
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Identity monitoring
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Credit alerts
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education Funding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education Funding</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Scholarships and education loans
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* International Student Loans */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">International Student Loans</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.internationalstudentloan.com/international_student"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Private loans for international students.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  No cosigner required
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Competitive rates
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Flexible repayment
                </Badge>
              </div>
            </div>
            {/* Scholarship Database */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">Scholarship Database</h4>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.internationalscholarships.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Scholarships for international students.
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Merit-based
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Need-based
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Country-specific
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
