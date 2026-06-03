// Controller with dependency injection and proper error handling
import { Request, Response } from "express";
import { IssueStatus, IssueType } from "@prisma/client";
import { IIssueService } from "../interfaces/IIssueService";
import { ResponseFormatter } from "../utils/response";
import { asyncHandler } from "../middlewares/error.middleware";
import { IssueListFiltersDto } from "../dtos/issue.dto";

export class IssueController {
  constructor(private readonly issueService: IIssueService) {}

  getAllIssues = asyncHandler(async (req: Request, res: Response) => {
    const filters: IssueListFiltersDto = {};

    if (typeof req.query.status === "string") {
      filters.status = req.query.status as IssueStatus;
    }

    if (typeof req.query.type === "string") {
      filters.type = req.query.type as IssueType;
    }

    const issues = await this.issueService.getAllIssues(filters);
    res.status(200).json(ResponseFormatter.success(issues));
  });

  getIssueById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const issue = await this.issueService.getIssueById(id);
    res.status(200).json(ResponseFormatter.success(issue));
  });

  createIssue = asyncHandler(async (req: Request, res: Response) => {
    const issue = await this.issueService.createIssue(req.body);
    res.status(201).json(ResponseFormatter.success(issue, "Issue created successfully"));
  });

  updateIssue = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const issue = await this.issueService.updateIssue(id, req.body);
    res.status(200).json(ResponseFormatter.success(issue, "Issue updated successfully"));
  });

  deleteIssue = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.issueService.deleteIssue(id);
    res.status(200).json(ResponseFormatter.success(null, "Issue deleted successfully"));
  });
}

