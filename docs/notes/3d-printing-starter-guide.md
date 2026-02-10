---
title: 3D Printing Starter Guide
created: 2026-02-08
updated: 2026-02-08
tags: [3d-printing, hardware, printers, AI-integration, research]
summary: Entry-level 3D printer recommendations, software toolchain, and how Jarvis can assist with the workflow
priority: medium
---

# 3D Printing Starter Guide

A practical, no-nonsense guide to getting into 3D printing in 2026 — what to buy, what software to use, and how Jarvis integrates into the workflow.

---

## 1. Best Entry-Level 3D Printers (2025-2026)

### FDM Printers

#### Bambu Lab A1 Mini — Best Overall for Beginners
- **Price:** $199-$239 (standalone) / $339-$389 (with AMS Lite for multi-color)
- **Build Volume:** 180 x 180 x 180 mm
- **Max Speed:** 500 mm/s, 10,000 mm/s² acceleration
- **Hotend Temp:** Up to 300C (all-metal)
- **Filaments:** PLA, PETG, TPU, PVA
- **Noise:** Under 48 dB in silent mode
- **Setup:** Pre-assembled, ~20 minutes to first print
- **Pros:** Plug-and-play, excellent print quality for price, multi-color with AMS Lite, great software ecosystem (Bambu Studio), silent mode, auto-leveling, Wi-Fi with camera
- **Cons:** Small build volume (7" cube), proprietary ecosystem, Bambu's cloud dependency has caused community concerns
- **Community:** Large and growing, active Discord and Reddit

#### Bambu Lab A1 — Best Mid-Range
- **Price:** ~$299 (standalone) / ~$449 (with AMS Lite)
- **Build Volume:** 256 x 256 x 256 mm
- **Max Speed:** 500 mm/s
- **Filaments:** PLA, PETG, TPU, ABS, ASA, PVA
- **Pros:** Bigger build volume than Mini, same excellent ecosystem, auto-leveling, vibration compensation
- **Cons:** Open frame (no enclosure — limits ABS printing), still proprietary

#### Bambu Lab P1S — Best Enclosed Printer Under $500
- **Price:** $399-$499 (on sale) / $699 (MSRP) / ~$599 with AMS
- **Build Volume:** 256 x 256 x 256 mm
- **Max Speed:** 500 mm/s, 20,000 mm/s² acceleration
- **Filaments:** PLA, PETG, ABS, ASA, TPU, PA, PC (enclosure enables high-temp materials)
- **Pros:** Full enclosure with HEPA filter, Core XY design, built-in camera, handles ABS/ASA without issues, fast
- **Cons:** Higher price, AMS is extra, cloud dependency concerns
- **Verdict:** If budget allows, this is the one to get. The enclosure opens up material options significantly.

#### Creality Ender-3 V3 KE — Best Budget Option
- **Price:** $199-$259
- **Build Volume:** 220 x 220 x 240 mm
- **Max Speed:** 300 mm/s (500 mm/s on newer V3)
- **Filaments:** PLA, PETG, TPU
- **Pros:** Klipper firmware, huge community (largest in 3D printing), auto bed leveling, direct drive extruder, tons of upgrade paths, open source
- **Cons:** More tinkering required than Bambu, print quality requires tuning, slower than Bambu at stock settings
- **Community:** Massive — decades of Ender community knowledge, YouTube tutorials for everything

#### Creality Ender-3 V3 — The Standard V3
- **Price:** $299-$389
- **Build Volume:** 220 x 220 x 250 mm
- **Max Speed:** 600 mm/s
- **Pros:** Significant speed upgrade over KE, Core XY motion system, Klipper firmware, auto-leveling
- **Cons:** Still open frame, Creality software less polished than Bambu

#### Prusa MK4S — Best for Reliability and Open Source
- **Price:** ~$529 (kit) / ~$629 (assembled) — recently had a permanent price drop
- **Build Volume:** 250 x 210 x 220 mm
- **Max Speed:** ~200 mm/s (slower than Chinese competitors but very reliable)
- **Filaments:** PLA, PETG, ABS, ASA, TPU, PA, PC (with enclosure add-on)
- **Pros:** Rock-solid reliability, fully open-source hardware and firmware, excellent documentation, PrusaSlicer is best-in-class, input shaper, Prusa Connect for remote management, Ethernet + Wi-Fi, amazing customer support
- **Cons:** Significantly more expensive for what you get, slower than Bambu/Creality, no enclosure by default
- **Community:** Passionate open-source community, excellent wiki and forums
- **Verdict:** The Toyota Camry of 3D printers. Not flashy, but it just works, year after year. Ideal if you value reliability over speed.

#### Prusa Mini+ — Budget Prusa
- **Price:** ~$460
- **Build Volume:** 180 x 180 x 180 mm
- **Pros:** Prusa reliability in a smaller package, SuperPINDA auto-leveling, Ethernet/Wi-Fi, same great community
- **Cons:** Overpriced compared to Bambu A1 Mini at $199 with similar build volume. Hard to recommend in 2026 unless you specifically want Prusa ecosystem.

#### Elegoo Neptune 4 — Budget Speed Demon
- **Price:** ~$177-$199
- **Build Volume:** 225 x 225 x 265 mm
- **Max Speed:** 500 mm/s
- **Filaments:** PLA, PETG, TPU
- **Pros:** Cheapest high-speed printer, Klipper firmware, 121-point auto leveling, 300C hotend, great build volume for the price
- **Cons:** Quality control inconsistent, community smaller than Creality/Bambu, software ecosystem less polished
- **Neptune 4 Pro:** ~$209-$275, adds linear rails and better build quality

#### AnkerMake M5C — Simplest Setup
- **Price:** $249-$399
- **Build Volume:** 220 x 220 x 250 mm
- **Max Speed:** 500 mm/s (but quality degrades above 250 mm/s)
- **Pros:** One-button operation, excellent app, auto bed leveling, 300C all-metal hotend, great for complete beginners who want zero tinkering
- **Cons:** No display screen (app-only control), print quality at max speed is poor (ringing, cooling issues), smaller community, limited upgrade path
- **Verdict:** Good hardware, but the "app-only" approach is limiting. At this price, the Bambu A1 is better.

### Resin Printers

#### Elegoo Mars 4 (9K) — Best Entry Resin
- **Price:** $149-$160
- **Build Volume:** 153 x 77 x 165 mm (small)
- **Resolution:** 9K (4098 x 2560)
- **Pros:** Incredible detail for miniatures/jewelry, cheap entry point, replaceable tempered glass
- **Cons:** Tiny build volume, resin is toxic (requires gloves, ventilation), messy workflow, post-processing required (washing + curing)

#### Elegoo Saturn 4 Ultra (12K) — Best Mid-Range Resin
- **Price:** $420-$500
- **Resolution:** 12K
- **Pros:** Larger build volume, tilt-release technology for faster prints, stunning detail
- **Cons:** Expensive, resin safety requirements, more complex workflow

### The Clear Recommendation

**For a first printer: Bambu Lab A1 Mini ($199-$239).** Here is why:

1. Lowest barrier to entry — prints within 20 minutes of unboxing
2. Excellent print quality at stock settings
3. Great software (Bambu Studio or OrcaSlicer)
4. Quiet enough for a bedroom/office
5. Multi-color option with AMS Lite when ready
6. Large enough for most beginner projects

**If budget allows ($400-$500): Bambu Lab P1S.** The enclosure unlocks ABS/ASA for functional parts, and the Core XY is faster and more precise.

**If you value open source and tinkering: Creality Ender-3 V3 or Prusa MK4S.** Both have huge communities and teach you more about how 3D printing actually works.

---

## 2. FDM vs Resin Printing

### FDM (Fused Deposition Modeling)
- **How it works:** Melts plastic filament and deposits it layer by layer
- **Best for:** Functional parts, enclosures, brackets, toys, large objects, prototypes
- **Layer height:** 0.08-0.32 mm typical
- **Materials:** PLA, PETG, ABS, TPU, Nylon, PC, and more
- **Post-processing:** Minimal — remove supports, optional sanding/painting
- **Safety:** Generally safe. ABS emits fumes (need ventilation). PLA is essentially odorless.
- **Cost per print:** Very low ($0.50-$5 for most prints)

### Resin (MSLA/DLP)
- **How it works:** UV light cures liquid resin layer by layer
- **Best for:** Miniatures, jewelry, dental models, anything requiring extreme detail
- **Layer height:** 0.01-0.05 mm (10-50 microns — much finer than FDM)
- **Materials:** Standard resin, tough resin, flexible resin, castable resin
- **Post-processing:** Significant — wash in IPA/cleaning solution, UV cure, remove supports
- **Safety:** CRITICAL CONSIDERATIONS:
  - Uncured resin is toxic — causes skin irritation and sensitization
  - Always wear nitrile gloves (not latex)
  - Require adequate ventilation or an enclosure with carbon filter
  - IPA is flammable
  - Cannot pour resin down the drain — must cure waste resin with UV before disposal
  - Not suitable for spaces without ventilation (apartments, bedrooms)
- **Cost per print:** Higher than FDM ($1-$10+ depending on size and resin type)

### When to Choose What

| Use Case | FDM | Resin |
|----------|-----|-------|
| Phone cases, brackets, organizers | Yes | No |
| D&D miniatures, figurines | No | Yes |
| Large objects (>6 inches) | Yes | No |
| Jewelry prototypes | No | Yes |
| Functional mechanical parts | Yes | No |
| Smooth surface finish needed | No | Yes |
| Kids/family environment | Yes | No (toxic) |
| First printer ever | Yes | No |

**Start with FDM.** Add resin later if you need ultra-fine detail.

---

## 3. Software Toolchain

### CAD / 3D Modeling (Design Phase)

#### TinkerCAD (Free, Browser-based)
- **Best for:** Absolute beginners, simple geometric shapes
- **Strengths:** Drag-and-drop interface, no learning curve, runs in browser
- **Limitations:** Cannot do complex organic shapes, limited precision
- **Verdict:** Great for first week. You will outgrow it fast.

#### Fusion 360 (Free for personal use)
- **Best for:** Functional/mechanical parts, parametric design
- **Strengths:** Industry-standard parametric CAD, timeline-based history, assemblies, simulation, CAM
- **Limitations:** Steep learning curve (2-4 weeks to be productive), cloud-dependent, Autodesk has been restricting free tier
- **Verdict:** The serious choice for functional parts. Worth learning.

#### Blender (Free, Open Source)
- **Best for:** Artistic/organic shapes, characters, sculptures
- **Strengths:** Incredibly powerful, massive community, sculpting tools, animation
- **Limitations:** Not parametric — bad for precise mechanical parts, very steep learning curve
- **Verdict:** Use for artistic work, not engineering.

#### OpenSCAD (Free, Open Source)
- **Best for:** Programmers and AI-generated models
- **Strengths:** Text-based (code generates 3D models), parametric by nature, perfect for AI assistants to generate, fully scriptable, reproducible
- **Limitations:** No visual editor, requires programming mindset, poor for organic shapes
- **Verdict:** This is the key tool for Jarvis integration. More on this below.

#### FreeCAD (Free, Open Source)
- **Best for:** Engineers who want a free Fusion 360 alternative
- **Strengths:** Parametric modeling, no cloud dependency, active development
- **Limitations:** UI is clunky, occasional bugs, smaller community than Fusion 360
- **Verdict:** Solid but rough around the edges. Improving rapidly.

### Slicing Software (Preparation Phase)

Slicers convert 3D models into instructions (G-code) that tell the printer how to move.

#### Bambu Studio (Free)
- **Best for:** Bambu Lab printer owners
- **Strengths:** Fast, integrated with Bambu ecosystem, one-click print to printer, simple UI
- **Limitations:** Primarily for Bambu printers
- **Fork of:** PrusaSlicer

#### OrcaSlicer (Free, Open Source)
- **Best for:** Everyone — the emerging universal standard
- **Strengths:** Forked from Bambu Studio, supports 130+ printer profiles (Creality, Prusa, Voron, AnkerMake, Bambu), built-in calibration tools, modern UI, multi-color painting, machine-learning-style tuning
- **Limitations:** Newer project, documentation still catching up
- **Verdict:** The slicer to learn. Works with everything. Best calibration tools.

#### PrusaSlicer (Free, Open Source)
- **Best for:** Prusa owners, advanced users who want maximum control
- **Strengths:** Battle-tested, excellent documentation, deep customization, reliable
- **Limitations:** UI showing its age, fewer built-in printer profiles than OrcaSlicer
- **Verdict:** Still excellent. OrcaSlicer is based on it.

#### Cura (Free, Open Source)
- **Best for:** Legacy users, production environments
- **Strengths:** Hundreds of official printer profiles, plugin marketplace, fastest slicing engine
- **Limitations:** UI feels dated, slower development pace, UltiMaker-focused
- **Verdict:** Was the default for years. OrcaSlicer has overtaken it for most users.

### File Formats

| Format | Purpose | Notes |
|--------|---------|-------|
| **STL** | Most common 3D print format | Mesh only, no color/material info. Universal. |
| **3MF** | Modern replacement for STL | Includes color, material, print settings. Preferred by Bambu/Prusa. |
| **STEP** | Engineering exchange format | Preserves parametric data. Use for CAD-to-CAD transfer. |
| **OBJ** | Mesh with texture/color | Common in artistic/game workflows. |
| **SCAD** | OpenSCAD source code | Text file — generates STL when compiled. Perfect for AI. |
| **G-code** | Printer instructions | Output of slicer. Machine-specific. Do not share between different printers. |

**Workflow:** Design in CAD (STEP/SCAD) -> Export STL/3MF -> Slice to G-code -> Send to printer

### Model Repositories (Finding Pre-Made Models)

#### Printables (printables.com) — Recommended
- Run by Prusa, large library, good search, active community
- Most models are free, quality is generally high

#### Thingiverse (thingiverse.com) — Largest Library
- The original repository, massive catalog
- Website is slow and buggy, many old/broken designs, but still has the most models

#### MyMiniFactory (myminifactory.com)
- Curated quality, mix of free and paid
- Strong for miniatures and artistic prints

#### Thangs (thangs.com)
- AI-powered search across multiple repositories
- Geometric search (find models by shape, not just keywords)
- Aggregates from Thingiverse, Printables, and others

---

## 4. How Jarvis (AI) Can Help with 3D Printing

This is where it gets interesting. An AI assistant can meaningfully integrate with the 3D printing workflow in several ways.

### Generate 3D Models via OpenSCAD Scripts

OpenSCAD uses a text-based scripting language to define 3D geometry. This is perfect for AI because:
- No GUI needed — pure text in, STL out
- Parametric by default — change dimensions by changing variables
- Reproducible — same script always produces same model
- Jarvis can write, modify, and debug OpenSCAD scripts directly

**Example workflow:**
1. Mo says: "I need a wall-mounted holder for 3 USB cables, 6mm diameter each, spaced 20mm apart"
2. Jarvis writes an OpenSCAD script with those parameters
3. Script compiles to STL
4. STL goes into slicer, then to printer

**Tools that enable this:**
- **OpenSCAD CLI** — `openscad -o output.stl input.scad` (renders script to STL)
- **PromptSCAD** — AI-powered OpenSCAD generator with live preview
- **Chat-To-STL** — Dockerized app that converts text prompts to STL via OpenAI + OpenSCAD

**Limitations:** OpenSCAD is great for geometric/mechanical shapes but cannot do organic shapes (characters, sculptures). For those, use AI image-to-3D tools instead.

### AI Image-to-3D Model Generation

For organic or complex shapes that are hard to describe in code:

- **TripoSR** (by Tripo AI + Stability AI): Open-source, generates textured 3D mesh from a single image in 10-30 seconds. Free tier available. Good for quick prototyping.
- **Meshy.ai**: Text-to-3D and image-to-3D. Excels at game-ready assets. Exports FBX, OBJ, glTF. Best for speed.
- **Tripo AI Platform**: 40M+ models generated, 3M+ users. Converts text prompts and reference images to 3D assets. Clean topology output.
- **Point-E** (by OpenAI): Generates models from text prompts. Fast, runs on modest hardware. Good for rapid prototyping.

**Jarvis integration:** Mo sends a photo or description -> Jarvis uses one of these APIs to generate a 3D mesh -> post-processes in Blender/MeshLab if needed -> sends to slicer.

### Monitor Print Progress via OctoPrint/Mainsail API

3D prints take hours. Remote monitoring prevents wasted time and filament.

**OctoPrint** (Raspberry Pi-based):
- REST API for full printer control (start, stop, pause, temperature, file upload)
- Webcam streaming for visual monitoring
- Plugin ecosystem (bed leveling visualizer, filament manager, Telegram notifications)
- Jarvis can: check print progress, detect failures via camera, pause/cancel failed prints, queue next job

**Mainsail/Fluidd** (Klipper-based):
- Modern web UI for Klipper firmware printers
- Moonraker API backend — full programmatic control
- Jarvis can integrate via Moonraker REST API

**Bambu Lab Cloud/LAN:**
- Bambu printers have built-in Wi-Fi and camera
- Bambu Studio can send prints directly
- LAN-mode available for local control without cloud

**OctoEverywhere / Obico:**
- Cloud services that provide secure remote access to OctoPrint/Mainsail from anywhere
- Obico includes AI-powered print failure detection (detects spaghetti, warping, adhesion failures)
- Jarvis could integrate with these for monitoring prints when away from home network

### Print Queue Management

Jarvis can manage a print queue:
- Maintain a list of pending prints with priorities
- Estimate print times from slicer output
- Track filament usage and remaining spool weight
- Notify Mo when a print is done and next one can start
- Keep a log of completed prints with settings used (for reproducibility)

### Troubleshooting Common Print Failures

Jarvis can diagnose issues from descriptions or photos:

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| **Stringing** (thin threads between parts) | Retraction too low, temp too high | Increase retraction distance/speed, lower temp 5C |
| **Warping** (corners lifting) | Bed too cool, no adhesion aid, draft | Increase bed temp, use glue stick/hairspray, use enclosure |
| **Poor bed adhesion** | Bed not level, too far from nozzle | Re-level bed, clean with IPA, reduce Z-offset |
| **Layer shifting** | Belt loose, speed too high, motors overheating | Tighten belts, reduce speed, check motor current |
| **Under-extrusion** | Clogged nozzle, filament tangle, temp too low | Cold pull to clear nozzle, check spool, increase temp |
| **Elephant's foot** (first layer squished) | Nozzle too close, bed too hot | Increase Z-offset slightly, lower bed temp |
| **Spaghetti** (print detached, printing in air) | Adhesion failure mid-print | Better bed prep, slower first layer, use brim |
| **Ringing/ghosting** (ripples on surface) | Speed too high, loose belts | Reduce speed, tighten belts, enable input shaper |

### Material Recommendations Based on Use Case

Jarvis can recommend the right filament:

- "I need a phone stand" -> PLA (easy, looks good, no stress)
- "I need a bracket for my car" -> PETG or ABS (heat resistant, strong)
- "I need a flexible phone case" -> TPU (flexible, impact resistant)
- "I need a waterproof outdoor part" -> ASA or PETG (UV resistant, weather resistant)
- "I need food-safe containers" -> PETG with food-safe coating (PLA degrades, ABS is not food-safe)

### Cost Estimation Per Print

Jarvis can estimate costs given:
- Filament weight from slicer (grams)
- Filament cost per kg (PLA: ~$15-25/kg, PETG: ~$20-30/kg, ABS: ~$18-25/kg)
- Electricity cost (typically negligible: $0.01-0.05 per print)
- Print time (for machine wear estimation)

**Formula:** `Cost = (weight_grams / 1000) * price_per_kg + electricity`

A typical small print (50g PLA): ~$1.00. A large print (300g PETG): ~$7.50.

---

## 5. Materials Guide

### PLA (Polylactic Acid)

| Property | Value |
|----------|-------|
| Nozzle Temp | 190-220C (start at 200C) |
| Bed Temp | 50-60C |
| Heated Bed Required | No (but recommended) |
| Enclosure Needed | No |
| Difficulty | Easiest |
| Strength | Low-Medium |
| Heat Resistance | Poor (deforms at ~55C) |
| Flexibility | Rigid, brittle |
| Smell | Minimal (slightly sweet) |
| Cost | $15-25/kg |

**Best for:** Decorative items, prototypes, toys, desk organizers, cosplay props, anything not exposed to heat or heavy stress.

**The beginner filament.** Start here. Get comfortable with your printer using PLA before trying anything else.

### PETG (Polyethylene Terephthalate Glycol)

| Property | Value |
|----------|-------|
| Nozzle Temp | 230-250C (start at 235C) |
| Bed Temp | 70-80C |
| Heated Bed Required | Yes |
| Enclosure Needed | No (but helps) |
| Difficulty | Easy-Moderate |
| Strength | Medium-High |
| Heat Resistance | Good (deforms at ~80C) |
| Flexibility | Slightly flexible, less brittle than PLA |
| Smell | Minimal |
| Cost | $20-30/kg |

**Best for:** Functional parts, outdoor use, water bottles, mechanical components, anything needing more durability than PLA.

**The upgrade from PLA.** Stronger, more heat resistant, still easy to print. The "if in doubt, use PETG" material.

### ABS (Acrylonitrile Butadiene Styrene)

| Property | Value |
|----------|-------|
| Nozzle Temp | 240-260C (start at 245C) |
| Bed Temp | 100-110C |
| Heated Bed Required | Yes |
| Enclosure Needed | Yes (warps badly without) |
| Difficulty | Hard |
| Strength | High |
| Heat Resistance | Good (deforms at ~100C) |
| Flexibility | Tough, impact resistant |
| Smell | Strong, toxic fumes — needs ventilation |
| Cost | $18-25/kg |

**Best for:** Automotive parts, electronics housings, anything needing impact resistance and heat tolerance. LEGO bricks are made from ABS.

**Not beginner-friendly.** Requires enclosure, warps easily, emits styrene fumes. Use PETG instead unless you specifically need ABS properties. If printing ABS, ensure room ventilation or use a printer with HEPA/carbon filter (like the P1S).

### TPU (Thermoplastic Polyurethane)

| Property | Value |
|----------|-------|
| Nozzle Temp | 210-230C (start at 220C) |
| Bed Temp | 30-60C |
| Heated Bed Required | No |
| Enclosure Needed | No |
| Difficulty | Moderate-Hard |
| Strength | High (impact) |
| Heat Resistance | Moderate |
| Flexibility | Very flexible (rubber-like) |
| Smell | Minimal |
| Cost | $25-40/kg |

**Best for:** Phone cases, vibration dampeners, gaskets, shoe insoles, drone bumpers, anything that needs to flex or absorb impact.

**Requires direct drive extruder** (not Bowden tube). Most modern printers (Bambu, newer Creality, Prusa) have direct drive. Print SLOW (30-50 mm/s). TPU jams easily if you rush it.

### Quick Reference

| Material | Ease | Strength | Heat | Flexibility | Use Case |
|----------|------|----------|------|-------------|----------|
| PLA | Easy | Low | Poor | Rigid | Decor, prototypes |
| PETG | Easy | Medium | Good | Slight | Functional parts |
| ABS | Hard | High | Good | Tough | Automotive, electronics |
| TPU | Medium | High | Moderate | Very flexible | Cases, dampeners |

---

## 6. Getting Started Roadmap

### Phase 1: First Printer (Week 1-2)

**Goal:** Unbox, set up, print first successful model.

1. Buy a Bambu Lab A1 Mini ($199-$239) or P1S ($399-$500)
2. Buy 2 spools of PLA filament — one white, one color of choice ($15-20 each)
3. Unbox and follow setup guide (20-60 minutes)
4. Install Bambu Studio or OrcaSlicer on your computer
5. Print the included test model (usually a Benchy boat)
6. Download and print 3-5 simple models from Printables.com
7. Learn the basics: bed leveling, filament loading, removing prints

### Phase 2: Skill Building (Week 3-8)

**Goal:** Design your own parts, understand settings.

1. Learn TinkerCAD for simple custom designs (1-2 hours to learn)
2. Start Fusion 360 tutorials (dedicate 30 min/day for 2 weeks)
3. Experiment with slicer settings:
   - Layer height (0.2mm standard, 0.12mm detail, 0.28mm fast)
   - Infill percentage (15% for decorative, 40% for functional, 100% for maximum strength)
   - Support structures (when and how to use them)
   - Print speed (balance quality vs time)
4. Print functional items for your home/desk — hooks, organizers, mounts
5. Try PETG for something that needs to be stronger
6. Install OctoPrint on a Raspberry Pi for remote monitoring (optional)

### Phase 3: Jarvis Integration (Week 8-12)

**Goal:** AI-assisted printing workflow.

1. Install OpenSCAD — practice writing simple scripts
2. Set up Jarvis -> OpenSCAD pipeline:
   - Jarvis writes .scad files based on descriptions
   - CLI renders to STL: `openscad -o part.stl part.scad`
   - STL goes to slicer -> printer
3. Set up OctoPrint/Mainsail API access for Jarvis
4. Build print queue management in kanban board
5. Create material database with settings profiles
6. Start logging prints (settings, filament used, results) for future reference

### Phase 4: Advanced / Print Farm (Month 3+)

**Goal:** Multiple printers, automated workflow, production capability.

1. Add a second printer (or upgrade to P1S if started with A1 Mini)
2. Explore multi-color printing with AMS
3. Try resin printing for detail work (if use case exists)
4. Set up automated print farm management:
   - Jarvis monitors all printers via API
   - Print queue with priority scheduling
   - Automatic failure detection (via Obico AI or camera analysis)
   - Filament inventory tracking
   - Cost tracking per project
5. Explore selling prints or offering a print service

---

## 7. Budget Breakdown

### Minimum Viable Setup — $250-$300

| Item | Cost |
|------|------|
| Bambu Lab A1 Mini | $199-$239 |
| PLA filament (2 spools) | $30-$40 |
| Flush cutters (for support removal) | $5-$10 |
| IPA spray bottle (bed cleaning) | $5 |
| Scraper/spatula | $5-$10 |
| **Total** | **$244-$304** |

### Recommended Setup — $500-$650

| Item | Cost |
|------|------|
| Bambu Lab P1S | $399-$499 |
| PLA filament (3 spools) | $45-$60 |
| PETG filament (1 spool) | $20-$25 |
| Basic tool kit (cutters, scrapers, deburring tool, tweezers) | $15-$25 |
| IPA + microfiber cloths | $10 |
| Filament dry box or vacuum bags | $15-$30 |
| **Total** | **$504-$649** |

### Full Jarvis-Integrated Setup — $700-$1000

| Item | Cost |
|------|------|
| Bambu Lab P1S with AMS | $549-$649 |
| Filament variety pack (PLA, PETG, TPU) | $60-$80 |
| Raspberry Pi 4/5 for OctoPrint (if not using Bambu cloud) | $50-$80 |
| Webcam for monitoring (if using OctoPrint) | $20-$40 |
| Tool kit + storage | $25-$40 |
| Filament dry box | $25-$35 |
| Calipers (for measuring parts) | $15-$25 |
| **Total** | **$744-$949** |

### Ongoing Costs

- PLA filament: ~$20/kg (a spool lasts weeks of regular printing)
- PETG filament: ~$25/kg
- Replacement nozzles: ~$2-5 each (replace every few months)
- PEI print sheet replacement: ~$15-25 (lasts 6-12 months)
- Electricity: negligible (~$1-2/month for regular use)

**Bottom line:** You can start 3D printing for under $250. A properly equipped setup with AI integration potential runs about $700-$900. Ongoing filament costs are very low — most hobbyists spend $20-$40/month.

---

## Summary of Recommendations

1. **First printer:** Bambu Lab A1 Mini ($199) or P1S ($400-500) depending on budget
2. **First filament:** PLA, then PETG when ready
3. **Slicer:** OrcaSlicer (works with everything) or Bambu Studio (if Bambu printer)
4. **CAD:** TinkerCAD to start, Fusion 360 to grow into, OpenSCAD for AI integration
5. **AI workflow:** OpenSCAD scripts are the primary bridge between Jarvis and physical objects
6. **Monitoring:** Bambu Cloud for Bambu printers, OctoPrint for everything else
7. **Skip for now:** Resin printing (add later if needed), ABS (use PETG instead), Prusa Mini+ (overpriced vs Bambu)

---

*Research compiled February 2026. Prices fluctuate — check current listings before purchasing.*
