// import axios from "../axios";
// import { NextApiRequest, NextApiResponse } from "next";

// // export default async function RegisterHandler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   if (req.method === "POST") {
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:3001/users/register",
// //         req.body,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       res.status(response.status).json(response.data);
// //     } catch (error) {
// //       if (axios.isAxiosError(error)) {
// //         res.status(error.response?.status || 500).json(
// //           error.response?.data || {
// //             message: "An error occurred",
// //           }
// //         );
// //       } else {
// //         res.status(500).json({ message: "Unexpected error occurred" });
// //       }
// //     }
// //   } else {
// //     res.setHeader("Allow", ["POST"]);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }

// export const UsesAPI = {
//   async register(userData: any) {
//     const response = await axios.post(
//       "http://localhost:3001/users/register",
//       userData
//     );
//     return response;
//   },
// };
