import Link from "next/link";
import { ArrowRight, BarChart3, Users, Wallet, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">EventMetrics</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-slate-900/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-8">
              Measure the real{" "}
              <span className="text-blue-400">
                impact
              </span>{" "}
              of your events
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              The only platform that connects event success to blockchain metrics. 
              Track attendees, measure wallet creation, and optimize your outreach strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                  Start measuring impact
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-2 border-slate-600 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-slate-800">
                  <Play className="mr-2 w-5 h-5" />
                  View demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-slate-400 text-sm uppercase tracking-wider font-medium mb-8">
            Trusted by forward-thinking organizations
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-40">
            {["Company A", "Company B", "Company C", "Company D"].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-slate-500">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Everything you need to measure success
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From event creation to blockchain analytics, EventMetrics gives you 
              the complete picture of your outreach impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Event Management",
                description: "Create and manage in-person, virtual, and hybrid events with powerful tools designed for modern event planners.",
                bgColor: "bg-slate-800"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Get deep insights into attendee behavior, engagement metrics, and conversion rates across all your events.",
                bgColor: "bg-slate-800"
              },
              {
                icon: Wallet,
                title: "Blockchain Tracking",
                description: "Monitor wallet creation, transaction patterns, and long-term engagement of your event participants.",
                bgColor: "bg-slate-800"
              }
            ].map((feature, index) => (
              <Card key={index} className={`relative overflow-hidden border-0 ${feature.bgColor} hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1`}>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            The numbers speak for themselves
          </h2>
          <p className="text-xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            See how EventMetrics is transforming the way organizations measure and optimize their outreach efforts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "10,000+", label: "Events analyzed" },
              { number: "2.5M+", label: "Wallets tracked" },
              { number: "94%", label: "Improvement in ROI" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-lg text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight">
                Optimize your outreach strategy with data
              </h2>
              
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                EventMetrics was built specifically for organizations that want to measure 
                the real impact of their blockchain outreach efforts.
              </p>
              
              <div className="space-y-6">
                {[
                  "Identify which events generate the most wallet creation",
                  "Compare the efficiency of different event formats",
                  "Analyze cost per wallet to optimize budgets",
                  "Measure long-term engagement and retention"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-slate-300 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-3xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-700 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded-full w-1/2"></div>
                  <div className="h-32 bg-slate-700 rounded-xl"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-slate-700 rounded-lg"></div>
                    <div className="h-20 bg-slate-700 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight">
            Ready to measure your impact?
          </h2>
          
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join the organizations that are already using EventMetrics to optimize 
            their blockchain outreach and maximize their ROI.
          </p>
          
          <div className="flex justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                Start your free trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-slate-400 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-8 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">EventMetrics</span>
            </div>
            
            <div className="text-sm text-slate-400">
              © {new Date().getFullYear()} EventMetrics. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}