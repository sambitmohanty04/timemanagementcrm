import { useState } from "react";

import AnalyticsHeader, {
  type AnalyticsRange,
} from "../components/analytics/AnalyticsHeader";

import AnalyticsStats from "../components/analytics/AnalyticsStats";
import ProductivityChart from "../components/analytics/ProductivityChart";
import TimeDistributionChart from "../components/analytics/TimeDistributionChart";
import ProjectAnalytics from "../components/analytics/ProjectAnalytics";
import TaskAnalytics from "../components/analytics/TaskAnalytics";
import FocusAnalytics from "../components/analytics/FocusAnalytics";
import ProductivityInsights from "../components/analytics/ProductivityInsights";

import {
  ANALYTICS_STATS,
  PRODUCTIVITY_DATA,
  TIME_DISTRIBUTION,
  PROJECT_ANALYTICS,
  TASK_ANALYTICS,
  FOCUS_ANALYTICS,
} from "../data/analytics";

const Analytics = () => {
  const [range, setRange] =
    useState<AnalyticsRange>("week");

  const handleExport = () => {
    console.log(
      `Exporting analytics for: ${range}`
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        onExport={handleExport}
      />

      {/* Statistics */}
      <AnalyticsStats
        focusTime={ANALYTICS_STATS.focusTime}
        tasksCompleted={
          ANALYTICS_STATS.tasksCompleted
        }
        productivity={
          ANALYTICS_STATS.productivity
        }
        sessions={ANALYTICS_STATS.sessions}
      />

      {/* Productivity */}
      <ProductivityChart
        data={PRODUCTIVITY_DATA}
      />

      {/* Tasks + Time */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskAnalytics
          data={TASK_ANALYTICS}
        />

        <TimeDistributionChart
          data={TIME_DISTRIBUTION}
        />
      </div>

      {/* Focus Analytics */}
      <FocusAnalytics
        data={FOCUS_ANALYTICS}
      />

      {/* Projects */}
      <ProjectAnalytics
        projects={PROJECT_ANALYTICS}
      />

      {/* Insights */}
      <ProductivityInsights />

    </div>
  );
};

export default Analytics;