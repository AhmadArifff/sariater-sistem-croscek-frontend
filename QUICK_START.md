# 🚀 Quick Start Guide - Using New UI Components

**For Developers:** Referensi cepat cara menggunakan komponen-komponen UI baru.

---

## 📦 Component Library Quick Reference

### 1️⃣ AnimatedBadge
Badges dengan animasi untuk status display.

```jsx
import { AnimatedBadge } from '@/components/ui/decorative';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Success Badge
<AnimatedBadge 
  variant="success"
  icon={<CheckCircle />}
  label="Hadir"
/>

// Error Badge
<AnimatedBadge 
  variant="error"
  icon={<AlertCircle />}
  label="Absent"
  pulse
/>
```

**Available Variants:**
- `success` - Green gradient
- `warning` - Amber gradient
- `error` - Red gradient
- `info` - Blue gradient
- `primary` - Blue-purple gradient

---

### 2️⃣ LoadingSkeleton
Loading states dengan skeleton animation.

```jsx
import { LoadingSkeleton } from '@/components/ui/decorative';

// Single card skeleton
<LoadingSkeleton type="card" />

// Multiple skeletons
<LoadingSkeleton type="card" count={5} />

// Chart skeleton
<LoadingSkeleton type="chart" />

// Table skeleton
<LoadingSkeleton type="table" />
```

**Skeleton Types:**
- `card` - Card layout
- `line` - Single line
- `circle` - Circular badge
- `chart` - Chart area
- `table` - Table rows

---

### 3️⃣ EmptyState
Empty state UI untuk tidak ada data.

```jsx
import { EmptyState } from '@/components/ui/decorative';
import { InboxIcon } from 'lucide-react';

<EmptyState
  icon={<InboxIcon className="w-16 h-16" />}
  title="Tidak ada data"
  description="Data absensi tidak ditemukan untuk periode ini"
  action={
    <button className="btn btn-primary">
      Refresh Data
    </button>
  }
/>
```

---

### 4️⃣ GradientText
Text dengan gradient effect.

```jsx
import { GradientText } from '@/components/ui/decorative';

// Static gradient
<GradientText variant="primary">
  Croscek Kehadiran
</GradientText>

// Animated gradient
<GradientText variant="secondary" animated>
  Dashboard Analytics
</GradientText>
```

**Variants:**
- `primary` - Blue to Purple
- `secondary` - Purple to Pink
- `success` - Green to Emerald
- `warning` - Amber to Orange
- `error` - Red to Rose

---

### 5️⃣ AnimatedCounter
Number animation untuk KPI display.

```jsx
import { AnimatedCounter } from '@/components/ui/decorative';

<div className="text-4xl font-bold">
  <AnimatedCounter
    from={0}
    to={156}
    duration={2000}
    prefix="Total: "
    suffix=" Karyawan"
  />
</div>

// With decimals
<AnimatedCounter
  from={0}
  to={95.5}
  suffix="%"
  decimals={1}
/>
```

---

### 6️⃣ GlassCard
Glassmorphic card component.

```jsx
import { GlassCard } from '@/components/ui/decorative';

<GlassCard interactive gradient>
  <h3 className="text-lg font-bold mb-2">
    Card Title
  </h3>
  <p className="text-gray-600">
    Card content here...
  </p>
</GlassCard>

// Non-interactive glass card
<GlassCard>
  <p>Static content</p>
</GlassCard>
```

---

## 🎨 Using New Tailwind Animations

### Available Animations

```jsx
// Fade in
<div className="animate-fade-in">Content</div>

// Slide from left
<div className="animate-slide-in-left">Content</div>

// Slide from right
<div className="animate-slide-in-right">Content</div>

// Slide up (common for forms)
<div className="animate-slide-in-up">Form</div>

// Float animation
<div className="animate-float">Icon</div>

// Pulse slow
<div className="animate-pulse-slow">Loading...</div>

// Bounce slow
<div className="animate-bounce-slow">Icon</div>

// Glow effect
<div className="animate-glow">Highlighted</div>

// Shimmer (loading)
<div className="animate-shimmer">Loading</div>

// Shake (error)
<div className="animate-shake">Error!</div>

// Gradient animation
<div className="animate-gradient-shift bg-200 bg-gradient-to-r from-blue-500 to-purple-500">
  Animated Gradient
</div>
```

---

## ✨ Using Glassmorphism

### Glass Effect Utilities

```jsx
// Basic glass effect
<div className="glass">Glass Card</div>

// Dark glass effect
<div className="glass-dark">Dark Glass</div>

// Blur glass only
<div className="blur-glass">Blur Effect</div>

// With shadows
<div className="glass shadow-lg">
  Glass with Shadow
</div>

// Combined with animations
<div className="glass animate-fade-in">
  Animated Glass
</div>
```

---

## 🎯 Real-World Usage Examples

### Example 1: Dashboard KPI Section

```jsx
import { KPICard } from '@/components/KPICard';
import { Users, CheckCheck, Clock, AlertCircle } from 'lucide-react';

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        value={156}
        label="Total Karyawan"
        icon={Users}
        color="blue"
        trend={5}
      />
      
      <KPICard
        value={142}
        label="Hadir Hari Ini"
        icon={CheckCheck}
        color="green"
        trend={2}
      />
      
      <KPICard
        value={8}
        label="Terlambat"
        icon={Clock}
        color="orange"
        trend={-3}
      />
      
      <KPICard
        value={6}
        label="Izin"
        icon={AlertCircle}
        color="purple"
        trend={0}
      />
    </div>
  );
}
```

### Example 2: Empty State in List

