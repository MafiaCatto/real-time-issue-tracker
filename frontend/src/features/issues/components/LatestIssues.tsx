import { Issue } from '../types';
import IssueCard from './IssueCard';
import Card from '@/components/Card';

interface LatestIssuesProps {
  issues: Issue[];
}

export default function LatestIssues({ issues }: LatestIssuesProps) {
  return (
    <Card title="Latest Issues">
      {issues.length === 0 ? (
        <div className="rounded-xl border border-sapphire-800/30 bg-gray-950/40 p-6 text-center">
          <p className="font-medium text-white">No recent issues</p>
          <p className="mt-2 text-sm text-gray-400">
            New issues will appear here after they are created.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issues.slice(0, 6).map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </Card>
  );
}
