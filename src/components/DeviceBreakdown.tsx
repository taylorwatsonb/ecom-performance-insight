
import React, { useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { useInViewAnimation } from '@/lib/animations';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DeviceBreakdownProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  className?: string;
}

const DeviceBreakdown: React.FC<DeviceBreakdownProps> = ({ data, className }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(chartRef);

  // Transform the data for Recharts
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index],
  }));

  // Get the colors from the dataset
  const COLORS = data.datasets[0].backgroundColor;

  // Define custom shapes for the legend
  const icons = {
    Mobile: <Smartphone className="h-4 w-4" />,
    Desktop: <Monitor className="h-4 w-4" />,
    Tablet: <Tablet className="h-4 w-4" />,
  };

  return (
    <div
      ref={chartRef}
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-xl font-medium tracking-tight">Device Breakdown</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Distribution of visitors by device type
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Percentage']}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeviceBreakdown;
