# Atmilio Learning Library Roadmap

## Purpose and status

Build a library that helps people apply AI to the work and interests they actually have. The survey should recommend a small, relevant starting set; search should remain available across the full library. This document is a planning inventory, not a claim that every course below exists or is ready for sale.

Current implementation: Part 1 of the AI Mastery masterclass has six introductory lessons; Parts 2-10 are outlines. The role-course library contains introductory three-lesson tracks for executive and organizational levels; finance/accounting, sales, customer support, marketing, product, developers, HR, healthcare, legal, real estate, GM and BorgWarner scenarios; and poker, gaming, thrifting, and marketplace resale. Other catalog entries, including creator analytics, local-service businesses, and collectors, are previews rather than completed courses. See `role-courses.js` for the actual available tracks.

The role tracks are short starting points, not comprehensive professional training. Regulated, company-specific, and consequential topics require qualified review before commercial release.

## Library model

Build reusable courses along five dimensions rather than generating a separate duplicate course for every combination:

1. **Foundation:** AI basics, prompting, model selection, data, agents, security, evaluation, and governance.
2. **Function and role:** The work a learner performs, such as accounts payable, recruiting, software testing, or sales operations.
3. **Seniority:** Individual contributor, team lead, manager, director/VP, executive, owner, or specialist.
4. **Organization and industry:** Company size and type, sector, operating model, and relevant constraints.
5. **Application and tools:** Intended workflow, approved software, experience level, and the learner's desired outcome.

A learning plan should combine a relevant foundation with a role course and an optional industry or tool module. Distinguish an independently researched public workflow from a fictional scenario; never imply affiliation, internal access, vendor support, or employer approval. Users should be able to correct their profile and search for a course outside their recommendations.

## Planned curriculum inventory

### A. Shared AI foundations

- AI literacy: capabilities, limitations, terminology, and evaluating outputs.
- Prompting: task context, examples, formatting, iteration, and failure recovery.
- Models and tools: LLMs, small models, multimodal systems, model selection, and cost.
- Data and grounding: data preparation, retrieval, embeddings, citations, and source verification.
- Building and automation: APIs, low-code workflows, agents, tools, and human approvals.
- Evaluation and governance: test cases, error analysis, privacy, security, accessibility, and monitoring.
- Masterclass roadmap: expand Parts 2-10 into sourced lessons, exercises, assessments, and reviews.

### B. Executive and organizational leadership

- CEO, COO, CTO, and CHRO: introductory role courses built; expand strategy, implementation, and governance depth.
- CFO: investment analysis, financial controls, reporting, and finance transformation.
- CIO, CISO, chief data officer, chief product officer: architecture, security, data governance, and product decisions.
- Chief legal/compliance officer, chief marketing officer, chief revenue officer, and chief procurement officer.
- Founders, owners, board members, and nonprofit/public-sector leaders.
- Individual contributors, team leads/managers, and directors/VPs: introductory level courses built; add role-specific applications.

### C. Corporate functions and job families

- Finance: accounting, bookkeeping, accounts payable/receivable, FP&A, treasury, audit, tax support, and controller workflows.
- HR: recruiting coordination, onboarding, learning and development, benefits, workforce planning, and employee communications.
- Sales and revenue: prospect research, account management, sales operations, proposals, and customer success.
- Customer support: issue triage, knowledge-base drafting, quality review, and escalation.
- Marketing: content, campaign planning, analytics, SEO, advertising review, and brand operations.
- Product and design: user research synthesis, requirements, prioritization, experimentation, UX writing, and accessibility.
- Technology: developers, QA, IT support, security engineering, data engineering, architecture, and infrastructure.
- Operations: project management, administration, procurement, supply chain, logistics, quality, and facilities.
- Legal and compliance: legal research support, contract organization, policy review, records, risk, and audit preparation.
- Additional functions: communications, training, research, strategy, investor relations, and business development.

The first finance, sales, support, marketing, product, software-development, HR, and legal role tracks are built at introductory depth. The remaining items are planned.

### D. Business size and organization type

- Solo operator and freelancer: safe tool selection, client work, quoting, invoicing, and time management.
- Small local business: scheduling, estimates, marketing, customer communication, and bookkeeping coordination.
- Startup: research, prototypes, documentation, hiring coordination, and investor communications.
- Mid-market and enterprise: approvals, enterprise data access, integration, change management, and governance.
- Nonprofit, education, and public sector: mission-aligned workflows, accessibility, procurement, privacy, and oversight.
- Teams and company packages: account administration, learner invitations, seats, progress, and billing are product capabilities, not currently implemented courses or features.

