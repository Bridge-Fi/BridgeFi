import { FinancialResources } from "@/components/financialComponents/financial-resources";
import { FinancialCalculator } from "@/components/financialComponents/financial-calculator";

export default function FinancialPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Resources
        </h1>
        <p className="text-muted-foreground mt-2">
          Navigate the financial aspects of your immigration journey with
          confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FinancialResources />
        </div>
        <div>
          <FinancialCalculator />
        </div>
      </div>
    </div>
  );
}
