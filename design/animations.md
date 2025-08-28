# Tenant Management Platform - Animation Specifications

**Version:** 1.0-MVP  
**Target:** Delightful Micro-Interactions  
**Updated:** 2025-08-28

---

## Animation Philosophy

### Core Principles
1. **Professional First**: Animations enhance trust, never distract from tasks
2. **Performance Focused**: CSS-based animations with hardware acceleration
3. **Accessibility Aware**: Respects prefers-reduced-motion settings
4. **Purposeful Motion**: Every animation serves a functional purpose
5. **Snappy Feel**: Fast animations (200-400ms) maintain workflow speed

### Design Approach
- **Subtle Sophistication**: Micro-interactions that feel polished
- **Spatial Awareness**: Animations respect physical metaphors
- **Emotional Connection**: Small moments of delight without overwhelming
- **Consistent Timing**: Unified easing curves across all components

---

## 1. Card Interactions

### 1.1 Property Card Hover Effects

#### Lift and Shadow Animation
```css
.property-card {
  @apply transition-all duration-300 ease-out;
  transform: translateY(0);
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

**Trigger**: Mouse hover on property card  
**Duration**: 300ms  
**Easing**: ease-out  
**Description**: Gentle lift with expanding shadow creates depth  
**Performance**: Uses transform for GPU acceleration

#### Card Content Reveal
```css
.property-card .hover-actions {
  @apply opacity-0 transform translate-y-2 transition-all duration-200 ease-out;
}

.property-card:hover .hover-actions {
  @apply opacity-100 transform translate-y-0;
}

.property-card .stats-row {
  @apply transition-all duration-250 ease-out;
}

.property-card:hover .stats-row {
  @apply transform scale-105;
}
```

**Trigger**: Property card hover  
**Duration**: 200ms (actions), 250ms (stats)  
**Description**: Action buttons slide up while stats subtly scale  
**Implementation**: Staggered timing creates layered reveal

### 1.2 Email Badge Copy Animation

#### Success Ripple Effect
```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.copy-button {
  @apply relative overflow-hidden transition-all duration-200;
}

.copy-button.success::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(34, 197, 94, 0.6);
  border-radius: 100%;
  transform: scale(0);
  animation: ripple 0.6s linear;
}

.copy-button.success {
  @apply bg-green-500 transform scale-95;
}
```

**Trigger**: Successful email copy to clipboard  
**Duration**: 600ms ripple + 200ms button transform  
**Description**: Green ripple emanates from click point, button briefly scales  
**Visual**: Satisfying feedback for successful action

#### Text Change Animation
```css
.copy-button-text {
  @apply transition-all duration-150 ease-in-out;
}

.copy-button.copying .copy-button-text {
  @apply transform scale-90 opacity-0;
}

.copy-button.success .copy-button-text {
  @apply transform scale-110 opacity-100;
}
```

**Trigger**: Copy button state change  
**Duration**: 150ms transition between states  
**Description**: Text scales down during copy, scales up for "Copied!" feedback

### 1.3 Drag-and-Drop Pipeline Cards

#### Drag Start Animation
```css
.pipeline-card.dragging {
  @apply transform scale-105 rotate-2 opacity-80 z-50;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.pipeline-card.dragging::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1));
  border-radius: inherit;
  animation: pulse-border 2s ease-in-out infinite;
}

