import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProjectMetricsChart = ({ metrics }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Maintain a reference to the chart instance

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the existing chart instance
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Projects', 'Pending Projects', 'Completed Projects', 'Active Clients'],
          datasets: [{
            label: 'Metrics',
            data: [metrics.totalProjects, metrics.pendingProjects, metrics.completedProjects, metrics.activeClients],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [metrics]);

  return <canvas ref={chartRef}></canvas>;
};

export default ProjectMetricsChart;