```jsx
import { EmptyState } from '@/components/ui/decorative';
import { InboxIcon } from 'lucide-react';

export function DataList({ data, isLoading }) {
  if (isLoading) {
    return <LoadingSkeleton type="card" count={5} />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={<InboxIcon />}
        title="Belum ada data"
        description="Mulai dengan menambahkan data baru"
      />
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="glass p-4 rounded-lg">
          {/* Item content */}
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Loading State

```jsx
export function DataTable({ data, isLoading }) {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <LoadingSkeleton type="table" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table content */}
          </table>
        </div>
      )}
    </div>
  );
}
```

### Example 4: Form with Animations

```jsx
export function LoginForm() {
  return (
    <form className="space-y-6 animate-slide-in-up">
      {/* Email field */}
      <div className="animate-slide-in-left">
        <label>Email</label>
        <input className="w-full focus:ring-2 focus:ring-blue-400" />
      </div>

      {/* Password field */}
      <div className="animate-slide-in-right" style={{ animationDelay: '100ms' }}>
        <label>Password</label>
        <input type="password" className="w-full focus:ring-2 focus:ring-blue-400" />
      </div>

      {/* Submit button */}
      <button 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:scale-105 active:scale-95 transition-all"
      >
        Login
      </button>
    </form>
  );
}
```

---

## 🛠️ Custom Hook Usage

### useImageLoad Hook

```jsx
import { useImageLoad } from '@/utils/assetHelpers';

export function ImageWithFallback({ src, alt }) {
  const { isLoaded, error, handleLoad, handleError } = useImageLoad();

  return (
    <div>
      {!isLoaded && !error && (
        <div className="animate-pulse bg-gray-300 h-64 rounded-lg" />
      )}
      
      {error ? (
        <EmptyState
          title="Image Failed to Load"
          description={error.message}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        />
      )}
    </div>
  );
}
```

---

## 📋 Component Import Cheatsheet

```jsx
// Individual imports
import { AnimatedBadge } from '@/components/ui/decorative/AnimatedBadge';
import { LoadingSkeleton } from '@/components/ui/decorative/LoadingSkeleton';
import { EmptyState } from '@/components/ui/decorative/EmptyState';
import { GradientText } from '@/components/ui/decorative/GradientText';
import { AnimatedCounter } from '@/components/ui/decorative/AnimatedCounter';
import { GlassCard } from '@/components/ui/decorative/GlassCard';

// Or barrel import
import {
  AnimatedBadge,
  LoadingSkeleton,
  EmptyState,
  GradientText,
  AnimatedCounter,
  GlassCard,
} from '@/components/ui/decorative';

// Asset utilities
import { 
  getAssetPath, 
  preloadAsset,
  useImageLoad 
} from '@/utils/assetHelpers';

// Config
import { 
  ANIMATION_CONFIG, 
  COLOR_SCHEME,
  BREAKPOINTS 
} from '@/config/assets';
```

---

## 🎬 Animation Timings Cheatsheet

```jsx
// Fast animations (200ms)
className="transition-all duration-200"

// Normal animations (300ms)
className="transition-all duration-300"

// Slow animations (500ms)
className="transition-all duration-500"

// Built-in animations
className="animate-fade-in"           // 0.4s
className="animate-slide-in-up"       // 0.5s
className="animate-bounce-slow"       // 2s
className="animate-pulse-slow"        // 3s
className="animate-float"             // 3s
```

---

## ⚡ Performance Tips

1. **Use animations sparingly** - Don't animate everything
2. **GPU acceleration** - Use `transform` and `opacity` instead of `width/height`
3. **Lazy load images** - Use `useImageLoad` hook
4. **Preload assets** - Use `preloadAsset()` for critical images
5. **Respect reduced-motion** - Animations automatically disable for users who prefer it

---

## ✅ Best Practices Checklist

- [ ] Use decorative components from library instead of creating new ones
- [ ] Apply animations via Tailwind classes, not inline styles
- [ ] Test animations on mobile devices
- [ ] Ensure accessibility with proper labels and semantic HTML
- [ ] Use GlassCard for consistent styling across pages
- [ ] Leverage EmptyState for data-empty scenarios
- [ ] Use AnimatedBadge for status indicators
- [ ] Optimize images before integration

---

## 🐛 Common Issues & Solutions

### Animation not working?
```jsx
// Make sure you're using the correct class name
// ❌ animate-fadein (wrong)
// ✅ animate-fade-in (correct)

// Check if CSS is loaded
// Verify tailwind.config.js has the animation defined
```

### Glass effect not showing?
```jsx
// Use the complete .glass class
// ❌ className="backdrop-blur-lg"
// ✅ className="glass"

// Or individual utilities
className="bg-white/10 backdrop-blur-lg border border-white/20"
```

### Component not responsive?
```jsx
// Always include responsive prefixes
// ❌ className="w-full"
// ✅ className="w-full md:w-1/2 lg:w-1/3"
```

---

## 📚 Related Documentation

- [UI Enhancement Guide](./UI_ENHANCEMENT_GUIDE.md) - Comprehensive design system docs
- [Asset Download Guide](./ASSET_DOWNLOAD_GUIDE.md) - Asset integration instructions
- [Implementation Summary](./README_IMPLEMENTATION.md) - What was implemented
- [Tailwind CSS Docs](https://tailwindcss.com) - Official Tailwind documentation

---

**Quick Links:**
- 🎨 Design System: `tailwind.config.js`
- 💾 Global Styles: `src/index.css`
- 🧩 Components: `src/components/ui/decorative/`
- ⚙️ Config: `src/config/assets.js`
- 🛠️ Utilities: `src/utils/assetHelpers.js`

---

**Last Updated:** April 25, 2026  
**Version:** 1.0.0
