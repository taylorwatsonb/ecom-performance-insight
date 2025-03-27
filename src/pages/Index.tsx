
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Dashboard />
      </main>
      <footer className="py-6 md:py-8 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} EcomPerform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
