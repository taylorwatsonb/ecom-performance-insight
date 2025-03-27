
import { PerformanceMetric, BusinessImpact } from '@/lib/data';

// API endpoint for PageSpeed Insights
const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// This would typically be stored in a server environment variable
// For demo purposes using a public API key with restricted usage
const API_KEY = 'AIzaSyAM7FZkSKPSZC2Bk4W5rIf88xQRQKCYUC0'; // This is a restricted demo key

export interface PageSpeedResponse {
  lighthouseResult: {
    audits: {
      [key: string]: {
        title: string;
        description: string;
        score: number;
        numericValue?: number;
        displayValue?: string;
      };
    };
    categories: {
      performance: {
        score: number;
      };
    };
  };
  loadingExperience: {
    metrics: {
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: {
        percentile: number;
        distributions: Array<{ min: number; max: number; proportion: number }>;
        category: string;
      };
      LARGEST_CONTENTFUL_PAINT_MS?: {
        percentile: number;
        distributions: Array<{ min: number; max: number; proportion: number }>;
        category: string;
      };
      FIRST_INPUT_DELAY_MS?: {
        percentile: number;
        distributions: Array<{ min: number; max: number; proportion: number }>;
        category: string;
      };
    };
    overall_category: string;
  };
}

export async function runPageSpeedAnalysis(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<PageSpeedResponse> {
  try {
    const params = new URLSearchParams({
      url,
      strategy,
      category: 'performance',
      key: API_KEY,
    });

    const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error running PageSpeed analysis:', error);
    throw error;
  }
}

export function mapPageSpeedToMetrics(data: PageSpeedResponse): PerformanceMetric[] {
  const metrics: PerformanceMetric[] = [];
  
  // LCP - Largest Contentful Paint
  if (data.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS) {
    const lcpValue = data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000;
    metrics.push({
      name: 'LCP',
      value: parseFloat(lcpValue.toFixed(1)),
      unit: 's',
      target: 2.5,
      status: lcpValue <= 2.5 ? 'good' : lcpValue <= 4.0 ? 'needs-improvement' : 'poor',
      description: 'Largest Contentful Paint measures loading performance.',
    });
  } else if (data.lighthouseResult?.audits?.['largest-contentful-paint']) {
    const lcpAudit = data.lighthouseResult.audits['largest-contentful-paint'];
    const lcpValue = lcpAudit.numericValue ? lcpAudit.numericValue / 1000 : 0;
    metrics.push({
      name: 'LCP',
      value: parseFloat(lcpValue.toFixed(1)),
      unit: 's',
      target: 2.5,
      status: lcpValue <= 2.5 ? 'good' : lcpValue <= 4.0 ? 'needs-improvement' : 'poor',
      description: 'Largest Contentful Paint measures loading performance.',
    });
  }
  
  // FID - First Input Delay
  if (data.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS) {
    const fidValue = data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile;
    metrics.push({
      name: 'FID',
      value: Math.round(fidValue),
      unit: 'ms',
      target: 100,
      status: fidValue <= 100 ? 'good' : fidValue <= 300 ? 'needs-improvement' : 'poor',
      description: 'First Input Delay measures interactivity.',
    });
  } else if (data.lighthouseResult?.audits?.['max-potential-fid']) {
    const fidAudit = data.lighthouseResult.audits['max-potential-fid'];
    const fidValue = fidAudit.numericValue || 0;
    metrics.push({
      name: 'FID',
      value: Math.round(fidValue),
      unit: 'ms',
      target: 100,
      status: fidValue <= 100 ? 'good' : fidValue <= 300 ? 'needs-improvement' : 'poor',
      description: 'First Input Delay measures interactivity.',
    });
  }
  
  // CLS - Cumulative Layout Shift
  if (data.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE) {
    const clsValue = data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100;
    metrics.push({
      name: 'CLS',
      value: parseFloat(clsValue.toFixed(2)),
      unit: '',
      target: 0.1,
      status: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
      description: 'Cumulative Layout Shift measures visual stability.',
    });
  } else if (data.lighthouseResult?.audits?.['cumulative-layout-shift']) {
    const clsAudit = data.lighthouseResult.audits['cumulative-layout-shift'];
    const clsValue = clsAudit.numericValue || 0;
    metrics.push({
      name: 'CLS',
      value: parseFloat(clsValue.toFixed(2)),
      unit: '',
      target: 0.1,
      status: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
      description: 'Cumulative Layout Shift measures visual stability.',
    });
  }
  
  // TTI - Time to Interactive
  if (data.lighthouseResult?.audits?.['interactive']) {
    const ttiAudit = data.lighthouseResult.audits['interactive'];
    const ttiValue = ttiAudit.numericValue ? ttiAudit.numericValue / 1000 : 0;
    metrics.push({
      name: 'TTI',
      value: parseFloat(ttiValue.toFixed(1)),
      unit: 's',
      target: 3.8,
      status: ttiValue <= 3.8 ? 'good' : ttiValue <= 7.3 ? 'needs-improvement' : 'poor',
      description: 'Time to Interactive measures when the page becomes fully interactive.',
    });
  }
  
  return metrics;
}

export function generateHistoricalData(pageSpeedData: PageSpeedResponse) {
  // In a real app, we would fetch historical data from a database
  // For demo purposes, we'll generate mock historical data based on the current metrics
  
  const currentLCP = pageSpeedData.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue || 3000;
  const currentFID = pageSpeedData.lighthouseResult?.audits?.['max-potential-fid']?.numericValue || 100;
  const currentCLS = pageSpeedData.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue || 0.15;
  
  // Generate some random variations for historical data
  const generateHistoricalPoint = (current: number, variance: number) => {
    const historyPoints = [];
    let value = current * 1.3; // Start worse than current
    
    for (let i = 0; i < 6; i++) {
      value = value - (Math.random() * variance);
      historyPoints.push(value);
    }
    
    return historyPoints;
  };
  
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'LCP (seconds)',
        data: generateHistoricalPoint(currentLCP / 1000, 0.2).map(v => parseFloat(v.toFixed(1))),
      },
      {
        label: 'FID (milliseconds)',
        data: generateHistoricalPoint(currentFID, 10).map(v => Math.round(v)),
      },
      {
        label: 'CLS',
        data: generateHistoricalPoint(currentCLS, 0.02).map(v => parseFloat(v.toFixed(2))),
      },
    ],
  };
}

