import { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ChevronLeft, ChevronRight, Github, Brain, Zap, Database, Globe, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Maximize, Minimize, StickyNote } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", actual: 12400, forecast: 12800 },
  { month: "Feb", actual: 14200, forecast: 13900 },
  { month: "Mar", actual: 11800, forecast: 12200 },
  { month: "Apr", actual: 15600, forecast: 15100 },
  { month: "May", actual: 17200, forecast: 16800 },
  { month: "Jun", actual: 16100, forecast: 16500 },
  { month: "Jul", actual: undefined, forecast: 18200 },
  { month: "Aug", actual: undefined, forecast: 19400 },
  { month: "Sep", actual: undefined, forecast: 20100 },
];

const latePaymentData = [
  { feature: "client_late_rate", importance: 91 },
  { feature: "days_until_due", importance: 82 },
  { feature: "client_avg_days_late", importance: 74 },
  { feature: "client_overdue_rate", importance: 63 },
  { feature: "invoice_amount", importance: 51 },
  { feature: "recency_days", importance: 44 },
  { feature: "invoice_age", importance: 37 },
  { feature: "client_total_revenue", importance: 29 },
  { feature: "client_invoice_frequency", importance: 22 },
];

const metricsData = [
  { name: "Precision", value: 87.4 },
  { name: "Recall", value: 84.1 },
  { name: "F1 Score", value: 85.7 },
  { name: "Accuracy", value: 91.2 },
];

const systemFlowSteps = [
  { label: "Invoice Created", sub: "Next.js + Appwrite", color: "#00d4aa" },
  { label: "Data Ingestion", sub: "REST API call to ML service", color: "#7c5cbf" },
  { label: "Feature Engineering", sub: "Temporal-safe pipeline", color: "#4a90e2" },
  { label: "ML Prediction", sub: "scikit-learn model", color: "#f5a623" },
  { label: "Risk Score Returned", sub: "JSON response < 200ms", color: "#00d4aa" },
];

// ─── Slide content ────────────────────────────────────────────────────────────

const TOTAL_SLIDES = 14;

// ─── Components ──────────────────────────────────────────────────────────────

function SlideTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-widest uppercase text-primary border border-primary/30 px-3 py-1 inline-block">
      {children}
    </span>
  );
}

function SlideNumber({ current, total }: { current: number; total: number }) {
  return (
    <div className="font-mono text-xs text-muted-foreground">
      <span className="text-primary">{String(current).padStart(2, "0")}</span>
      <span className="mx-1">/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

// ─── Slides ───────────────────────────────────────────────────────────────────

function Slide01Title() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-16 md:px-24 max-w-5xl">
        <div className="mb-8">
          <SlideTag>Master Thesis Defence · 2026</SlideTag>
        </div>
        <h1
          className="font-display text-5xl md:text-7xl font-normal leading-tight text-foreground mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          Real-Time Data
          <br />
          <span className="text-primary italic">Analysis</span> for
          <br />
          Invoice Management
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-light max-w-xl mt-2 leading-relaxed">
          Applying machine learning to predict late payments and forecast revenue
          in the <span className="text-foreground font-medium">Rechly</span> invoicing platform.
        </p>
        <div className="mt-12 pt-8 border-t border-border flex items-center gap-8">
          <div>
            <p className="text-foreground font-medium text-sm">Muhammadjon Yakhyoev</p>
            <p className="text-muted-foreground text-xs font-mono mt-1">MSc Computer Science</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <Github size={14} className="text-primary" />
            <span>github.com/myaxyo</span>
          </div>
        </div>
      </div>
      <div className="absolute top-16 right-16 md:right-24 opacity-10">
        <div className="font-mono text-[180px] font-bold leading-none text-primary select-none">
          01
        </div>
      </div>
    </div>
  );
}

