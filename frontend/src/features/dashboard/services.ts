import { getLatestIssues } from '@/features/issues/services';

export async function getDashboardData() {
  const issues = await getLatestIssues();

  const statusCounts = {
    OPEN: issues.filter((i) => i.status === 'OPEN').length,
    IN_PROGRESS: issues.filter((i) => i.status === 'IN_PROGRESS').length,
    CLOSED: issues.filter((i) => i.status === 'CLOSED').length,
  };
  const totalIssues = issues.length;
  const closureRate =
    totalIssues === 0 ? 0 : Math.round((statusCounts.CLOSED / totalIssues) * 100);

  const latestIssues = issues.slice(0, 6);

  return { statusCounts, totalIssues, closureRate, latestIssues };
}
