
// Performance metrics based on Core Web Vitals
export type PerformanceMetric = {
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
};

export const performanceMetrics: PerformanceMetric[] = [
  {
    name: 'LCP',
    value: 2.8,
    unit: 's',
    target: 2.5,
    status: 'needs-improvement',
    description: 'Largest Contentful Paint measures loading performance.',
  },
  {
    name: 'FID',
    value: 95,
    unit: 'ms',
    target: 100,
    status: 'good',
    description: 'First Input Delay measures interactivity.',
  },
  {
    name: 'CLS',
    value: 0.12,
    unit: '',
    target: 0.1,
    status: 'needs-improvement',
    description: 'Cumulative Layout Shift measures visual stability.',
  },
  {
    name: 'TTI',
    value: 3.2,
    unit: 's',
    target: 3.8,
    status: 'good',
    description: 'Time to Interactive measures when the page becomes fully interactive.',
  },
];

// Historical performance data for charts
export const historicalData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'LCP (seconds)',
      data: [3.8, 3.5, 3.2, 3.0, 2.9, 2.8],
    },
    {
      label: 'FID (milliseconds)',
      data: [150, 130, 120, 110, 100, 95],
    },
    {
      label: 'CLS',
      data: [0.25, 0.22, 0.18, 0.15, 0.13, 0.12],
    },
  ],
};

// Optimization recommendations
export type OptimizationRecommendation = {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  metrics: string[];
};

export const optimizationRecommendations: OptimizationRecommendation[] = [
  {
    id: 'img-opt',
    title: 'Image Optimization',
    description: 'Optimize and properly size images to reduce load times. Convert to modern formats like WebP.',
    impact: 'high',
    effort: 'medium',
    metrics: ['LCP', 'Page Load Time'],
  },
  {
    id: 'code-split',
    title: 'Code Splitting',
    description: 'Implement code splitting to reduce JavaScript bundle size and improve initial load time.',
    impact: 'high',
    effort: 'medium',
    metrics: ['LCP', 'TTI', 'FID'],
  },
  {
    id: 'cdn-usage',
    title: 'CDN Implementation',
    description: 'Utilize a CDN to serve static assets closer to users and reduce server load.',
    impact: 'medium',
    effort: 'low',
    metrics: ['LCP', 'Page Load Time'],
  },
  {
    id: 'font-opt',
    title: 'Font Optimization',
    description: 'Use font-display: swap and preload critical fonts to prevent layout shifts.',
    impact: 'medium',
    effort: 'low',
    metrics: ['CLS', 'User Experience'],
  },
  {
    id: 'lazy-load',
    title: 'Implement Lazy Loading',
    description: 'Lazy load below-the-fold images and non-critical resources.',
    impact: 'medium',
    effort: 'low',
    metrics: ['LCP', 'Page Load Time'],
  },
];

// Business impact projections
export type BusinessImpact = {
  metric: string;
  current: number;
  projected: number;
  unit: string;
  improvement: number;
};

export const businessImpacts: BusinessImpact[] = [
  {
    metric: 'Conversion Rate',
    current: 2.4,
    projected: 3.1,
    unit: '%',
    improvement: 29,
  },
  {
    metric: 'Bounce Rate',
    current: 45,
    projected: 36,
    unit: '%',
    improvement: 20,
  },
  {
    metric: 'Average Session Duration',
    current: 2.5,
    projected: 3.2,
    unit: 'minutes',
    improvement: 28,
  },
  {
    metric: 'Pages per Session',
    current: 3.2,
    projected: 4.1,
    unit: '',
    improvement: 28,
  },
];

// Device breakdown
export const deviceData = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  datasets: [
    {
      data: [65, 30, 5],
      backgroundColor: ['rgba(66, 153, 225, 0.8)', 'rgba(72, 187, 120, 0.8)', 'rgba(237, 137, 54, 0.8)'],
    },
  ],
};

// Time comparison data
export const timeComparisonData = {
  currentPeriod: [
    { name: 'LCP', value: 2.8 },
    { name: 'FID', value: 95 },
    { name: 'CLS', value: 0.12 },
    { name: 'TTI', value: 3.2 },
  ],
  previousPeriod: [
    { name: 'LCP', value: 3.5 },
    { name: 'FID', value: 130 },
    { name: 'CLS', value: 0.18 },
    { name: 'TTI', value: 3.8 },
  ],
};

// Filter options for the dashboard
export const filterOptions = {
  dateRanges: [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Year to date', value: 'ytd' },
    { label: 'Custom range', value: 'custom' },
  ],
  devices: [
    { label: 'All devices', value: 'all' },
    { label: 'Desktop', value: 'desktop' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Tablet', value: 'tablet' },
  ],
  pages: [
    { label: 'All pages', value: 'all' },
    { label: 'Homepage', value: 'home' },
    { label: 'Product pages', value: 'products' },
    { label: 'Category pages', value: 'categories' },
    { label: 'Checkout', value: 'checkout' },
  ],
};