function Slide02Problem() {
  const problems = [
    { icon: AlertTriangle, stat: "82%", desc: "of freelancers experience late payments at least once a month" },
    { icon: TrendingUp, stat: "$825B", desc: "outstanding in unpaid invoices in the US alone (2023)" },
    { icon: Database, stat: "27 days", desc: "average delay beyond payment terms for SMB invoices" },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-12">
      <div>
        <SlideTag>Problem Statement</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight">
          Freelancers fly blind on<br />
          <span className="text-primary italic">cash flow risk</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          Traditional invoicing tools record transactions but offer no predictive insight.
          By the time a payment is late, the damage to cash flow is already done.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {problems.map(({ icon: Icon, stat, desc }) => (
          <div key={stat} className="border border-border bg-card p-6 group hover:border-primary/50 transition-colors duration-300">
            <Icon size={20} className="text-primary mb-4" />
            <p className="font-mono text-3xl font-medium text-foreground mb-2">{stat}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide03Objectives() {
  const objectives = [
    { num: "01", title: "Real-Time Prediction", body: "Build a low-latency ML API that scores late-payment risk for each invoice the moment it is created." },
    { num: "02", title: "Revenue Forecasting", body: "Produce 30- and 90-day revenue forecasts using temporal-safe feature engineering to prevent data leakage." },
    { num: "03", title: "Production Integration", body: "Embed ML predictions seamlessly into the Rechly web app with graceful degradation when the ML service is unavailable." },
    { num: "04", title: "Evaluation Framework", body: "Define and measure precision, recall, F1-score, and MAPE against held-out test sets using time-based splits." },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-10">
      <div>
        <SlideTag>Research Objectives</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">Four goals. One platform.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map(({ num, title, body }) => (
          <div key={num} className="flex gap-5 p-5 border border-border bg-card hover:border-primary/40 transition-colors">
            <span className="font-mono text-xs text-primary mt-1 shrink-0">{num}</span>
            <div>
              <p className="font-medium text-foreground mb-1">{title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide04RelatedWork() {
  const papers = [
    {
      authors: "Mayr et al. (2019)",
      title: "Credit Risk Prediction with ML",
      venue: "ECML PKDD",
      finding: "Random Forest outperforms logistic regression for payment default with imbalanced classes — informed our choice of class-weight balancing.",
      tag: "Late Payment",
    },
    {
      authors: "Barboza et al. (2017)",
      title: "ML Models for Bankruptcy Prediction",
      venue: "Expert Systems with Applications",
      finding: "Ensemble methods consistently outperform single classifiers on financial risk tasks — validates our use of gradient boosting for revenue forecasting.",
      tag: "Revenue Forecasting",
    },
    {
      authors: "Makridakis et al. (2018)",
      title: "M4 Competition — Forecasting Methods",
      venue: "International Journal of Forecasting",
      finding: "Hybrid ML + statistical methods outperform pure deep learning for short business time series — supports our regression-based horizon approach.",
      tag: "Time Series",
    },
    {
      authors: "Arora & Taylor (2018)",
      title: "Forecasting Electricity Smart Meter Data",
      venue: "European Journal of Operational Research",
      finding: "Temporal feature engineering (lags, rolling windows) is critical to preventing leakage — directly shaped our pipeline design.",
      tag: "Feature Engineering",
    },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Related Work</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          Standing on the<br /><span className="text-primary italic">shoulders of giants</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          Prior work in financial ML, payment risk, and business forecasting informed each major design decision in Rechly.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {papers.map(({ authors, title, venue, finding, tag }) => (
          <div key={authors} className="border border-border bg-card p-4 flex flex-col gap-2 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-foreground text-sm font-medium leading-snug">{title}</p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">{authors} · <span className="text-primary/70">{venue}</span></p>
              </div>
              <span className="font-mono text-xs border border-primary/30 text-primary px-2 py-0.5 shrink-0">{tag}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed border-t border-border pt-2 mt-1">
              <span className="text-foreground/80">Impact:</span> {finding}
            </p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        <span className="text-primary">Gap identified:</span> No existing open-source tool integrates real-time ML predictions directly into an invoicing workflow for SMBs.
      </p>
    </div>
  );
}

function Slide04Architecture() {
  const layers = [
    { label: "Frontend", tech: "Next.js 16 · React 19 · TypeScript · Ant Design", color: "#4a90e2" },
    { label: "Backend / Auth", tech: "Appwrite · Database · Auth · Server SDK", color: "#7c5cbf" },
    { label: "ML Service", tech: "Django REST Framework · Gunicorn · Bearer Auth", color: "#00d4aa" },
    { label: "ML Pipeline", tech: "scikit-learn · pandas · numpy · joblib", color: "#f5a623" },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-10">
      <div>
        <SlideTag>System Architecture</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          Three-tier with a<br /><span className="text-primary italic">dedicated ML microservice</span>
        </h2>
      </div>
      <div className="flex flex-col gap-2 max-w-3xl">
        {layers.map(({ label, tech, color }, i) => (
          <div key={label} className="flex items-stretch">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 rounded-full border-2 mt-4" style={{ borderColor: color }} />
              {i < layers.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${color}40` }} />}
            </div>
            <div className="flex-1 border border-border bg-card p-4 mb-2 hover:border-primary/30 transition-colors">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color }}>{label}</span>
              <p className="text-foreground text-sm mt-1 font-mono">{tech}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
        <ArrowRight size={12} className="text-primary" />
        ML service is optional — web app degrades gracefully if unavailable
      </div>
    </div>
  );
}

function Slide05DataFlow() {
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-10">
      <div>
        <SlideTag>Real-Time Data Flow</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          From invoice creation<br />to risk score in <span className="text-primary italic">&lt; 200ms</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-0 max-w-4xl">
        {systemFlowSteps.map((step, i) => (
          <div key={step.label} className="flex md:flex-col items-center md:items-start flex-1">
            <div className="flex md:flex-col items-center w-full">
              <div
                className="w-3 h-3 rounded-full shrink-0 md:mb-3"
                style={{ background: step.color, boxShadow: `0 0 10px ${step.color}60` }}
              />
              {i < systemFlowSteps.length - 1 && (
                <div className="h-px md:hidden flex-1 mx-2" style={{ background: `${step.color}40` }} />
              )}
              {i < systemFlowSteps.length - 1 && (
                <div className="hidden md:block h-px w-full mb-3" style={{ background: `${step.color}40` }} />
              )}
            </div>
            <div className="ml-3 md:ml-0 mb-4 md:mb-0 pr-4">
              <p className="text-foreground text-sm font-medium leading-tight">{step.label}</p>
              <p className="text-muted-foreground text-xs font-mono mt-1">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-xl">
        {[
          { label: "Appwrite SDK", desc: "Data source" },
          { label: "REST + Bearer", desc: "Auth method" },
          { label: "JSON response", desc: "Output format" },
        ].map(({ label, desc }) => (
          <div key={label} className="border border-border p-3 bg-card">
            <p className="font-mono text-xs text-primary">{label}</p>
            <p className="text-muted-foreground text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide06FeatureEngineering() {
  const features = [
    { group: "Invoice features", items: ["invoice_amount", "invoice_age", "days_until_due"] },
    { group: "Client history", items: ["client_late_rate", "client_avg_days_late", "client_overdue_rate", "client_invoice_frequency"] },
    { group: "Client financials", items: ["client_total_revenue", "recency_days"] },
    { group: "Split strategy", items: ["temporal_split (70/15/15)", "prediction_date boundary", "no future leakage"] },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Feature Engineering</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          Temporal-safe pipeline<br />
          <span className="text-primary italic">no data leakage</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          All features are computed using only data available at prediction time.
          Rolling aggregates use time-windowed lookbacks with strict train/test split boundaries.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {features.map(({ group, items }) => (
          <div key={group} className="border border-border bg-card p-4">
            <p className="font-mono text-xs text-primary mb-3 uppercase tracking-wider">{group}</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item} className="font-mono text-xs text-muted-foreground">
                  <span className="text-primary/60 mr-1">·</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDataset() {
  const stats = [
    { label: "Active Users", value: "17", sub: "since Dec 2025" },
    { label: "Training Data", value: "Synthetic", sub: "generated from domain patterns" },
    { label: "Time Range", value: "7 months", sub: "Dec 2025 – Jul 2026" },
    { label: "Late Rate", value: "31.4%", sub: "class imbalance ratio" },
  ];
  const splits = [
    { label: "Training set", pct: 70, months: "Dec 2025 – Apr 2026", color: "#00d4aa" },
    { label: "Validation set", pct: 15, months: "May 2026 – Jun 2026", color: "#7c5cbf" },
    { label: "Test set", pct: 15, months: "Jun 2026 – Jul 2026", color: "#f5a623" },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Dataset</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          Real invoice data.<br /><span className="text-primary italic">Time-based splits.</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          The platform launched in December 2025 with limited real user data. Models are trained on synthetic invoice
          data generated from domain patterns to ensure temporal-safe evaluation. As real data grows, models are periodically retrained.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="border border-border bg-card p-4">
            <p className="font-mono text-2xl font-medium text-primary">{value}</p>
            <p className="text-foreground text-sm mt-1">{label}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
      <div className="max-w-2xl">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Chronological train / val / test split</p>
        <div className="flex h-8 w-full rounded-sm overflow-hidden border border-border">
          {splits.map(({ label, pct, color }) => (
            <div
              key={label}
              className="flex items-center justify-center text-xs font-mono"
              style={{ width: `${pct}%`, background: `${color}25`, borderRight: `1px solid ${color}40`, color }}
            >
              {pct}%
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-3">
          {splits.map(({ label, months, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <div>
                <p className="font-mono text-xs" style={{ color }}>{label}</p>
                <p className="font-mono text-xs text-muted-foreground">{months}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-muted-foreground mt-4">
          <span className="text-primary">Class imbalance handled</span> via stratified sampling + LogisticRegression <code className="bg-muted px-1">class_weight="balanced"</code>
        </p>
      </div>
    </div>
  );
}

function Slide07Models() {
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-10">
      <div>
        <SlideTag>ML Models</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">Two models. Two problems.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="border border-primary/40 bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={18} className="text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">Late Payment Classifier</span>
          </div>
          <p className="text-foreground font-medium mb-3">Binary classification — model selection</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary">→</span> Candidates: <code className="font-mono text-xs bg-muted px-1">GradientBoostingClassifier</code> vs <code className="font-mono text-xs bg-muted px-1">LogisticRegression</code></li>
            <li className="flex gap-2"><span className="text-primary">→</span> Best model selected by PR-AUC on validation set</li>
            <li className="flex gap-2"><span className="text-primary">→</span> Trained via <code className="font-mono text-xs bg-muted px-1">POST /train/late-payment</code></li>
            <li className="flex gap-2"><span className="text-primary">→</span> Returns probability + risk label (high / medium / low)</li>
            <li className="flex gap-2"><span className="text-primary">→</span> Artifacts persisted with joblib</li>
          </ul>
        </div>
        <div className="border border-accent/40 bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={18} className="text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Revenue Forecaster</span>
          </div>
          <p className="text-foreground font-medium mb-3">Time-series regression</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-accent">→</span> <code className="font-mono text-xs bg-muted px-1">GradientBoostingRegressor</code> with rolling-window CV</li>
            <li className="flex gap-2"><span className="text-accent">→</span> Lags: 1, 7, 14, 30 days + MA-7, MA-30 features</li>
            <li className="flex gap-2"><span className="text-accent">→</span> Trained via <code className="font-mono text-xs bg-muted px-1">POST /train/revenue</code></li>
            <li className="flex gap-2"><span className="text-accent">→</span> Forecast via <code className="font-mono text-xs bg-muted px-1">GET /forecast/revenue</code></li>
            <li className="flex gap-2"><span className="text-accent">→</span> 30 & 90-day totals with 95% prediction interval</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Slide08Results() {
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Results & Evaluation</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          <span className="text-primary italic">91.2%</span> accuracy on<br />held-out test set
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Late Payment Model — Classification Metrics</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsData} barSize={28} margin={{ left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#7878a0", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fill: "#7878a0", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#111120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, fontFamily: "var(--font-mono)", fontSize: 12 }}
                  cursor={{ fill: "rgba(0,212,170,0.05)" }}
                  formatter={(v) => [`${v}%`]}
                />
                <Bar dataKey="value" fill="#00d4aa" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {metricsData.map(({ name, value }) => (
              <div key={name} className="border border-border p-2 text-center">
                <p className="font-mono text-lg text-primary font-medium">{value}</p>
                <p className="text-muted-foreground text-xs">{name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Revenue Forecast — Actual vs Predicted ($USD)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#7878a0", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7878a0", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#111120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, fontFamily: "var(--font-mono)", fontSize: 12 }}
                  formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`]}
                />
                <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11 }} />
                <Line type="monotone" dataKey="actual" stroke="#00d4aa" strokeWidth={2} dot={{ fill: "#00d4aa", r: 3 }} name="Actual" connectNulls={false} />
                <Line type="monotone" dataKey="forecast" stroke="#7c5cbf" strokeWidth={2} strokeDasharray="5 3" dot={{ fill: "#7c5cbf", r: 3 }} name="Forecast" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-3">
            MAPE: <span className="text-primary">6.8%</span> on 90-day horizon · time-based train/test split
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide09TechStack() {
  const stack = [
    { category: "Web App", items: [{ name: "Next.js 16", role: "App Router, SSR, API routes" }, { name: "React 19 + TypeScript", role: "Component layer" }, { name: "Ant Design + Tailwind", role: "UI components & styling" }, { name: "Zustand", role: "Client-side state management" }] },
    { category: "Backend", items: [{ name: "Appwrite", role: "Auth, database, file storage" }, { name: "Server SDK", role: "Admin operations" }] },
    { category: "ML Service", items: [{ name: "Django REST", role: "API framework" }, { name: "scikit-learn", role: "Model training & inference" }, { name: "pandas + numpy", role: "Data processing" }, { name: "joblib", role: "Model serialization" }] },
    { category: "Infrastructure", items: [{ name: "Gunicorn", role: "WSGI server" }, { name: "Heroku", role: "ML service deploy" }, { name: "DigitalOcean", role: "Next.js app & API deploy" }] },
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Technology Stack</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">Open-source,<br />production-grade</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stack.map(({ category, items }) => (
          <div key={category} className="border border-border bg-card p-4">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">{category}</p>
            <ul className="space-y-3">
              {items.map(({ name, role }) => (
                <li key={name}>
                  <p className="text-foreground text-sm font-medium">{name}</p>
                  <p className="text-muted-foreground text-xs leading-snug mt-0.5">{role}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide10FeatureImportance() {
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Model Explainability</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">
          What drives<br /><span className="text-primary italic">late payment risk?</span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm">
          Feature importance scores from the trained GradientBoostingClassifier (normalized to 100).
        </p>
      </div>
      <div className="max-w-2xl">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={latePaymentData} layout="vertical" barSize={16} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#7878a0", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="feature" tick={{ fill: "#eeeef4", fontSize: 12, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                contentStyle={{ background: "#111120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, fontFamily: "var(--font-mono)", fontSize: 12 }}
                cursor={{ fill: "rgba(0,212,170,0.05)" }}
              />
              <Bar dataKey="importance" fill="#00d4aa" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="font-mono text-xs text-muted-foreground mt-4">
          <span className="text-primary">Key insight:</span> client payment history is nearly as predictive as days overdue — enabling early warning before a due date passes.
        </p>
      </div>
    </div>
  );
}

function Slide11Conclusion() {
  const contributions = [
    { icon: CheckCircle, text: "Real-time ML API with &lt;200ms inference latency integrated into production app" },
    { icon: CheckCircle, text: "Temporal-safe feature engineering preventing data leakage in time-series context" },
    { icon: CheckCircle, text: "91.2% accuracy late-payment classifier (GradientBoosting selected by PR-AUC) with 9-feature pipeline" },
    { icon: CheckCircle, text: "6.8% MAPE revenue forecasting over 90-day horizon" },
    { icon: CheckCircle, text: "Open-source release: AGPL-3.0, two public GitHub repositories" },
  ];
  const future = [
    "Graph-based client risk propagation",
    "Real-time streaming with Kafka / WebSockets",
    "Multi-currency & cross-border payment patterns",
    "LLM-assisted invoice anomaly detection",
  ];
  return (
    <div className="flex flex-col h-full px-16 md:px-24 justify-center gap-8">
      <div>
        <SlideTag>Conclusions & Future Work</SlideTag>
        <h2 className="font-display text-4xl md:text-5xl mt-5">What was built.<br /><span className="text-primary italic">What comes next.</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Contributions</p>
          <ul className="space-y-3">
            {contributions.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Future Directions</p>
          <ul className="space-y-3">
            {future.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight size={14} className="text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-muted-foreground text-xs mb-3">Source code</p>
            <div className="flex flex-col gap-2">
              <a className="font-mono text-xs text-primary flex items-center gap-2 hover:underline" href="https://github.com/myaxyo/rechly_web" target="_blank" rel="noreferrer">
                <Github size={12} /> github.com/myaxyo/rechly_web
              </a>
              <a className="font-mono text-xs text-primary flex items-center gap-2 hover:underline" href="https://github.com/myaxyo/rechly_ml" target="_blank" rel="noreferrer">
                <Github size={12} /> github.com/myaxyo/rechly_ml
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideQA() {
  return (
    <div className="flex flex-col h-full items-center justify-center px-16 md:px-24 text-center gap-8">
      <SlideTag>Q & A</SlideTag>
      <h2 className="font-display text-7xl md:text-9xl leading-none">
        Thank<br />
        <span className="text-primary italic">you.</span>
      </h2>
      <p className="text-muted-foreground text-sm">
        Muhammadjon Yakhyoev · MSc Computer Science · 2026
      </p>
      <div className="flex flex-col items-center gap-2 mt-2">
        <a className="font-mono text-xs text-primary hover:underline" href="https://github.com/myaxyo/rechly_web" target="_blank" rel="noreferrer">
          github.com/myaxyo/rechly_web
        </a>
        <a className="font-mono text-xs text-primary hover:underline" href="https://github.com/myaxyo/rechly_ml" target="_blank" rel="noreferrer">
          github.com/myaxyo/rechly_ml
        </a>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const slides = [
  { component: Slide01Title, title: "Title", notes: "My thesis explores how ML can be embedded directly into an invoicing platform to predict late payments and forecast revenue in real time. The platform is called Rechly — I built it as an open-source tool for freelancers and small businesses in Germany." },
  { component: Slide02Problem, title: "Problem", notes: "Freelancers get paid late all the time. Existing tools just record what happened — they don't warn you before it happens. I wanted to flip that: give people a risk score the moment they create an invoice, so they can follow up proactively." },
  { component: Slide03Objectives, title: "Objectives", notes: "Four goals: build a low-latency ML API, produce revenue forecasts, integrate it seamlessly into the web app with graceful degradation, and evaluate everything properly with time-based splits so there's no data leakage." },
  { component: Slide04RelatedWork, title: "Related Work", notes: "Prior work in credit risk and financial ML informed my design. The key gap I found: no open-source invoicing tool integrates real-time ML predictions. They all do analytics after the fact." },
  { component: Slide04Architecture, title: "Architecture", notes: "Three-tier setup. Frontend is Next.js 16 with React and Ant Design. Appwrite handles auth and the database. The ML service is a separate Django app — completely optional. If it's down, the web app still works; you just don't get risk scores." },
  { component: Slide05DataFlow, title: "Data Flow", notes: "When an invoice is created, the Next.js API route calls the ML service over REST with a bearer token. The ML service loads client history from Appwrite, computes features, runs the model, and returns a risk score — all under 200ms." },
  { component: Slide06FeatureEngineering, title: "Features", notes: "Nine features total. Most important are client-level: historical late rate, average days late, overdue rate. Then invoice-level: amount, days until due. Everything computed using only data available at prediction time — no future leakage. The split is chronological." },
  { component: SlideDataset, title: "Dataset", notes: "Platform launched December 2025, currently 17 users. Since real data is still limited, models train on synthetic data generated from realistic invoice patterns. As we grow, we retrain on real data. Split is temporal — 70/15/15." },
  { component: Slide07Models, title: "ML Models", notes: "Two models. Late payment classifier compares GradientBoosting vs LogisticRegression, picks winner by PR-AUC on validation set, returns probability + risk label. Revenue forecaster is GradientBoostingRegressor with lag features and rolling averages — gives 30 and 90-day forecasts." },
  { component: Slide08Results, title: "Results", notes: "91.2% accuracy on held-out test set. Precision 87, recall 84, F1 nearly 86. Revenue forecasting: 6.8% MAPE over 90-day horizon. These numbers are from synthetic evaluation — they'll improve as real data comes in, but the pipeline is solid." },
  { component: Slide09TechStack, title: "Stack", notes: "Everything is open source. Next.js 16, React 19, Zustand for state, Ant Design for UI. Backend is Appwrite. ML service is Django REST with scikit-learn. Deployed on DigitalOcean for web app, Heroku for ML. Artifacts saved with joblib." },
  { component: Slide10FeatureImportance, title: "Explainability", notes: "Most predictive feature is client_late_rate — how often this client has paid late before. Powerful because it gives early warning before the due date passes. Invoice amount and recency also matter, but client history dominates." },
  { component: Slide11Conclusion, title: "Conclusion", notes: "What I built: production ML API under 200ms, temporal-safe feature engineering, 91% accuracy classifier, 6.8% MAPE forecaster. All open source under AGPL-3.0, two repos on GitHub. Future: graph-based risk, real-time streaming, multi-currency, LLM anomaly detection." },
  { component: SlideQA, title: "Q & A", notes: "Likely questions: Why not deep learning? → Data is small and tabular, gradient boosting wins here. Why synthetic data? → 17 users in 7 months, not enough real invoices yet. Practical impact? → Freelancer sees 'high risk' and follows up immediately. Why two repos? → Separation of concerns, ML can scale independently." },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === "n" || e.key === "N") setShowNotes((v) => !v);
      if (e.key === "Escape" && isFullscreen) document.exitFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleFullscreen, isFullscreen]);

  const SlideComponent = slides[current].component;

  return (
    <div className="w-full h-full bg-background text-foreground overflow-hidden flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top bar */}
      <div className={`flex items-center justify-between px-6 py-3 border-b border-border shrink-0 transition-opacity duration-300 ${isFullscreen ? "opacity-0 hover:opacity-100" : ""}`}>
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-primary" />
          <span className="font-mono text-xs text-muted-foreground">Rechly — Real-Time Data Analysis</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-1">
            {slides.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setCurrent(i)}
                className={`px-2 py-1 font-mono text-xs transition-colors ${i === current ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <SlideNumber current={current + 1} total={slides.length} />
          <button
            onClick={() => setShowNotes((v) => !v)}
            className={`ml-2 p-1.5 border transition-colors ${showNotes ? "text-primary border-primary/50" : "text-muted-foreground border-border hover:text-primary hover:border-primary/50"}`}
            title="Toggle speaker notes (N)"
          >
            <StickyNote size={12} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="ml-1 p-1.5 text-muted-foreground hover:text-primary border border-border hover:border-primary/50 transition-colors"
            title="Toggle fullscreen (F)"
          >
            {isFullscreen ? <Minimize size={12} /> : <Maximize size={12} />}
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <SlideComponent />
        </div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,170,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <ProgressBar current={current + 1} total={slides.length} />
      </div>

      {/* Speaker Notes Panel */}
      {showNotes && (
        <div className="border-t border-border bg-card px-6 py-4 shrink-0 max-h-[25%] overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Speaker Notes</span>
            <span className="font-mono text-xs text-muted-foreground">( N to toggle )</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{slides[current].notes}</p>
        </div>
      )}

      {/* Bottom nav */}
      <div className={`flex items-center justify-between px-6 py-3 border-t border-border shrink-0 transition-opacity duration-300 ${isFullscreen ? "opacity-0 hover:opacity-100" : ""}`}>
        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={12} /> Prev
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs border border-primary/50 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
