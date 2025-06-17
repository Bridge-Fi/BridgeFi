import { LawyerSearch } from "@/components/lawyerComponents/lawyer-search";
import { LawyerGrid } from "@/components/lawyerComponents/lawyer-grid";

export default function LawyersPage() {
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

      <LawyerSearch />
      <LawyerGrid />
    </div>
  );
}
