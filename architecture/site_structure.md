# The Rx Spot - Site Architecture & Structure Plan

**Version:** 1.0
**Date:** 2025-12-07
**Purpose:** Comprehensive single-page site architecture defining section order, content strategy, and interaction patterns

---

## SITE OVERVIEW

**Site Type:** Single-page landing site with modal interactions
**Primary Goal:** Convert three distinct audiences (Patients, B2B Partners, Business Opportunities) with clear pathways
**Technical Approach:** Progressive enhancement, mobile-first, scroll-based narrative

---

## SECTION-BY-SECTION ARCHITECTURE

### SECTION 1: NAVIGATION (Sticky Header)

**Purpose:** Persistent branding and primary CTA access

**Structure:**
```
┌──────────────────────────────────────────┐
│ [Logo] The Rx Spot      [Join Now] [☰]  │
└──────────────────────────────────────────┘
```

**Elements:**
- **Logo:** `/images/processed/TheRxSpot_Logo.png` (120-150px wide)
  - Links to top of page (smooth scroll)
- **Primary CTA Button:** "Join Now" or "Get Started"
  - Scrolls to #three-audience-gateway section
  - Pill-shaped button, accent blue background
- **Mobile Menu:** Hamburger icon
  - Opens slide-out menu with:
    - For Patients
    - For Providers
    - Business Opportunities
    - Contact

**Behavior:**
- Sticky/fixed position on scroll
- Slight background blur or solid white with shadow on scroll
- Logo scales slightly smaller on scroll (optional)

---

### SECTION 2: HERO

**Purpose:** Immediate value proposition + trust establishment + dual CTA

**Visual Concept:**
- **Background Image:** `dmitrii-e-y10vO-Ic4OI-unsplash.jpg` (lab glassware with cyan glow)
  - **Treatment:** Dark gradient overlay (60% opacity from bottom-to-top fade)
  - **Fallback:** If image doesn't work aesthetically, use deep blue gradient from design system
- **Overlay:** Radial glow effect (subtle cyan) behind headline for emphasis

**Content Structure:**

```
┌──────────────────────────────────────────┐
│         [Background: Lab Cyan Glow]      │
│                                          │
│     [EYEBROW: "Trusted Medical Partner"]│
│                                          │
│      ╔════════════════════════════╗      │
│      ║  Your Resource Partner in  ║      │
│      ║  Health, Wellness, and     ║      │
│      ║  Financial Freedom.        ║      │
│      ╚════════════════════════════╝      │
│                                          │
│   Comprehensive telehealth + compounding │
│   pharmacy solutions for Patients,       │
│   Providers, and Entrepreneurs—          │
│   all in ONE SPOT.                       │
│                                          │
│   [Start Your Care] [Explore Partners]   │
│                                          │
│            ↓ (Scroll nudge)              │
└──────────────────────────────────────────┘
```

**Headline:**
- **H1:** "Your Resource Partner in Health, Wellness, and Financial Freedom."
- **Gradient text treatment** on "Health, Wellness, and Financial Freedom" (blue-to-cyan gradient)
- **Font size:** 56px → 72px (desktop)

**Subheadline:**
- "Comprehensive telehealth + compounding pharmacy solutions for **Patients**, **Providers**, and **Entrepreneurs**—all in ONE SPOT."
- Bold the three audiences for emphasis

**Dual CTAs:**
1. **Primary:** "Start Your Care" → Scrolls to #patient-how-it-works or opens patient modal
2. **Secondary:** "Explore Partnerships" → Scrolls to #three-audience-gateway

**Trust Indicators (optional small text or icon strip below CTAs):**
- "Licensed Providers in 40+ States"
- "503B FDA-Registered Pharmacy" (if applicable)
- "Secure HIPAA-Compliant Platform"

**Animation:**
- Headline: Fade-in with slight scale (0.98 → 1.0) on page load
- Background: Subtle floating motion on decorative glow elements
- Scroll nudge: Gentle bounce animation

---

### SECTION 3: TRUST STRIP

**Purpose:** Establish immediate credibility below hero

**Visual Concept:**
- Horizontal strip with light gray background (`#f8fafc`)
- Icons + short text labels

**Content:**

```
┌──────────────────────────────────────────┐
│ ✓ Licensed Providers  ✓ FDA-Regulated    │
│ ✓ Secure Telehealth   ✓ Fast Fulfillment │
└──────────────────────────────────────────┘
```

**Elements:**
- 4 trust pillars with checkmark icons
- Centered, evenly spaced
- Small text (14px), medium weight
- Accent blue color for icons

