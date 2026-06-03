import { Issue } from './types';
import { mockIssues } from './mocks';
import { API_BASE_URL, ApiResponse } from '@/lib/api';

export type IssueQueryFilters = {
  status?: Issue['status'];
  type?: Issue['type'];
};

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

function buildIssueUrl(filters: IssueQueryFilters = {}) {
  const url = new URL(`${API_BASE_URL}/api/issues`);

  if (filters.status) {
    url.searchParams.set('status', filters.status);
  }

  if (filters.type) {
    url.searchParams.set('type', filters.type);
  }

  return url;
}

function filterMocks(filters: IssueQueryFilters = {}) {
  return mockIssues.filter((issue) => {
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesType = !filters.type || issue.type === filters.type;

    return matchesStatus && matchesType;
  });
}

export async function getIssues(filters: IssueQueryFilters = {}): Promise<Issue[]> {
  try {
    const response = await fetch(buildIssueUrl(filters), {
      cache: 'no-store',
    });

    if (!response.ok) {
      return filterMocks(filters);
    }

    const payload = (await response.json()) as ApiResponse<ApiIssue[]>;
    return payload.data.map(toIssue);
  } catch {
    return filterMocks(filters);
  }
}

export async function getLatestIssues(): Promise<Issue[]> {
  return getIssues();
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
