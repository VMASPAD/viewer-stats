'use client'
import { ValueLineBarChart } from '@/components/ui/value-line-bar-chart'
import React, { useEffect } from 'react'

function StatsRepository({params}: {params: Promise<{user: string, repository: string}>}) {
  const [chartData, setChartData] = React.useState<{ month: string; desktop: number }[]>([]);
  const [dailyStats, setDailyStats] = React.useState<{ total: number; percentChange: number; isPositive: boolean }>({ total: 0, percentChange: 0, isPositive: true });
  const [resolvedParams, setResolvedParams] = React.useState<{user: string, repository: string} | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
      console.log(resolved.repository, resolved.user);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9512';
      const response = await fetch(`${apiUrl}/data?repository=${resolvedParams.user}/${resolvedParams.repository}&color=000000`);
      const data = await response.json();

      // Expect data.metrics to be an array of objects: { date: number, value: number }
      const metrics: { date: number; value: number }[] = Array.isArray(data.metrics) ? data.metrics : [];

      if (metrics.length === 0) {
        setChartData([]);
        setDailyStats({ total: 0, percentChange: 0, isPositive: true });
        return;
      }

      // Sort metrics by date ascending
      metrics.sort((a, b) => a.date - b.date);

      // Get the total from the last metric (since each metric.value is cumulative)
      const totalViews = metrics[metrics.length - 1]?.value || 0;

      const FIFTEEN_MIN_MS = 15 * 60 * 1000;

      // Aggregate metrics where consecutive entries are closer than 15 minutes
      const aggregated: { date: number; value: number }[] = [];

      for (const m of metrics) {
        if (aggregated.length === 0) {
          aggregated.push({ date: m.date, value: 1 }); // Count each aggregated bucket as 1 visit
          continue;
        }

        const last = aggregated[aggregated.length - 1];
        // If this metric is within 15 minutes of the last aggregated point, keep the same bucket
        if (m.date - last.date <= FIFTEEN_MIN_MS) {
          last.value += 1; // Increment visit count for this time window
          // keep the earliest date (last.date)
        } else {
          // otherwise start a new aggregated bucket
          aggregated.push({ date: m.date, value: 1 });
        }
      }

      // Group aggregated data by day to calculate daily totals
      const dailyTotals = new Map<string, number>();
      aggregated.forEach(a => {
        const dateKey = new Date(a.date).toDateString();
        dailyTotals.set(dateKey, (dailyTotals.get(dateKey) || 0) + a.value);
      });

      // Calculate percentage change vs previous day
      const sortedDays = Array.from(dailyTotals.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
      const today = sortedDays[sortedDays.length - 1];
      const yesterday = sortedDays[sortedDays.length - 2];
      
      let percentChange = 0;
      let isPositive = true;
      
      if (yesterday && today) {
        const [, todayTotal] = today;
        const [, yesterdayTotal] = yesterday;
        if (yesterdayTotal > 0) {
          percentChange = ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
          isPositive = percentChange >= 0;
        }
      }

      // Map aggregated data into chart shape: month label + desktop value
      const chart = aggregated.map((a) => {
        const d = new Date(a.date);
        // Format as 'MM/DD HH:MM' for better readability
        const month = `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        return { month, desktop: a.value };
      });

      console.log('metrics processed:', { totalViews, aggregated, dailyTotals: Array.from(dailyTotals.entries()), percentChange });
      
      setChartData(chart);
      setDailyStats({ total: totalViews, percentChange: Math.abs(percentChange), isPositive });
    };
    fetchData();
  }, [resolvedParams]);

  return (
    <div className='container p-4 mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        Stats for {resolvedParams ? `${resolvedParams.user}/${resolvedParams.repository}` : 'Loading...'}
      </h1>
      <ValueLineBarChart 
        chartData={chartData} 
        totalViews={dailyStats.total}
        percentChange={dailyStats.percentChange}
        isPositive={dailyStats.isPositive}
      />
    </div>
  )
}

export default StatsRepository