**Responsive:** Stack vertically on mobile (2x2 grid)

---

### SECTION 4: THREE-AUDIENCE GATEWAY

**Purpose:** Primary navigation point for three distinct user types

**Section Headline:**
- **Eyebrow:** "WHO WE SERVE"
- **H2:** "Three Pathways to Better Health and Opportunity"
- **Subheadline:** "Choose your path and discover personalized solutions tailored to your needs."

**Layout: Three Cards (3-column grid, desktop)**

#### CARD 1: PATIENTS

**Icon/Image:**
- User icon with medical cross (SVG or small accent from `maxi-pezzarini-Bk_9ffil1zM-unsplash.jpg` as subtle background)
- Color accent: Deep blue

**Content:**
- **Headline (H3):** "Are You a Patient?"
- **Body:** "Access premium weight loss medications, peptide therapies, and personalized wellness treatments—all through secure telehealth with licensed providers."
- **Bullet highlights:**
  - GLP-1 weight loss (Semaglutide, Tirzepatide)
  - Peptide therapy for longevity & performance
  - Hair, skin, and sexual wellness solutions
  - 100% online consultations

**CTA:**
- **Primary Button:** "Start My Care Journey"
- **Action:** Opens #patient-modal (modal popup with intake form) OR scrolls to #patient-how-it-works

**Hover State:** Border color shifts to accent blue, slight lift

---

#### CARD 2: CLINICS, MEDSPAS & PHARMACIES (B2B)

**Icon/Image:**
- Building/clinic icon or subtle background from `martin-woortman-kDsx6GyUrQs-unsplash.jpg` (well plate)
- Color accent: Accent blue

**Content:**
- **Headline (H3):** "Clinics, MedSpas & Pharmacies"
- **Body:** "Partner with a trusted compounding pharmacy for exclusive GPO pricing, fast turnaround, and flexible fulfillment—bulk or patient-specific."
- **Bullet highlights:**
  - ✓ Exclusive GPO pricing
  - ✓ Bulk & patient-specific fulfillment
  - ✓ Fast turnaround (24-48hr in many cases)
  - ✓ Licensed 503B pharmacy (if applicable)

**CTA:**
- **Primary Button:** "Request B2B Access"
- **Action:** Opens #b2b-modal (modal with B2B intake form + volume matrix)

---

#### CARD 3: BUSINESS OPPORTUNITIES

**Icon/Image:**
- Growth chart icon or subtle background from `andingomfoti-m-pr-ePkcBOfY-unsplash.jpg` (professional in mask)
- Color accent: Cyan or bright blue

**Content:**
- **Headline (H3):** "Business Opportunities"
- **Body:** "Build your income as a rep, affiliate, or launch your own white-label telehealth platform—zero upfront cost, full infrastructure included."
- **Bullet highlights:**
  - Pharmaceutical & Nutraceutical Representative roles
  - Affiliate / Ambassador programs
  - Turnkey Telehealth Platform (no upfront fees)
  - Nationwide & international opportunities

**CTA:**
- **Primary Button:** "Explore Opportunities"
- **Action:** Opens #opportunities-modal OR scrolls to #business-opportunities-section

---

**Section Background:** White or very subtle blue tint (`#f0f7ff`)
**Card Spacing:** 32px gap between cards
**Max Width:** 1200px, centered

---

### SECTION 5: HOW IT WORKS (For Patients)

**Purpose:** Simplify patient journey, reduce friction, build confidence

**Section Headline:**
- **Eyebrow:** "THE PROCESS"
- **H2:** "Your Path to Personalized Care in 4 Simple Steps"

**Timeline Structure (Horizontal on desktop, vertical on mobile):**

```
   ①──────→②──────→③──────→④
```

#### Step 1: Online Consultation
- **Icon:** Calendar/form icon
- **Headline:** "Start Online"
- **Description:** "Complete a secure health intake form and connect with a licensed provider—100% online, no in-person visit required."

#### Step 2: Provider Review
- **Icon:** Stethoscope/doctor icon
- **Headline:** "Get Expert Guidance"
- **Description:** "A licensed medical provider reviews your health profile and recommends a personalized treatment plan tailored to your goals."

#### Step 3: Medication Fulfillment
- **Icon:** Package/vial icon
- **Headline:** "Receive Your Treatment"
- **Description:** "Your prescription is compounded in our FDA-regulated pharmacy and shipped directly to your door with discreet packaging."

#### Step 4: Ongoing Support
- **Icon:** Chat/support icon
- **Headline:** "Stay Supported"
- **Description:** "Access unlimited provider messaging, treatment adjustments, and continuous support throughout your health journey."

