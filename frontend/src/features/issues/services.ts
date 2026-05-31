import { Issue } from './types';
import { mockIssues } from './mocks';
import { API_BASE_URL, ApiResponse } from '@/lib/api';

type ApiIssue = Omit<Issue, 'id' | 'createdAt' | 'assignedTo'> & {
  id: number;
  createdAt: string;
  assignedTo?: number | null;
  assigned?: {
    name: string;
  } | null;
};

function toIssue(issue: ApiIssue): Issue {
  return {
    ...issue,
    id: String(issue.id),
    createdAt: new Date(issue.createdAt),
    assignedTo: issue.assigned?.name ?? undefined,
  };
}

export async function getLatestIssues(): Promise<Issue[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/issues`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return mockIssues;
    }

    const payload = (await response.json()) as ApiResponse<ApiIssue[]>;
    return payload.data.map(toIssue);
  } catch {
    return mockIssues;
  }
}

export async function getIssueById(id: string): Promise<Issue | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/issues/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return mockIssues.find((issue) => issue.id === id) ?? null;
    }

    const payload = (await response.json()) as ApiResponse<ApiIssue>;
    return toIssue(payload.data);
  } catch {
    return mockIssues.find((issue) => issue.id === id) ?? null;
  }
}
