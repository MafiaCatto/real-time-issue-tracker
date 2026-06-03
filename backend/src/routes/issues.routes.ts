// Routes with dependency injection
import { Router } from "express";
import { IssueController } from "../controllers/issues.controller";
import { IssueService } from "../services/issues.service";
import { IssueRepository } from "../repositories/issue.repository";
import prisma from "../prisma";
import {
  validateCreateIssue,
  validateIssueFilters,
  validateIssueId,
  validateUpdateIssue,
} from "../middlewares/issue-validation.middleware";

// Dependency injection setup
const issueRepository = new IssueRepository(prisma);
const issueService = new IssueService(issueRepository);
const issueController = new IssueController(issueService);

const router = Router();

router.get("/", validateIssueFilters, issueController.getAllIssues);
router.get("/:id", validateIssueId, issueController.getIssueById);
router.post("/", validateCreateIssue, issueController.createIssue);
router.put("/:id", validateIssueId, validateUpdateIssue, issueController.updateIssue);
router.delete("/:id", validateIssueId, issueController.deleteIssue);

export default router;

