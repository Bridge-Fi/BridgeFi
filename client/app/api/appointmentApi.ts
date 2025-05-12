// pages/api/appointments.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${process.env.NEST_API_URL}/appointments`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.authorization || "",
    },
    body: req.body,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
