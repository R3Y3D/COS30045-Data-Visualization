# Exercise 3: Presenting the Television Energy Consumption Data Story

**Student Name:** Ibrahim Mahbub  
**Unit:** Data Visualisation (COS30045)  
**Project:** Appliance Energy Consumption Website (Australian Market Context)

---

## 📖 1. Data Story Overview

### Target Audience
The primary audience for this website and visualization consists of **Australian residential consumers, renters, and prospective home appliance buyers**. Many consumers shop for televisions based almost solely on screen dimension, refresh rates, and upfront retail price, often overlooking ongoing lifecycle electricity charges.

### Audience Interest & Analytical Goals
- **Budget Sensitivity:** Australian retail electricity rates have seen sharp increases (averaging between 28¢ and 38¢ per kWh across NSW, VIC, and QLD). Consumers want to know how much their viewing habits contribute to quarterly bills.
- **Technology Trade-Offs:** The audience wants clear comparisons between popular display options (LED/LCD, QLED, OLED) to evaluate whether premium display features cause substantial energy penalties.
- **Actionable Decision-Making:** Consumers need understandable metrics (annual dollars spent and GEMS star ratings) rather than confusing electrical values (watts, duty cycles) to make informed purchases.

---

## 📊 2. About the Data

### Data Source
The data utilized in this study is based on the **Australian Government Energy Rating Database**, governed under the *Greenhouse and Energy Minimum Standards (GEMS) Act 2012* (accessible via [energyrating.gov.au](https://www.energyrating.gov.au/)). Baseline wattage figures reflect standard compliance testing against **AS/NZS 62087** (*Power consumption of audio, video and related equipment*) and **AS/NZS 5815** (*Information technology equipment - Energy consumption*).

### Data Processing
1. **Selection & Grouping:** Models were grouped into standard 55-inch display dimensions across the four dominant consumer categories: Backlit LED, QLED, Self-Emissive OLED, and legacy Plasma displays.
2. **Duty Cycle Normalization:** Annual consumption figures ($kWh/year$) were normalized to standard Australian testing assumptions:
   $$\text{Daily Consumption (kWh)} = \frac{\text{On-Mode Power (Watts)} \times 5\text{ hours} + \text{Standby Power (Watts)} \times 19\text{ hours}}{1000}$$
3. **Financial Estimation:** Estimated annual running costs were computed using the national average residential electricity tariff of **$0.32 AUD per kWh**.

### Privacy
All data points represent publicly accessible, certified model technical specifications and aggregated regulatory averages. No private consumer data, household telemetry, or identifiable customer information was gathered or stored.

### Accuracy and Limitations
- **Dynamic Content Variation:** Testing against AS/NZS 62087 utilizes standardized reference video loops. Actual consumer power consumption varies based on dynamic contrast settings, ambient room illumination, volume levels, and HDR/Dolby Vision processing.
- **Standby Mode Divergence:** Network-connected Smart TVs ("Wake-on-LAN/Quick-Start") can draw significantly more power in standby mode than the baseline 0.5W–1.0W passive standard if background app refreshes are active.
- **Tariff Diversity:** Energy costs are calculated at a flat 32¢/kWh. Real-world costs vary between states (e.g., higher peak tariffs in SA and regional areas versus flat rates in the ACT).

### Ethics
The data presentation prioritizes objectivity, avoiding brand bias or misleading visual scales. Clear distinctions are drawn between older obsolete technologies (Plasma) and modern active technologies (LED/OLED) to prevent alarmist cost interpretations while promoting responsible energy consumption.

---

## 🤖 3. Generative AI Declaration

In accordance with Swinburne University assessment guidelines:
- **AI Tool Used:** Gemini.
- **Nature of Assistance:** 
  1. Structuring semantic HTML5 page scaffolding for the multi-chapter data story.
  2. Synthesizing technical references for Australian standards (ACMA, RCM, GEMS, and AS/NZS 62087).
  3. Designing CSS variables to ensure strict visual harmony with the site's power logo palette.
  4. Drafting the formal *About the Data* analytical evaluation in this `README.md`.
- **Student Ownership:** All code structures, relative file references (`./assets/...`), data points, styling implementations, and documentation reviews were validated and deployed by the author.