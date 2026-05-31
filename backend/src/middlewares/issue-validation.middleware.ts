import { NextFunction, Request, Response } from "express";
import { IssueStatus, IssueType } from "@prisma/client";
import { ValidationError } from "../utils/errors";

const issueTypes = new Set<string>(Object.values(IssueType));
const issueStatuses = new Set<string>(Object.values(IssueStatus));

function requireObjectBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Request body must be a JSON object");
  }

  return body as Record<string, unknown>;
}

function validateOptionalText(
  value: unknown,
  field: string,
  maxLength: number
): void {
  if (value === undefined) {
    return;
  }

  if (typeof value !== "string") {
    throw new ValidationError(`${field} must be a string`);
  }

  if (value.trim().length > maxLength) {
    throw new ValidationError(`${field} must be ${maxLength} characters or less`);
  }
}

function validateRequiredText(
  value: unknown,
  field: string,
  maxLength: number
): void {
  validateOptionalText(value, field, maxLength);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(`${field} is required`);
  }
}

function validateOptionalIssueType(value: unknown): void {
  if (value === undefined) {
    return;
  }

  if (typeof value !== "string" || !issueTypes.has(value)) {
    throw new ValidationError(
      `type must be one of: ${Array.from(issueTypes).join(", ")}`
    );
  }
}

function validateOptionalStatus(value: unknown): void {
  if (value === undefined) {
    return;
  }

  if (typeof value !== "string" || !issueStatuses.has(value)) {
    throw new ValidationError(
      `status must be one of: ${Array.from(issueStatuses).join(", ")}`
    );
  }
}

function validateOptionalAssignee(value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new ValidationError("assignedTo must be a positive integer");
  }
}

export function validateIssueId(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError("Issue id must be a positive integer");
  }

  next();
}

export function validateCreateIssue(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const body = requireObjectBody(req.body);

  validateRequiredText(body.title, "title", 120);
  validateOptionalText(body.description, "description", 2000);
  validateRequiredText(body.type, "type", 40);
  validateOptionalIssueType(body.type);
  validateOptionalStatus(body.status);
  validateOptionalAssignee(body.assignedTo);

  next();
}

export function validateUpdateIssue(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const body = requireObjectBody(req.body);

  if (Object.keys(body).length === 0) {
    throw new ValidationError("At least one issue field must be provided");
  }

  validateOptionalText(body.title, "title", 120);
  if (typeof body.title === "string" && body.title.trim().length === 0) {
    throw new ValidationError("title cannot be empty");
  }

  validateOptionalText(body.description, "description", 2000);
  validateOptionalIssueType(body.type);
  validateOptionalStatus(body.status);
  validateOptionalAssignee(body.assignedTo);

  next();
}