export function generateBusinessImpacts(metrics: PerformanceMetric[]): BusinessImpact[] {
  // Calculate potential business impacts based on current metrics
  // Using industry averages and research data on how performance affects conversion rates
  
  const lcpMetric = metrics.find(m => m.name === 'LCP');
  const clsMetric = metrics.find(m => m.name === 'CLS');
  
  // Base conversion rate (example)
  let baseConversionRate = 2.4;
  
  // Estimated improvement if metrics reach 'good' threshold
  let conversionImprovement = 0;
  let bounceRateImprovement = 0;
  
  if (lcpMetric) {
    if (lcpMetric.status === 'poor') {
      conversionImprovement += 25;
      bounceRateImprovement += 15;
    } else if (lcpMetric.status === 'needs-improvement') {
      conversionImprovement += 15;
      bounceRateImprovement += 10;
    }
  }
  
  if (clsMetric) {
    if (clsMetric.status === 'poor') {
      conversionImprovement += 10;
      bounceRateImprovement += 15;
    } else if (clsMetric.status === 'needs-improvement') {
      conversionImprovement += 5;
      bounceRateImprovement += 5;
    }
  }
  
  // Ensure we have some minimum values for demo purposes
  conversionImprovement = Math.max(conversionImprovement, 10);
  bounceRateImprovement = Math.max(bounceRateImprovement, 10);
  
  return [
    {
      metric: 'Conversion Rate',
      current: baseConversionRate,
      projected: parseFloat((baseConversionRate * (1 + conversionImprovement / 100)).toFixed(1)),
      unit: '%',
      improvement: conversionImprovement,
    },
    {
      metric: 'Bounce Rate',
      current: 45,
      projected: Math.round(45 * (1 - bounceRateImprovement / 100)),
      unit: '%',
      improvement: bounceRateImprovement,
    },
    {
      metric: 'Average Session Duration',
      current: 2.5,
      projected: parseFloat((2.5 * (1 + conversionImprovement / 200)).toFixed(1)),
      unit: 'minutes',
      improvement: Math.round(conversionImprovement / 2),
    },
    {
      metric: 'Pages per Session',
      current: 3.2,
      projected: parseFloat((3.2 * (1 + conversionImprovement / 200)).toFixed(1)),
      unit: '',
      improvement: Math.round(conversionImprovement / 2),
    },
  ];
}
