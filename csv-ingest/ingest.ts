import fs from "fs";
import csv from "csv-parser";
import { DataSource } from "typeorm";
import { VisaJob } from "../server/src/visa-jobs/entities/visa-job.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "BRIDGEFI",
  entities: [VisaJob],
  synchronize: true,
  logging: false,
});

async function main() {
  const BATCH_SIZE = 5000;
  let batch: VisaJob[] = [];
  let totalCount = 0;

  // Initialize DB
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (err) {
    console.error("DB init error:", err);
    process.exit(1);
  }
  const repo = AppDataSource.getRepository(VisaJob);

  // Read CSV stream
  const stream = fs.createReadStream("output.csv").pipe(csv());

  stream.on("data", async (row) => {
    totalCount++;
    // Map fields
    const job = repo.create({
      caseNumber: row["CASE_NUMBER"]?.trim() || null,
      employerName: row["EMPLOYER_NAME"]?.trim() || null,
      jobTitle: row["JOB_TITLE"]?.trim() || null,
      city: row["EMPLOYER_CITY"]?.trim() || row["WORK_CITY"]?.trim() || null,
      state: row["EMPLOYER_STATE"]?.trim() || row["WORK_STATE"]?.trim() || null,
      visaType: row["VISA_CLASS"]?.trim() || row["VISA_TYPE"]?.trim() || null,
      employerPhone: row["EMPLOYER_PHONE"]?.trim() || null,
      employerPocPhone: row["EMPLOYER_POC_PHONE"]?.trim() || null,
      employerPocEmail: row["EMPLOYER_POC_EMAIL"]?.trim() || null,
    });

    batch.push(job);
    if (batch.length >= BATCH_SIZE) {
      stream.pause();
      try {
        await repo.save(batch);
        console.log(
          `Saved batch of ${batch.length} jobs (processed ${totalCount})`
        );
      } catch (saveErr) {
        console.error("Error saving batch:", saveErr);
      }
      batch = [];
      stream.resume();
    }
  });

  stream.on("end", async () => {
    // Save remaining
    if (batch.length) {
      try {
        await repo.save(batch);
        console.log(`Saved final batch of ${batch.length} jobs`);
      } catch (saveErr) {
        console.error("Error saving final batch:", saveErr);
      }
    }
    console.log(`CSV ingestion complete. Total rows processed: ${totalCount}`);
    await AppDataSource.destroy();
    process.exit(0);
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
    process.exit(1);
  });
}

main();
