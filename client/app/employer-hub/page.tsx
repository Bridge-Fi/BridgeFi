"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { EmployerSearch } from "@/components/employer-search";
import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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

export default function EmployersPage() {
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
    <div className="container py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employer Hub</h1>
          <p className="text-muted-foreground mt-2">
            Find employers offering visa sponsorship or post your job openings.
          </p>
        </div>
      </div>

      <EmployerSearch />

      {/* JOB GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {jobs.map((job) => (
          <Card
            key={job.caseNumber}
            className="flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <h3 className="text-lg font-semibold truncate">{job.jobTitle}</h3>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <p>
                <strong>Employer:</strong> {job.employerName}
              </p>
              {(job.city || job.state) && (
                <p>
                  <strong>Location:</strong> {job.city}, {job.state}
                </p>
              )}
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
              <div className="mt-auto pt-4">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {job.visaType}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No jobs available.</p>
      )}

      {/* PAGINATION */}
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
