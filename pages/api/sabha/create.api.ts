import { getSession } from "next-auth/react";
import prisma from "libs/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { Sabha } from "@prisma/client";

export default async function createSabha(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date, mandalId } = req.body as Sabha;

  const session = await getSession({ req });

  try {
    if (session) {
      const result = await prisma.sabha.create({
        data: {
          date,
          mandalId,
        },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
}