### E. Industry pathways

- Financial services and investment operations: reporting, research, reconciliations, fund administration, and approved-system use.
- Healthcare and life sciences: administrative workflows, educational materials, information safeguards, and qualified clinical review.
- Legal and professional services: research planning, source verification, confidentiality, and matter organization.
- Real estate and construction: listing accuracy, fair housing, scheduling, estimation support, and document review.
- Manufacturing and automotive: operations, quality, supply chain, supplier communication, and safety escalation.
- Retail, e-commerce, hospitality, and restaurants: inventory, customer experience, marketing, and operations.
- Home services and trades: landscaping, cleaning, plumbing, electrical, repairs, estimating, and scheduling.
- Additional sectors: education, insurance, transportation, agriculture, energy, media, and government.

Existing healthcare, legal, real-estate, and illustrative automotive courses need specialist review. Industry rules and licensing vary by location and use case.

### F. Personal interests and independent work

- Creators: platform-specific planning, production, accessibility, analytics, audience growth, and rights.
- Gamers and esports: practice plans, post-game review, community management, and platform rules.
- Poker and games: offline learning, probability, responsible play, and platform restrictions.
- Collectors: trading-card inventory, research, condition terminology, and independent grading verification.
- Thrifting and resale: sourcing, authenticating through qualified sources, costs, listing accuracy, and marketplace safety.
- Additional hobbies: travel planning, personal productivity, cooking, photography, music, and lifelong learning.

Creator, landscaping, and collector catalog entries currently remain previews. Poker, gaming, thrifting, and resale have introductory courses.

### G. Tools and workflow modules

- General productivity: spreadsheets, presentations, email, calendar, documents, and meeting notes.
- Business systems: CRM, support desks, accounting/ERP, HR systems, analytics, and project management.
- Developer tools: IDE assistants, version control, test tooling, API integration, and secure deployment.
- Creative tools and publishing platforms: research, production, accessibility, and performance reporting.
- Specialist products such as Investran: research official documentation and available permissions before writing product-specific steps. Start with synthetic exports; never claim an integration or company policy without verification.

Each product-specific module needs a version/date, source links, prerequisites, approved-data guidance, and a review schedule. If access or documentation is unavailable, label examples hypothetical and do not invent clicks, capabilities, or integrations.

## Prioritized build sequence

1. **P0: Trust and discovery.** Complete Firebase setup and security-rule testing, resolve course status labels, verify search and account isolation, and add privacy/terms and a review workflow. No payments or server-enforced entitlements exist yet.
2. **P1: Core role coverage.** Expand the newly built finance, sales, support, marketing, and product courses. Next build CFO, project management, procurement, IT support, data analyst, and operations courses. Add role-specific exercises and skill-level variants.
3. **P2: Industry and business overlays.** Develop landscaping/local services, investment operations, construction, healthcare administration, manufacturing, real estate, and nonprofit scenarios. Commission expert review for regulated and safety-sensitive subjects.
4. **P3: Individuals and creators.** Turn creator, collector, and local-service previews into substantive lessons; expand gaming, reselling, and personal-use tracks using verified platform rules and sources.
5. **P4: Scale and monetization.** Build a maintainable content management workflow, search taxonomy, learner feedback, accessibility checks, course progress, organization accounts, checkout, server-enforced entitlements, and support operations.

## Course authoring and release checklist

- Specify the audience, prerequisites, learning outcomes, role and industry, experience level, and realistic tasks.
- Include substantive lessons, examples with explicit assumptions, exercises, answer explanations, and credible source links.
- Provide safe synthetic data, confidentiality warnings, human-review points, and jurisdiction-specific limitations where needed.
- Fact-check product details, dates, numeric examples, citations, and all technical or professional claims.
- Have a qualified domain expert and, when needed, legal/privacy/security reviewers approve content before sale.
- Validate accessibility, mobile layout, navigation, search, recommendations, broken links, and account/guest behavior.
- Record owner, last-reviewed date, source versions, and next review date; promptly update or retire stale material.
- Measure relevance with consent-based user feedback and representative tests across roles. Avoid claiming superior personalization without comparative evidence.

## Personalization gaps

The current system is a browser-side, rule-based prototype: it recognizes selected roles, certain job-title keywords, a small set of functions, and broad goals. It does not understand all job titles or automatically produce an individual curriculum. Organization type, size, and function are collected, but size and type do not yet drive distinct instructional content. Avoid adding arbitrary company-specific claims or using protected characteristics as a proxy for capability. Build evaluation cases for each role and ambiguous inputs, explain why a course is recommended, and keep search and profile correction available.