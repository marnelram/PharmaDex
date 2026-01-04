# Brand vs Generic Drug Database - Project Plan

## Overview

Create a comprehensive JSON database of the top 5,000 most commonly used medications in the US, including brand names, generic names, drug classes, indications, and formulations.

---

## Scope

| Field | Decision |
|-------|----------|
| **Drug count** | ~5,000 most common drugs |
| **Drug types** | Prescription + OTC |
| **Indications** | Primary/most common only |
| **Drug class** | Mechanism-based (e.g., "ACE inhibitor") |
| **Entry structure** | One per drug, formulations as array |
| **Bonus** | Flag drugs that sound like Pokémon names |

---

## JSON Schema

```json
{
  "drugs": [
    {
      "brandName": "Lipitor",
      "genericName": "atorvastatin",
      "drugClass": "HMG-CoA reductase inhibitor (statin)",
      "indications": ["Hyperlipidemia", "ASCVD prevention"],
      "formulations": ["tablet"],
      "strengths": ["10mg", "20mg", "40mg", "80mg"],
      "route": "oral",
      "soundsLikePokemon": false
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "YYYY-MM-DD",
    "totalCount": 5000,
    "sources": []
  }
}
```

---

## Data Sources

| Source | What it provides | Priority |
|--------|------------------|----------|
| **ClinCalc Top 300** | Most prescribed drugs by Rx volume | High |
| **CMS Medicare Part D Spending Data** | Drug utilization stats | High |
| **FDA Orange Book** | Approved drug products | Medium |
| **openFDA API** | Brand/generic names, formulations, routes | Medium |
| **RxClass API** | Drug class information | High |
| **DailyMed** | Indications, labeling info | High |
| **RxNorm** | Standardized drug naming | Medium |

---

## Build Strategy

### Phase 1: Core List (Top 500)
- [ ] Compile Top 200 prescribed drugs (ClinCalc)
- [ ] Add Top 100 OTC drugs
- [ ] Add Top 100 hospital/specialty drugs
- [ ] Add common injectables, inhalers, topicals
- [ ] Populate all fields for each drug
- [ ] Flag Pokémon-sounding names

### Phase 2: Expansion (500 → 2,000)
- [ ] Expand each major therapeutic category
- [ ] Add less common but clinically important drugs
- [ ] Include controlled substances (all schedules)
- [ ] Add biosimilars and specialty drugs

### Phase 3: Comprehensive (2,000 → 5,000)
- [ ] Fill gaps in therapeutic categories
- [ ] Add older/legacy drugs still in use
- [ ] Add combination products
- [ ] Final QA and deduplication

---

## Therapeutic Categories to Cover

1. Cardiovascular
2. CNS / Neurological
3. Psychiatric
4. Endocrine / Diabetes
5. Respiratory
6. Gastrointestinal
7. Infectious Disease (antibiotics, antivirals, antifungals)
8. Oncology
9. Immunology / Rheumatology
10. Dermatology
11. Ophthalmology
12. Pain / Analgesia
13. Musculoskeletal
14. Renal / Urology
15. Hematology
16. OTC (analgesics, antihistamines, GI, etc.)

---

## Pokémon Name Flagging

Criteria for "sounds like a Pokémon":
- Ends in unusual syllables (-xa, -ro, -ta, -ix, -ra)
- Has a "fantasy/sci-fi" sound
- Could plausibly be shouted in battle
- Resembles existing Pokémon naming patterns

Flagged drugs will have `"soundsLikePokemon": true` and be listed separately in `POKEMON_DRUGS.md`.

---

## Deliverables

| File | Description |
|------|-------------|
| `drugs.json` | Main database file |
| `POKEMON_DRUGS.md` | List of drugs that sound like Pokémon |
| `PLAN.md` | This file |

---

## Use Cases

1. **Flashcards** - Study brand ↔ generic name associations
2. **Pharmadex** - Integration with Pharmadex project
3. **Reference** - Quick lookup of drug info

---

## Notes

- Data will be curated manually + programmatically
- Some fields may be incomplete initially; will iterate
- Will deduplicate by generic name where appropriate
