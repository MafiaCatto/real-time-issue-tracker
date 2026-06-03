import IssueTable from '@/features/issues/components/IssueTable';
import IssueFilters from '@/features/issues/components/IssueFilters';
import { getIssues } from '@/features/issues/services';
import { IssueStatus, IssueType } from '@/features/issues/types';
import Navigation from '@/components/Navigation';

type IssuesPageProps = {
  searchParams: Promise<{
    status?: string;
    type?: string;
  }>;
};

const statuses: IssueStatus[] = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
const types: IssueType[] = ['BUG', 'FEATURE', 'TASK'];

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const params = await searchParams;
  const filters = {
    ...(params.status && statuses.includes(params.status as IssueStatus) && {
      status: params.status as IssueStatus,
    }),
    ...(params.type && types.includes(params.type as IssueType) && {
      type: params.type as IssueType,
    }),
  };
  const issues = await getIssues(filters);

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sapphire-400 to-cyan-400 bg-clip-text text-transparent">
            All Issues
          </h1>
          <p className="text-gray-400 text-lg">
            View and manage all reported issues
          </p>
        </div>

        <IssueFilters activeFilters={filters} />
        <IssueTable issues={issues} />
      </main>
    </>
  );
}
