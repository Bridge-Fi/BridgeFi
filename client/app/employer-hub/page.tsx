"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/Pagination";

interface VisaJob {
  caseNumber: string;
  employerName: string;
  jobTitle: string;
  city: string;
  state: string;
  visaType: string;
  employerPhone: string;
  employerPocPhone: string;
  employerPocEmail: string;
}

export default function EmploymentHub() {
  const [jobs, setJobs] = useState<VisaJob[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("/api/visa-jobs", {
          params: { visa: "H1B", page },
        });
        setJobs(res.data.jobs);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    }
    fetchJobs();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Employer Hub - H1B Listings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.caseNumber}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <h3 className="text-lg font-semibold truncate">
                  {job.jobTitle}
                </h3>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Employer:</strong> {job.employerName}
                </p>
                <p>
                  <strong>Location:</strong> {job.city}, {job.state}
                </p>
                <p>
                  <strong>Case #:</strong> {job.caseNumber}
                </p>
                {job.employerPocPhone && (
                  <p>
                    <strong>Contact:</strong> {job.employerPocPhone}
                  </p>
                )}
                {job.employerPocEmail && (
                  <p>
                    <strong>Email:</strong> {job.employerPocEmail}
                  </p>
                )}
                <p className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {job.visaType}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {jobs.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No jobs available.</p>
        )}
      </main>

      {/* Pagination */}
      <div className="flex justify-center p-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