**Visual Treatment:**
- Numbered circles (large, accent blue)
- Arrows connecting steps (light gray)
- Icons in each circle or above
- 2-sentence max per step

**CTA at bottom of section:**
- **Button:** "Get Started Now"
- **Action:** Opens #patient-modal

**Background:** Off-white or light gradient

---

### SECTION 6: SERVICES GRID

**Purpose:** Showcase treatment categories for patients

**Section Headline:**
- **Eyebrow:** "WHAT WE TREAT"
- **H2:** "Comprehensive Telehealth Solutions"

**Grid Layout: 6 Service Cards (3 cols desktop, 2 cols tablet, 1 col mobile)**

#### Service Cards:

1. **Weight Loss / GLP-1**
   - Icon: Scale or syringe
   - "Semaglutide, Tirzepatide, and compounded GLP-1 options for sustainable weight loss."

2. **Peptide Therapy**
   - Icon: Molecular structure or vial
   - "Performance, recovery, longevity, and metabolic peptides with clinical oversight."

3. **Hair Restoration**
   - Icon: Hair/head silhouette
   - "Finasteride, minoxidil, and advanced topical treatments for hair regrowth."

4. **Skin Care**
   - Icon: Face/skin
   - "Tretinoin, anti-aging compounds, and clinical-grade skincare solutions."

5. **Sexual Wellness**
   - Icon: Heart or wellness symbol
   - "ED medications, libido support, and hormone optimization therapies."

6. **Longevity & Wellness**
   - Icon: DNA helix or wellness icon
   - "NAD+, glutathione, vitamin injections, and cellular health optimization."

**Card Style:**
- White background, rounded corners
- Icon at top (accent blue)
- Headline (H4)
- 1-2 sentence description
- Subtle hover effect (lift + shadow)

**No individual CTAs per card** (reduces clutter)
**Section CTA:** "Schedule a Consultation" below grid

**Background:** White or very light blue

---

### SECTION 7: B2B / PROVIDER SECTION

**Purpose:** Deep-dive value prop for clinics, MedSpas, and pharmacies

**Section Headline:**
- **Eyebrow:** "FOR PROVIDERS & CLINICS"
- **H2:** "Partner with a Trusted Compounding Pharmacy"

**Layout: Two-Column (50/50 split)**

**Left Column: Text Content**
- **Introduction paragraph:**
  "Whether you're a clinic, MedSpa, or pharmacy, The Rx Spot offers exclusive GPO pricing, reliable fulfillment, and pharmaceutical-grade compounding to support your patients and grow your practice."

- **Value Props (Bulleted):**
  - **Exclusive GPO Pricing:** Access wholesale rates on high-demand compounds
  - **Bulk & Patient-Specific:** Flexible ordering for in-office use or direct patient fulfillment
  - **Fast Turnaround:** 24-48 hour fulfillment on many compounds
  - **Regulatory Compliance:** FDA-regulated 503B pharmacy (if applicable) with third-party testing
  - **White-Glove Support:** Dedicated account management and clinical guidance

- **CTA:**
  - **Button:** "Request B2B Pricing & Access"
  - **Action:** Opens #b2b-modal

**Right Column: Visual**
- **Image:** `martin-woortman-kDsx6GyUrQs-unsplash.jpg` (well plate imagery)
  - OR abstract blue background with floating medical icons
- **Treatment:** Subtle shadow or border

**Background:** Light gray (`#f8fafc`) to differentiate from surrounding white sections

---

### SECTION 8: BUSINESS OPPORTUNITIES SECTION

**Purpose:** Articulate income/partnership opportunities for reps, affiliates, and platform operators

**Section Headline:**
- **Eyebrow:** "BUILD YOUR BUSINESS"
- **H2:** "Turn Telehealth Into Your Financial Freedom"

**Layout: Hero-Style Sub-Section**

**Content:**
- **Introduction:**
  "The Rx Spot isn't just a healthcare platform—it's a business opportunity. Whether you want to become a pharmaceutical or nutraceutical representative, join our affiliate program, or launch your own turnkey telehealth platform with zero upfront cost, we provide the infrastructure and support you need to succeed."

**Four Opportunity Pillars (Grid or Accordion):**

1. **Pharmaceutical Representative (U.S. Only)**
   - Represent FDA-approved and compounded medications
   - Fulfillment via 503B pharmacy in 50 states
   - Excellent customer service and bulk/patient-specific ordering
   - Competitive, commission-based compensation
   - High-demand compounded and non-compounded medications

