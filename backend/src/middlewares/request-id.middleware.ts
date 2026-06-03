import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

export function requestId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const incomingRequestId = req.header("x-request-id");
  const id = incomingRequestId?.trim() || randomUUID();

  res.setHeader("x-request-id", id);
  next();
}
