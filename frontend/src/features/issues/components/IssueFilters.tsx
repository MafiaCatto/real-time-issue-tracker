import Link from 'next/link';
import { getIssues, type IssueQueryFilters } from '../services';
import { IssueStatus, IssueType } from '../types';

const statuses: Array<{ label: string; value?: IssueStatus }> = [
  { label: 'All statuses' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const types: Array<{ label: string; value?: IssueType }> = [
  { label: 'All types' },
  { label: 'Bug', value: 'BUG' },
  { label: 'Feature', value: 'FEATURE' },
  { label: 'Task', value: 'TASK' },
];

function filterHref(filters: IssueQueryFilters) {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set('status', filters.status);
  }

  if (filters.type) {
    params.set('type', filters.type);
  }

  const query = params.toString();
  return query ? `/issues?${query}` : '/issues';
}

type IssueFiltersProps = {
  activeFilters: IssueQueryFilters;
};

export default async function IssueFilters({ activeFilters }: IssueFiltersProps) {
  const issues = await getIssues(activeFilters);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-sapphire-800/30 bg-gray-900/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{issues.length}</span> issues
        </p>
        {(activeFilters.status || activeFilters.type) && (
          <Link href="/issues" className="text-sm font-medium text-sapphire-300 hover:text-sapphire-200">
            Clear filters
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Link
            key={status.label}
            href={filterHref({ ...activeFilters, status: status.value })}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              activeFilters.status === status.value
                ? 'border-sapphire-400 bg-sapphire-500/20 text-white'
                : 'border-gray-700 text-gray-300 hover:border-sapphire-500 hover:text-white'
            }`}
          >
            {status.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <Link
            key={type.label}
            href={filterHref({ ...activeFilters, type: type.value })}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              activeFilters.type === type.value
                ? 'border-cyan-400 bg-cyan-500/20 text-white'
                : 'border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-white'
            }`}
          >
            {type.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
