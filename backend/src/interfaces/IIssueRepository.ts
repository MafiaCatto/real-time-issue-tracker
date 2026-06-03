// Repository interface - abstraction for data access
import { Issue } from "@prisma/client";
import { CreateIssueDto, IssueListFiltersDto, UpdateIssueDto } from "../dtos/issue.dto";

export type IssueWithAssigned = Issue & {
  assigned: {
    id: number;
    name: string;
    email: string;
  } | null;
};

export interface IIssueRepository {
  findAll(filters?: IssueListFiltersDto): Promise<IssueWithAssigned[]>;
  findById(id: number): Promise<IssueWithAssigned | null>;
  create(data: CreateIssueDto): Promise<IssueWithAssigned>;
  update(id: number, data: UpdateIssueDto): Promise<IssueWithAssigned>;
  delete(id: number): Promise<void>;
}