2. **Nutraceutical Representative (Worldwide)**
   - Sell internationally respected, well-established supplements and nutraceuticals
   - U.S.-made, high-end, exclusive brand
   - Products include supplements, snacks/meals, shakes, and drinks
   - Available globally

3. **Affiliate / Ambassador Program**
   - Join our Affiliate or Ambassador program
   - Earn commissions promoting The Rx Spot platform
   - Marketing support, tracking, and ongoing training

4. **Turnkey Telehealth Platform**
   - White-label your own telehealth business
   - No upfront fees
   - Legit Scripts certified platform
   - Merchant processing included
   - Full infrastructure and customer support
   - Be up and running in less than 5 days

**Visual:**
- **Background:** Deep blue gradient OR use `Teaser.png` concepts abstracted into web design (NOT as inline image)
- **Iconography:** Growth chart, handshake, platform icons

**CTA:**
- **Primary Button:** "View Opportunities & Apply"
- **Action:** Opens #opportunities-modal

**Background:** Deep blue with white text (high contrast) OR white with blue accents

---

### SECTION 9: SOCIAL PROOF / TESTIMONIALS (Optional)

**Purpose:** Build trust through patient/partner stories

**Section Headline:**
- **H2:** "Trusted by Thousands of Patients and Partners"

**Content:**
- **Statistic callouts:**
  - "10,000+ patients served"
  - "98% satisfaction rate"
  - "Licensed in 40+ states"

- **Testimonial Cards (3-4):**
  - Patient name or "Verified Patient"
  - Quote (1-2 sentences)
  - Treatment category (Weight Loss, Peptides, etc.)

**Layout:** Horizontal carousel or static grid
**Background:** White or off-white

**Note:** If no real testimonials yet, use trust indicators instead (licensing badges, pharmacy certifications)

---

### SECTION 10: FAQ

**Purpose:** Preemptively answer common objections and questions

**Section Headline:**
- **H2:** "Frequently Asked Questions"

**Accordion-Style Q&A (8-10 Questions):**

#### General:
1. **What is The Rx Spot?**
   - "The Rx Spot is a telehealth and compounding pharmacy platform serving patients, healthcare providers, and business partners. We offer personalized treatments, B2B pharmacy access, and business opportunities—all in one trusted spot."

2. **Is The Rx Spot legitimate and licensed?**
   - "Yes. We operate with licensed medical providers in 40+ states and partner with FDA-regulated 503B compounding pharmacies. All treatments are prescribed by licensed professionals."

3. **Do I need insurance?**
   - "No. We offer transparent cash-pay pricing. Some GLP-1 medications may be covered by insurance—check with your provider."

#### For Patients:
4. **How does the telehealth process work?**
   - [Refer to 4-step process]

5. **What conditions do you treat?**
   - "We specialize in weight loss (GLP-1s), peptide therapy, hair restoration, skin care, sexual wellness, and longevity treatments."

6. **Is my information secure?**
   - "Yes. We are HIPAA-compliant and use industry-standard encryption to protect your health data."

#### For B2B:
7. **What is GPO pricing?**
   - "Group Purchasing Organization pricing offers wholesale rates on compounds, available to verified clinics, MedSpas, and pharmacies."

8. **What is the turnaround time for orders?**
   - "Most compounds are fulfilled within 24-48 hours. Custom or large-volume orders may take 3-5 days."

#### For Business Opportunities:
9. **What does the turnkey platform include?**
   - "Our turnkey platform includes white-label branding, telehealth software, LegitScripts certification, merchant processing, and full customer support. No upfront cost."

10. **How do I become a representative?**
    - "Click 'Explore Opportunities' and fill out the inquiry form. Our team will contact you with next steps and training details."

**Visual:** Simple accordion with expand/collapse arrows
**Background:** Off-white

---

### SECTION 11: FINAL CTA / EMAIL CAPTURE

**Purpose:** Last conversion opportunity before footer

**Content:**
- **Headline (H2):** "Ready to Get Started?"
- **Subheadline:** "Join thousands taking control of their health, growing their practice, or building their business with The Rx Spot."

**Dual CTA:**
1. **"Start as a Patient"** → Opens patient modal
2. **"Explore Partnerships"** → Opens B2B or opportunities modal

**Optional Email Capture:**
- "Get Updates & Exclusive Offers"
- Email input + Subscribe button

**Background:** Deep blue gradient with white text OR white with large blue accent graphic

---

### SECTION 12: FOOTER

**Purpose:** Legal, navigation, contact, trust badges

**Layout: Multi-Column Footer**

#### Column 1: Branding
- The Rx Spot logo
- Tagline: "Your Partner in Health, Wellness, and Opportunity"
- Social icons (if applicable): Facebook, Instagram, LinkedIn

