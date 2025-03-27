
import React, { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { useInViewAnimation } from '@/lib/animations';

interface TimeComparisonProps {
  title: string;
  description?: string;
  data: {
    currentPeriod: { name: string; value: number }[];
    previousPeriod: { name: string; value: number }[];
  };
  className?: string;
}

const TimeComparison: React.FC<TimeComparisonProps> = ({ 
  title, 
  description, 
  data, 
  className 
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(chartRef);
  const [timespan, setTimespan] = useState<'week' | 'month' | 'quarter'>('week');

  // Transform data for the chart
  const chartData = data.currentPeriod.map((item, index) => ({
    name: item.name,
    Current: item.value,
    Previous: data.previousPeriod[index]?.value || 0,
  }));

  return (
    <div 
      ref={chartRef}
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-medium tracking-tight">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setTimespan('week')}
            className={cn(
              'px-3 py-1 text-xs rounded-full transition-colors',
              timespan === 'week' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            Week
          </button>
          <button 
            onClick={() => setTimespan('month')}
            className={cn(
              'px-3 py-1 text-xs rounded-full transition-colors',
              timespan === 'month' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            Month
          </button>
          <button 
            onClick={() => setTimespan('quarter')}
            className={cn(
              'px-3 py-1 text-xs rounded-full transition-colors',
              timespan === 'quarter' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            Quarter
          </button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="Current" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Previous" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeComparison;
