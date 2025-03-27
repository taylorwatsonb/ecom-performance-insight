
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Layers, Zap, BarChart3, Code, Workflow } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Dashboard />
        
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">Optimization Techniques</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Implementing these proven optimization strategies can significantly improve your e-commerce performance metrics and drive business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-2">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Lazy Loading</CardTitle>
                <CardDescription>
                  Defer loading non-critical resources until they're needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implement lazy loading for images and below-the-fold content to reduce initial page load time by up to 30%, improving LCP metrics.
                </p>
                <p className="text-xs text-primary-foreground/70 mt-2 font-medium">
                  Technologies: Intersection Observer API, React.lazy(), react-lazyload
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Resource Compression</CardTitle>
                <CardDescription>
                  Minify and compress scripts, stylesheets, and images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implementing GZIP compression and image optimization can reduce asset sizes by up to 70%, directly reducing load times and improving conversion rates by 12-18%.
                </p>
                <p className="text-xs text-primary-foreground/70 mt-2 font-medium">
                  Technologies: Brotli, Webpack bundle analyzer, imagemin, WebP format
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-2">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Code Splitting</CardTitle>
                <CardDescription>
                  Break down large bundles into smaller chunks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implementing code splitting can reduce your JavaScript payload by up to 50%, dramatically improving First Input Delay (FID) and Time to Interactive (TTI) with potential conversion rate increases of 5-9%.
                </p>
                <p className="text-xs text-primary-foreground/70 mt-2 font-medium">
                  Technologies: Dynamic imports, React.lazy, Webpack SplitChunksPlugin
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-16 bg-muted/40">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">Next Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuous performance optimization is an ongoing process. Here are recommended next steps to further enhance your e-commerce site.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Implement Real User Monitoring (RUM)</h3>
                  <p className="text-muted-foreground">
                    Collect actual user experience data to identify performance bottlenecks across different device types, network conditions, and geographic locations.
                  </p>
                  <p className="text-sm text-primary-foreground/70 mt-2">
                    <span className="font-medium">Expected Impact:</span> 15-25% improvement in performance metrics by identifying real-world bottlenecks.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">A/B Testing Performance Improvements</h3>
                  <p className="text-muted-foreground">
                    Quantify the business impact of specific performance optimizations through controlled experiments, measuring conversion rates, revenue per user, and other key business metrics.
                  </p>
                  <p className="text-sm text-primary-foreground/70 mt-2">
                    <span className="font-medium">Expected Impact:</span> 10-20% increase in ROI from optimization efforts by focusing on highest-impact changes.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Performance Budgeting</h3>
                  <p className="text-muted-foreground">
                    Establish and enforce performance budgets to maintain optimal performance as new features are developed, ensuring business metrics remain optimized.
                  </p>
                  <p className="text-sm text-primary-foreground/70 mt-2">
                    <span className="font-medium">Expected Impact:</span> Prevention of 30% potential performance regression, maintaining conversion rate gains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:py-8 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} EcomPerform. All rights reserved. Created by Taylor Watson.
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Built with React, TypeScript, TailwindCSS, shadcn/ui, Recharts and Tanstack Query
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