@keyframes pulse-border {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
```

**Trigger**: Drag initiation  
**Duration**: 200ms initial transform + continuous pulse  
**Description**: Card lifts, rotates slightly, gains glow effect  
**Purpose**: Clear visual feedback that drag is active

#### Drop Zone Feedback
```css
.drop-zone {
  @apply transition-all duration-200 ease-out;
}

.drop-zone.drag-over {
  @apply bg-blue-50 border-2 border-dashed border-blue-300 transform scale-102;
}

.drop-zone.drag-over::before {
  content: 'Drop here';
  @apply absolute inset-0 flex items-center justify-center text-blue-600 font-medium;
  animation: fade-in-bounce 0.3s ease-out;
}

@keyframes fade-in-bounce {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

**Trigger**: Dragging card over valid drop zone  
**Duration**: 200ms zone transform + 300ms text animation  
**Description**: Zone highlights with helpful text and gentle scale

### 1.4 Card Entrance Animations

#### Staggered Load Animation
```css
.property-grid .property-card {
  opacity: 0;
  transform: translateY(20px);
  animation: slide-in-up 0.6s ease-out forwards;
}

.property-card:nth-child(1) { animation-delay: 0ms; }
.property-card:nth-child(2) { animation-delay: 100ms; }
.property-card:nth-child(3) { animation-delay: 200ms; }
.property-card:nth-child(4) { animation-delay: 300ms; }
/* Continue pattern for additional cards */

@keyframes slide-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Trigger**: Page load or new card addition  
**Duration**: 600ms per card with 100ms stagger  
**Description**: Cards slide up in sequence creating wave effect  
**Performance**: Uses animation-fill-mode: forwards to maintain final state

---

## 2. Success Celebrations

### 2.1 Approved Applicant Celebration

#### Confetti Burst
```css
.approval-celebration {
  position: relative;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #22c55e;
  animation: confetti-fall 3s ease-in-out forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* JavaScript creates multiple confetti elements with random colors and delays */
.confetti:nth-child(odd) { background: #3b82f6; }
.confetti:nth-child(3n) { background: #f59e0b; }
.confetti:nth-child(4n) { background: #ef4444; }
```

**Trigger**: Application approval button click  
**Duration**: 3 seconds  
**Description**: Colorful confetti falls from top of screen  
**Implementation**: JavaScript generates 20-30 confetti elements with random positions

#### Success Badge Animation
```css
@keyframes success-pop {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.badge-approved {
  animation: success-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**Trigger**: Status change to approved  
**Duration**: 500ms  
**Easing**: Back ease for bouncy feel  
**Description**: Badge appears with energetic pop and slight rotation

### 2.2 Document Upload Success

#### Checkmark Draw Animation
```css
@keyframes draw-check {
  0% { stroke-dasharray: 0 100; }
  100% { stroke-dasharray: 100 0; }
}

.upload-success-icon {
  stroke-dasharray: 100;
  animation: draw-check 0.8s ease-in-out forwards;
}

.upload-success-container {
  @apply bg-green-50 border-green-200 transform scale-95;
  animation: success-scale 0.4s ease-out 0.3s forwards;
}

@keyframes success-scale {
  to { transform: scale(1); }
}
```

**Trigger**: Successful file upload  
**Duration**: 800ms checkmark + 400ms container scale  
**Description**: Checkmark draws itself followed by container scaling up

### 2.3 Property Listed Successfully

#### Subtle Fanfare
```css
@keyframes property-success {
  0% { transform: scale(1); }
  20% { transform: scale(1.05); }
  40% { transform: scale(0.95); }
  60% { transform: scale(1.02); }
  80% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.property-success {
  animation: property-success 0.6s ease-in-out;
}

.property-success::after {
  content: '✨';
  position: absolute;
  top: -10px;
  right: -10px;
  animation: sparkle-fade 2s ease-out;
}

@keyframes sparkle-fade {
  0% { opacity: 0; transform: scale(0); }
  20% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.5); }
}
```

**Trigger**: Property successfully created/updated  
**Duration**: 600ms bounce + 2s sparkle  
**Description**: Gentle bounce with sparkle effect in corner

---

## 3. Smooth Transitions

### 3.1 Pipeline Stage Transitions

#### Smooth Slide Between Columns
```css
.pipeline-card.moving {
  z-index: 100;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.pipeline-column {
  @apply transition-all duration-300 ease-out;
}

.pipeline-column.receiving {
  @apply bg-blue-50 transform scale-102;
}

/* Custom path animation for complex moves */
@keyframes slide-across-board {
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(200px) translateY(-20px) scale(1.05); }
  100% { transform: translateX(400px) translateY(0) scale(1); }
}
```

**Trigger**: Card moved between pipeline stages  
**Duration**: 500ms  
**Description**: Card follows curved path while destination column highlights  
**Implementation**: Custom animation paths calculated based on column positions

### 3.2 Tab Switching Animations

#### Content Slide Transition
```css
.tab-content {
  position: relative;
  overflow: hidden;
}

.tab-panel {
  @apply absolute inset-0 transition-all duration-300 ease-in-out;
  transform: translateX(100%);
  opacity: 0;
}

.tab-panel.active {
  transform: translateX(0);
  opacity: 1;
}

.tab-panel.prev {
  transform: translateX(-100%);
  opacity: 0;
}
```

**Trigger**: Tab selection change  
**Duration**: 300ms  
**Description**: New content slides in from right while previous slides out left

#### Tab Indicator Movement
```css
.tab-indicator {
  @apply absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out;
}

/* JavaScript updates width and transform based on active tab */
```

**Trigger**: Tab click or keyboard navigation  
**Duration**: 300ms  
**Description**: Smooth sliding underline follows active tab

### 3.3 Modal Appearances

#### Scale and Fade Entry
```css
@keyframes modal-enter {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content {
  animation: modal-enter 0.3s ease-out;
}

.modal-backdrop {
  @apply bg-black bg-opacity-0 transition-all duration-300;
}

.modal-backdrop.show {
  @apply bg-opacity-50;
}
```

**Trigger**: Modal open  
**Duration**: 300ms  
**Description**: Modal scales up while backdrop fades in

---

## 4. Loading & Progress

### 4.1 Skeleton Loading Animations

#### Shimmer Effect
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton {
  @apply bg-gray-200 relative overflow-hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}
```

**Trigger**: Data loading state  
**Duration**: 1.5s loop  
**Description**: Subtle shimmer passes over skeleton content

### 4.2 Progress Bar Animations

#### Smooth Fill with Bounce
```css
@keyframes progress-fill {
  0% { width: 0%; }
  100% { width: var(--progress-width); }
}

@keyframes progress-bounce {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.1); }
}

.progress-bar {
  animation: progress-fill 0.8s ease-out,
             progress-bounce 0.3s ease-in-out 0.8s;
}
```

**Trigger**: Progress update  
**Duration**: 800ms fill + 300ms bounce  
**Description**: Bar fills smoothly then bounces to emphasize completion

### 4.3 AI Thinking Animation

#### Pulsing Dots
```css
@keyframes ai-thinking {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

.ai-thinking-dot {
  @apply w-2 h-2 bg-blue-500 rounded-full mx-1;
  animation: ai-thinking 1.4s infinite ease-in-out;
}

.ai-thinking-dot:nth-child(1) { animation-delay: 0s; }
.ai-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
.ai-thinking-dot:nth-child(3) { animation-delay: 0.4s; }
```

**Trigger**: AI processing request  
**Duration**: 1.4s loop with staggered dots  
**Description**: Three dots bounce in sequence suggesting AI thinking

---

## 5. Interactive Feedback

### 5.1 Button Press Effects

#### Satisfying Click Response
```css
.btn {
  @apply transition-all duration-150 ease-out;
  transform: translateY(0);
}

.btn:active {
  transform: translateY(1px) scale(0.98);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**Trigger**: Button interaction  
**Duration**: 150ms  
**Description**: Button lifts on hover, depresses on click for tactile feel

#### Ripple Effect for Primary Actions
```css
@keyframes button-ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.btn-primary {
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  transform: scale(0);
  pointer-events: none;
}

.btn-primary:active::after {
  animation: button-ripple 0.6s ease-out;
}
```

**Trigger**: Primary button click  
**Duration**: 600ms  
**Description**: Material Design-inspired ripple emanates from click point

### 5.2 Form Field Focus Animations

#### Input Field Enhancement
```css
.form-field {
  @apply relative;
}

.form-field input {
  @apply transition-all duration-200 ease-out;
}

.form-field input:focus {
  @apply ring-2 ring-blue-500 border-blue-500 transform scale-102;
}

.form-field label {
  @apply absolute top-3 left-3 text-gray-500 transition-all duration-200 pointer-events-none;
}

.form-field input:focus + label,
.form-field input:not(:placeholder-shown) + label {
  @apply top-1 left-2 text-xs text-blue-600 bg-white px-1;
  transform: translateY(-50%);
}
```

**Trigger**: Input focus and blur  
**Duration**: 200ms  
**Description**: Field scales slightly, label animates to floating position

### 5.3 Toggle Switch Transitions

#### Smooth Toggle Animation
```css
.toggle {
  @apply relative w-12 h-6 bg-gray-300 rounded-full transition-all duration-300 ease-out;
}

.toggle.checked {
  @apply bg-blue-500;
}

.toggle-thumb {
  @apply absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
         transition-all duration-300 ease-out shadow-sm;
}

.toggle.checked .toggle-thumb {
  transform: translateX(24px);
}

/* Add bounce effect */
@keyframes toggle-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.toggle-thumb.active {
  animation: toggle-bounce 0.2s ease-out;
}
```

**Trigger**: Toggle state change  
**Duration**: 300ms slide + 200ms bounce  
**Description**: Thumb slides with gentle bounce, background color transitions

---

## 6. Empty States

### 6.1 No Messages Animation

#### Friendly Floating Elements
```css
@keyframes float-gentle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes fade-in-delayed {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.empty-state-icon {
  animation: float-gentle 3s ease-in-out infinite;
}

.empty-state-message {
  animation: fade-in-delayed 0.6s ease-out 0.3s both;
}

.empty-state-action {
  animation: fade-in-delayed 0.6s ease-out 0.6s both;
}
```

**Trigger**: Empty inbox or message thread  
**Duration**: 3s float loop, 600ms staggered entrance  
**Description**: Gentle floating icon with staggered text appearance

### 6.2 First Property Encouragement

#### Encouraging Pulse Animation
```css
@keyframes encourage-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.first-property-card {
  @apply border-2 border-dashed border-blue-300 bg-blue-50;
  animation: encourage-pulse 2s ease-in-out infinite;
}

.add-property-icon {
  animation: float-gentle 2s ease-in-out infinite;
}
```

**Trigger**: No properties exist  
**Duration**: 2s pulse loop  
**Description**: Gentle pulsing draw attention without being aggressive

---

## 7. Implementation Guidelines

### 7.1 Performance Optimization

#### CSS Animation Best Practices
```css
/* Use transform and opacity for 60fps animations */
.optimized-animation {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Remove will-change after animation */
.animation-complete {
  will-change: auto;
}

/* Hardware acceleration triggers */
.gpu-accelerated {
  transform: translateZ(0); /* Create new layer */
}
```

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 7.2 JavaScript Animation Utilities

#### Animation Control Functions
```javascript
// Utility for managing animation states
const AnimationManager = {
  // Add animation classes with cleanup
  animate(element, className, duration = 300) {
    element.classList.add(className);
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.classList.remove(className);
        resolve();
      }, duration);
    });
  },
  
  // Stagger multiple element animations
  stagger(elements, className, delay = 100) {
    elements.forEach((el, index) => {
      setTimeout(() => {
        this.animate(el, className);
      }, index * delay);
    });
  },
  
  // Check if user prefers reduced motion
  respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// Usage examples
AnimationManager.animate(button, 'btn-success-pulse');
AnimationManager.stagger(propertyCards, 'slide-in-up', 100);
```

### 7.3 Animation Timing Constants

#### Standardized Duration Values
```css
:root {
  /* Fast interactions */
  --duration-fast: 150ms;
  
  /* Standard interactions */
  --duration-normal: 250ms;
  
  /* Complex state changes */
  --duration-slow: 400ms;
  
  /* Decorative animations */
  --duration-decorative: 600ms;
  
  /* Easing curves */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
}
```

---

## 8. Success Metrics & Testing

### 8.1 Animation Performance Targets
- **Frame Rate**: Maintain 60fps during animations
- **Paint Time**: <16ms per frame for smooth experience  
- **Memory Usage**: <5MB additional for animation assets
- **Battery Impact**: Minimal power consumption on mobile

### 8.2 User Experience Metrics
- **Perceived Performance**: Animations should feel faster than static loading
- **Delight Score**: Positive user feedback on micro-interactions
- **Accessibility Compliance**: 100% keyboard navigation support
- **Reduced Motion Support**: Graceful degradation for motion-sensitive users

### 8.3 Testing Checklist
- [ ] All animations work with reduced motion settings
- [ ] Touch targets remain accessible during animations  
- [ ] Keyboard navigation isn't blocked by transitions
- [ ] Screen readers announce state changes appropriately
- [ ] Animations perform well on low-end devices
- [ ] No animation conflicts when multiple triggers fire

---

This animation specification provides a comprehensive foundation for adding delightful micro-interactions to the Tenant Management Platform while maintaining professional standards and optimal performance. All animations are designed to enhance usability and create memorable moments that encourage user engagement and platform adoption.

**Key Implementation Files:**
- `/Users/qayo/Documents/tenant-management-platform/design/animations.md` - This specification
- CSS animations integrate with existing Tailwind classes from `design-system.md`
- Component animations build upon UI patterns from `ui-components.md`