#### Column 2: Quick Links
- For Patients
- For Providers
- Business Opportunities
- About Us
- Contact Us

#### Column 3: Legal & Compliance
- Privacy Policy
- Terms of Service
- HIPAA Notice
- Telehealth Consent
- Refund Policy

#### Column 4: Contact
- Email: support@therxspot.com (placeholder)
- Phone: 1-800-XXX-XXXX (placeholder)
- Hours: Mon-Fri 9am-6pm ET

#### Trust Badges (Bottom)
- LegitScript Certified (if applicable)
- NABP / Pharmacy logos
- HIPAA Compliant badge
- Secure SSL

**Copyright:**
- "© 2025 The Rx Spot. All Rights Reserved."

**Disclaimers:**
- "Compounded medications are not FDA-approved. Prescription required. Individual results may vary."

**Background:** Dark navy or white with light borders

---

## MODAL STRUCTURES

### MODAL 1: PATIENT INTAKE FORM

**Trigger:** "Start My Care" CTAs throughout site

**Header:**
- Title: "Start Your Care Journey"
- Close X button (top-right)

**Form Fields:**
- Full Name
- Email Address
- Phone Number
- Date of Birth
- State of Residence
- **Primary Health Goal (Dropdown):**
  - Weight Loss
  - Peptide Therapy
  - Hair Restoration
  - Skin Care
  - Sexual Wellness
  - General Wellness
- **Tell us about your goals** (Textarea, optional)

**CTA:** "Schedule My Consultation"

**Footer Note:** "By submitting, you agree to our Terms of Service and Privacy Policy. A licensed provider will review your information."

---

### MODAL 2: B2B / PROVIDER ACCESS FORM

**Trigger:** "Request B2B Access" CTA

**Header:**
- Title: "B2B Access Request"
- Subheadline: "Partner with The Rx Spot for exclusive pricing and reliable fulfillment."

**Form Fields (Two-Column Layout):**

**Left Column:**
- Company / Clinic Name
- Contact Name
- Email Address

**Right Column:**
- Phone Number
- Business Type (Dropdown): Clinic, MedSpa, Pharmacy, Other
- State(s) of Operation

**Interest Type (Checkboxes):**
- ☐ Bulk Compound Orders
- ☐ Patient-Specific Orders
- ☐ Both

**Volume Matrix Table** (same as current site):
- Compound types (Semaglutide, Tirzepatide, NAD+, B12, Glutathione, Hair Loss, Skin Care)
- Volume tiers (<250, 250-500, >500 units/month)
- Radio button selection per compound

**CTA:** "Submit Application"

---

### MODAL 3: BUSINESS OPPORTUNITIES INQUIRY

**Trigger:** "Explore Opportunities" CTA

**Header:**
- Title: "Business Opportunity Inquiry"
- Subheadline: "Discover how The Rx Spot can help you build income and grow your business."

**Form Fields:**
- Full Name
- Email Address
- Phone Number (optional)
- Country / Region

**I am interested in (Checkboxes, select all that apply):**
- ☐ Pharmaceutical Representative (U.S. Only)
- ☐ Nutraceutical Representative (Worldwide)
- ☐ Affiliate / Ambassador Program
- ☐ Turnkey Telehealth Platform (No Upfront Cost)

**Tell us about your background or interest** (Textarea, optional)

**CTA:** "View Details & Apply"

---

## NAVIGATION & INTERACTION MAP

```
Hero
 ├─ "Start Your Care" → Patient Modal
 └─ "Explore Partnerships" → Scroll to Three-Audience Gateway

Three-Audience Gateway
 ├─ "Start My Care Journey" → Patient Modal OR Scroll to How It Works
 ├─ "Request B2B Access" → B2B Modal
 └─ "Explore Opportunities" → Opportunities Modal OR Scroll to Business Opps Section

Footer Quick Links
 ├─ "For Patients" → Scroll to How It Works
 ├─ "For Providers" → Scroll to B2B Section
 └─ "Business Opportunities" → Scroll to Opportunities Section
```

---

## TECHNICAL NOTES

### Smooth Scrolling
- All internal anchor links use smooth scroll behavior
- Offset for sticky nav height (80px)

### Form Handling
- Client-side validation (required fields, email format)
- Server-side submission (email to admin, CRM integration)
- Success message in modal ("Thank you! We'll be in touch within 24 hours.")

### Analytics Events
- Track modal opens
- Track form submissions by type (patient, B2B, opportunities)
- Track scroll depth
- Track CTA clicks

---

**End of Site Architecture**
