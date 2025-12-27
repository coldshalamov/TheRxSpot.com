const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const sites = {
  generalTelehealth: [
    { name: 'Ro', url: 'https://www.ro.co' },
    { name: 'Hims', url: 'https://www.hims.com' },
    { name: 'Hers', url: 'https://www.forhers.com' },
    { name: 'Cerebral', url: 'https://cerebral.com' },
    { name: 'Sesame', url: 'https://sesamecare.com' }
  ],
  peptideWeightLoss: [
    { name: 'Ways2Well', url: 'https://ways2well.com/peptides' },
    { name: 'Relive Health', url: 'https://relivehealth.com/peptide-therapy/' },
    { name: 'HerWay Health', url: 'https://herwayhealth.com/peptide-therapy/' },
    { name: 'Concierge MD LA', url: 'https://conciergemdla.com/peptide-therapy/' },
    { name: 'Amazing Meds', url: 'https://amazing-meds.com/peptide-therapy/' }
  ]
};

async function analyzePage(page, siteName, url) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Analyzing: ${siteName}`);
  console.log(`URL: ${url}`);
  console.log('='.repeat(60));

  const analysis = {
    siteName,
    url,
    timestamp: new Date().toISOString(),
    hero: {},
    sections: [],
    colorScheme: {},
    cardPatterns: {},
    formModals: {},
    weightLossSpecific: {}
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // 1. HERO ANALYSIS
    console.log('\n1. Analyzing Hero Section...');
    analysis.hero = await page.evaluate(() => {
      const hero = {
        headlines: [],
        ctaButtons: [],
        imageType: 'none',
        layout: 'unknown',
        backgroundType: 'solid',
        hasVideo: false
      };

      // Find hero section (usually first major section)
      const heroSelectors = [
        'section:first-of-type',
        '[class*="hero"]',
        '[class*="Hero"]',
        '[id*="hero"]',
        'main > div:first-child',
        '.above-fold',
        '[class*="above"]'
      ];

      let heroSection = null;
      for (const selector of heroSelectors) {
        heroSection = document.querySelector(selector);
        if (heroSection && heroSection.offsetHeight > 300) break;
      }

      if (!heroSection) {
        heroSection = document.querySelector('main') || document.body;
      }

      // Find headlines
      const headingSelectors = ['h1', 'h2[class*="hero"]', '[class*="headline"]', '[class*="title"]'];
      headingSelectors.forEach(sel => {
        const headings = heroSection.querySelectorAll(sel);
        headings.forEach((h, idx) => {
          if (idx < 2 && h.offsetParent !== null) { // visible elements only
            const rect = h.getBoundingClientRect();
            const styles = window.getComputedStyle(h);
            hero.headlines.push({
              tag: h.tagName.toLowerCase(),
              fontSize: styles.fontSize,
              fontWeight: styles.fontWeight,
              position: {
                top: rect.top < window.innerHeight / 2 ? 'upper' : 'lower',
                left: rect.left < window.innerWidth / 3 ? 'left' :
                      rect.left < (window.innerWidth * 2/3) ? 'center' : 'right'
              },
              textAlign: styles.textAlign,
              color: styles.color,
              wordCount: h.textContent.trim().split(/\s+/).length
            });
          }
        });
      });

      // Find CTA buttons
      const ctaSelectors = [
        'a[class*="button"]', 'button', 'a[class*="cta"]',
        'a[class*="btn"]', '[role="button"]', 'a[class*="Button"]'
      ];

      const buttons = new Set();
      ctaSelectors.forEach(sel => {
        const elements = heroSection.querySelectorAll(sel);
        elements.forEach(btn => {
          if (btn.offsetParent !== null && !buttons.has(btn)) {
            const rect = btn.getBoundingClientRect();
            if (rect.top < window.innerHeight) { // visible in hero
              const styles = window.getComputedStyle(btn);
              buttons.add(btn);
              hero.ctaButtons.push({
                type: btn.tagName.toLowerCase(),
                text: btn.textContent.trim().substring(0, 50),
                position: {
                  top: rect.top < window.innerHeight / 2 ? 'upper' : 'lower',
                  left: rect.left < window.innerWidth / 3 ? 'left' :
                        rect.left < (window.innerWidth * 2/3) ? 'center' : 'right'
                },
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                borderRadius: styles.borderRadius,
                padding: styles.padding,
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                width: rect.width
              });
            }
          }
        });
      });

      // Check for images/video
      const heroImages = heroSection.querySelectorAll('img');
      const heroVideos = heroSection.querySelectorAll('video, [class*="video"]');

      if (heroVideos.length > 0) {
        hero.hasVideo = true;
        hero.imageType = 'video';
      } else if (heroImages.length > 0) {
        hero.imageType = heroImages.length === 1 ? 'single-image' : 'multiple-images';
      }

      // Background analysis
      const heroStyles = window.getComputedStyle(heroSection);
      if (heroStyles.backgroundImage && heroStyles.backgroundImage !== 'none') {
        if (heroStyles.backgroundImage.includes('gradient')) {
          hero.backgroundType = 'gradient';
        } else {
          hero.backgroundType = 'image';
        }
      } else if (heroStyles.background && heroStyles.background.includes('gradient')) {
        hero.backgroundType = 'gradient';
      }

      return hero;
    });

    // 2. SECTION ORDER ANALYSIS
    console.log('2. Analyzing Section Order...');
    analysis.sections = await page.evaluate(() => {
      const sections = [];
      const mainSections = document.querySelectorAll('main section, main > div[class*="section"], main > div[class*="Section"]');

      mainSections.forEach((section, idx) => {
        const headings = section.querySelectorAll('h1, h2, h3');
        const primaryHeading = headings[0]?.textContent.trim().substring(0, 100) || 'Untitled Section';

        // Detect section type by content and structure
        let sectionType = 'unknown';
        const text = section.textContent.toLowerCase();
        const classList = section.className.toLowerCase();

        if (idx === 0 || classList.includes('hero')) sectionType = 'hero';
        else if (text.includes('how it works') || text.includes('how we work')) sectionType = 'how-it-works';
        else if (text.includes('testimonial') || text.includes('review')) sectionType = 'testimonials';
        else if (text.includes('faq') || text.includes('question')) sectionType = 'faq';
        else if (text.includes('pricing') || text.includes('plan')) sectionType = 'pricing';
        else if (section.querySelectorAll('[class*="card"]').length > 2) sectionType = 'cards-grid';
        else if (text.includes('benefit')) sectionType = 'benefits';
        else if (text.includes('about')) sectionType = 'about';
        else if (text.includes('contact') || classList.includes('footer')) sectionType = 'footer';

        sections.push({
          order: idx + 1,
          type: sectionType,
          heading: primaryHeading,
          hasCards: section.querySelectorAll('[class*="card"]').length,
          hasIcons: section.querySelectorAll('svg, [class*="icon"]').length,
          hasImages: section.querySelectorAll('img').length,
          backgroundColor: window.getComputedStyle(section).backgroundColor
        });
      });

      return sections;
    });

    // 3. CARD/GRID PATTERN ANALYSIS
    console.log('3. Analyzing Card/Grid Patterns...');
    analysis.cardPatterns = await page.evaluate(() => {
      const patterns = {
        grids: [],
        individualCards: []
      };

      // Find grid containers
      const gridContainers = document.querySelectorAll('[class*="grid"], [style*="grid"], [style*="flex"]');

      gridContainers.forEach(container => {
        const cards = container.querySelectorAll('[class*="card"], [class*="Card"], [class*="item"]');
        if (cards.length >= 2) {
          const styles = window.getComputedStyle(container);
          const firstCard = cards[0];
          const cardStyles = window.getComputedStyle(firstCard);

          patterns.grids.push({
            cardCount: cards.length,
            display: styles.display,
            gap: styles.gap || styles.gridGap,
            cardsPerRow: Math.round(container.offsetWidth / firstCard.offsetWidth),
            cardStyle: {
              padding: cardStyles.padding,
              backgroundColor: cardStyles.backgroundColor,
              borderRadius: cardStyles.borderRadius,
              border: cardStyles.border,
              boxShadow: cardStyles.boxShadow
            },
            hasIcons: firstCard.querySelectorAll('svg, [class*="icon"]').length > 0,
            hasImages: firstCard.querySelectorAll('img').length > 0,
            iconPosition: firstCard.querySelector('svg, [class*="icon"]') ?
              (() => {
                const icon = firstCard.querySelector('svg, [class*="icon"]');
                const iconRect = icon.getBoundingClientRect();
                const cardRect = firstCard.getBoundingClientRect();
                return iconRect.top - cardRect.top < 50 ? 'top' : 'inline';
              })() : 'none'
          });
        }
      });

      return patterns;
    });

    // 4. COLOR SCHEME ANALYSIS
    console.log('4. Analyzing Color Scheme...');
    analysis.colorScheme = await page.evaluate(() => {
      const colors = {
        primary: [],
        backgrounds: [],
        text: [],
        gradients: [],
        accents: []
      };

      // Find buttons to extract primary colors
      const buttons = document.querySelectorAll('button, [class*="button"], [class*="btn"]');
      buttons.forEach(btn => {
        const styles = window.getComputedStyle(btn);
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.primary.push(styles.backgroundColor);
        }
      });

      // Find sections to extract background colors
      const sections = document.querySelectorAll('section, [class*="section"]');
      sections.forEach(section => {
        const styles = window.getComputedStyle(section);
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.backgrounds.push(styles.backgroundColor);
        }
        // Check for gradients
        if (styles.backgroundImage && styles.backgroundImage.includes('gradient')) {
          colors.gradients.push(styles.backgroundImage);
        }
      });

      // Extract most common colors (deduplicate)
      colors.primary = [...new Set(colors.primary)].slice(0, 5);
      colors.backgrounds = [...new Set(colors.backgrounds)].slice(0, 5);
      colors.gradients = [...new Set(colors.gradients)].slice(0, 3);

      return colors;
    });

    // 5. FORM/MODAL PATTERNS
    console.log('5. Analyzing Form/Modal Patterns...');
    analysis.formModals = await page.evaluate(() => {
      const patterns = {
        forms: [],
        modals: [],
        popups: []
      };

      // Find forms
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        const styles = window.getComputedStyle(form);

        patterns.forms.push({
          fieldCount: inputs.length,
          fieldTypes: [...inputs].map(i => i.type || i.tagName.toLowerCase()),
          layout: styles.display,
          gap: styles.gap,
          position: form.closest('[class*="modal"]') ? 'modal' : 'inline'
        });
      });

      // Find modals
      const modals = document.querySelectorAll('[class*="modal"], [class*="Modal"], [role="dialog"]');
      patterns.modals = modals.length;

      return patterns;
    });

    // 6. WEIGHT LOSS/GLP-1/PEPTIDE SPECIFIC PATTERNS
    console.log('6. Analyzing Weight Loss/Peptide Specific Elements...');
    analysis.weightLossSpecific = await page.evaluate(() => {
      const specific = {
        beforeAfter: false,
        resultStats: [],
        medicalDisclaimer: false,
        doctorImages: false,
        comparisonCharts: false,
        keywords: {
          glp1: false,
          semaglutide: false,
          tirzepatide: false,
          peptide: false,
          weightLoss: false,
          compounded: false
        }
      };

      const bodyText = document.body.textContent.toLowerCase();

      // Check keywords
      specific.keywords.glp1 = bodyText.includes('glp-1') || bodyText.includes('glp1');
      specific.keywords.semaglutide = bodyText.includes('semaglutide');
      specific.keywords.tirzepatide = bodyText.includes('tirzepatide');
      specific.keywords.peptide = bodyText.includes('peptide');
      specific.keywords.weightLoss = bodyText.includes('weight loss') || bodyText.includes('weight-loss');
      specific.keywords.compounded = bodyText.includes('compound');

      // Check for before/after sections
      specific.beforeAfter = bodyText.includes('before') && bodyText.includes('after') &&
                             (bodyText.includes('result') || bodyText.includes('transformation'));

      // Check for medical disclaimers
      specific.medicalDisclaimer = bodyText.includes('disclaimer') ||
                                   bodyText.includes('individual results may vary') ||
                                   bodyText.includes('consult');

      // Check for doctor images
      specific.doctorImages = document.querySelectorAll('img[alt*="doctor"], img[alt*="Dr."], [class*="doctor"]').length > 0;

      // Check for comparison charts/tables
      specific.comparisonCharts = document.querySelectorAll('table, [class*="comparison"], [class*="chart"]').length > 0;

      // Find stats
      const statElements = document.querySelectorAll('[class*="stat"], [class*="metric"], [class*="number"]');
      statElements.forEach(stat => {
        const text = stat.textContent;
        if (text.match(/\d+%|\d+\s*(lbs|pounds|kg)/i)) {
          specific.resultStats.push(text.trim().substring(0, 50));
        }
      });

      return specific;
    });

    // Take screenshot
    const screenshotPath = path.join(__dirname, 'screenshots', `${siteName.replace(/\s+/g, '-')}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);

    console.log(`\nAnalysis complete for ${siteName}`);
    return analysis;

  } catch (error) {
    console.error(`Error analyzing ${siteName}:`, error.message);
    analysis.error = error.message;
    return analysis;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const allAnalyses = {
    generalTelehealth: [],
    peptideWeightLoss: [],
    timestamp: new Date().toISOString()
  };

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Analyze general telehealth sites
  console.log('\n\n' + '='.repeat(80));
  console.log('ANALYZING GENERAL TELEHEALTH SITES');
  console.log('='.repeat(80));

  for (const site of sites.generalTelehealth) {
    const page = await context.newPage();
    const analysis = await analyzePage(page, site.name, site.url);
    allAnalyses.generalTelehealth.push(analysis);
    await page.close();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
  }

  // Analyze peptide/weight loss sites
  console.log('\n\n' + '='.repeat(80));
  console.log('ANALYZING PEPTIDE/WEIGHT LOSS SITES');
  console.log('='.repeat(80));

  for (const site of sites.peptideWeightLoss) {
    const page = await context.newPage();
    const analysis = await analyzePage(page, site.name, site.url);
    allAnalyses.peptideWeightLoss.push(analysis);
    await page.close();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
  }

  // Save results
  const resultsPath = path.join(__dirname, 'landing-page-analysis.json');
  fs.writeFileSync(resultsPath, JSON.stringify(allAnalyses, null, 2));
  console.log(`\n\nResults saved to: ${resultsPath}`);

  await browser.close();
  console.log('\n\nAnalysis complete!');
}

main().catch(console.error);
