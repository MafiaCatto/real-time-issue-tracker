import { getDashboardData } from '@/features/dashboard/services';
import LatestIssues from '@/features/issues/components/LatestIssues';
import StatusCard from '@/features/dashboard/components/StatusCard';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const { statusCounts, totalIssues, closureRate, latestIssues } = await getDashboardData();

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sapphire-400 to-cyan-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatusCard label="Total Issues" value={totalIssues} color="cyan" />
          <StatusCard label="Open Issues" value={statusCounts.OPEN} color="red" />
          <StatusCard label="In Progress" value={statusCounts.IN_PROGRESS} color="blue" />
          <StatusCard label="Closed Rate" value={`${closureRate}%`} color="green" />
        </div>

        <div className="mt-8">
          <LatestIssues issues={latestIssues} />
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/issues"
            className="text-sapphire-400 hover:text-sapphire-300 transition-colors text-lg font-medium group"
          >
            View All Issues
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">-&gt;</span>
          </Link>
        </div>
      </main>
    </>
  );
}
