const consultingExamples = {
  'private-capital': [
    { systems: ['FIS Investran'], work: 'Fund accounting, capital calls, waterfalls, and allocations.', ai: 'Investigate cash reconciliation breaks and flag waterfall exceptions for fund accountants.' },
    { systems: ['Canoe Intelligence'], work: 'Collect and extract information from alternative investment documents.', ai: 'Summarize manager notices and organize holdings or cash-flow details for review.' },
    { systems: ['Allvue Systems'], work: 'Private credit, CLO, and fund administration workflows.', ai: 'Organize borrower financial packets and flag potential covenant exceptions for credit specialists.' },
    { systems: ['eFront'], work: 'Alternative investment portfolio and cash-flow management.', ai: 'Prepare liquidity scenarios and summarize approved fund information for review.' },
    { systems: ['LemonEdge'], work: 'Multi-asset accounting and fund administration.', ai: 'Identify possible multi-currency transaction matches and route exceptions.' },
    { systems: ['Juniper Square'], work: 'Investor relations, subscriptions, and investor communications.', ai: 'Draft investor updates from approved metrics and organize routine support requests.' },
    { systems: ['Carta'], work: 'Equity, cap-table, and fund administration workflows.', ai: 'Prepare dilution scenarios and organize fund data for authorized review.' },
    { systems: ['Allocations', 'AngelList'], work: 'SPV and emerging-fund onboarding workflows.', ai: 'Identify missing subscription packet fields and draft standard investor communications.' },
    { systems: ['Ceviche', 'FundCount', 'Fundwave'], work: 'Fund accounting, expense allocation, and audit support.', ai: 'Flag unallocated expenses and identify terms requiring a specialist\'s review.' },
    { systems: ['SS&C Geneva'], work: 'Portfolio accounting and multi-currency reporting.', ai: 'Organize position or trade breaks and prepare questions about NAV movements.' },
    { systems: ['Addepar', 'Arch'], work: 'Wealth aggregation, statements, and tax-document tracking.', ai: 'Summarize holdings and identify missing statements or tax documents.' },
    { systems: ['Dynamo', 'DealCloud', 'Affinity', 'Altvia'], work: 'Deal pipeline, relationships, and investor CRM.', ai: 'Draft deal notes and summarize approved research for review.' },
    { systems: ['PitchBook', 'Harmonic', 'Specter', 'Crunchbase'], work: 'Company research, sourcing, and market mapping.', ai: 'Organize company research against documented screening criteria.' }
  ],
  erp: [
    { systems: ['Sage Intacct', 'Sage X3'], work: 'Accounting, invoicing, and multi-entity reporting.', ai: 'Suggest invoice classifications and flag journal-entry anomalies for accounting review.' },
    { systems: ['SAP S/4HANA'], work: 'Enterprise finance, procurement, inventory, and operations.', ai: 'Identify possible invoice or purchase-order mismatches and summarize supply-chain exceptions.' },
    { systems: ['Oracle NetSuite'], work: 'Financial management, inventory, billing, and consolidation.', ai: 'Draft close commentary and highlight unusual receivables for review.' },
    { systems: ['Microsoft Dynamics 365 Finance', 'Microsoft Dynamics 365 Supply Chain Management'], work: 'Financial management, manufacturing, and supply-chain workflows.', ai: 'Organize invoice exceptions and flag inventory or cash-flow questions.' },
    { systems: ['Workday Financial Management'], work: 'Accounting, consolidation, and spend management.', ai: 'Flag unusual expense and procurement entries for investigation.' },
    { systems: ['QuickBooks Online', 'QuickBooks Desktop'], work: 'Bookkeeping, invoicing, and small-business accounting.', ai: 'Suggest bank-feed categories and highlight possible duplicate bills.' },
    { systems: ['BlackLine', 'FloQast'], work: 'Close management and account reconciliations.', ai: 'Surface unreconciled balances and organize close exceptions.' },
    { systems: ['Coupa', 'SAP Ariba', 'Zip'], work: 'Procurement requests, supplier onboarding, and spend.', ai: 'Route intake requests and flag possible duplicate suppliers.' },
    { systems: ['Bill.com', 'Ramp', 'Brex', 'Concur'], work: 'Accounts payable, cards, and expense administration.', ai: 'Suggest receipt matches and flag potential policy exceptions.' }
  ],
  'planning-tax': [
    { systems: ['Anaplan', 'Pigment', 'Planful', 'Workday Adaptive Planning'], work: 'Planning, forecasting, and scenario analysis.', ai: 'Prepare scenario comparisons and document assumptions for finance review.' },
    { systems: ['Vena', 'Cube', 'Datarails'], work: 'Spreadsheet-based planning and variance reporting.', ai: 'Draft budget variance explanations and identify possible mapping issues.' },
    { systems: ['ONESOURCE', 'Corptax'], work: 'Corporate tax provisions and reporting.', ai: 'Organize tax schedule inputs and flag anomalies for qualified tax review.' },
    { systems: ['Avalara', 'Vertex'], work: 'Indirect tax calculations and exemption workflows.', ai: 'Flag product classification or filing questions for specialist review.' },
    { systems: ['Derivatas', 'Houlihan Lokey valuation tools', 'Duff & Phelps valuation tools'], work: 'Valuation analysis and portfolio reporting.', ai: 'Extract approved KPI inputs and organize comparable-transaction research.' }
  ],
  people: [
    { systems: ['CompTool', 'Payscale', 'Radford', 'Pave'], work: 'Compensation benchmarks and workforce planning.', ai: 'Organize job descriptions against documented benchmark criteria for compensation review.' },
    { systems: ['Workday HCM', 'SAP SuccessFactors', 'UKG'], work: 'Employee records, payroll, scheduling, and workforce processes.', ai: 'Flag possible payroll anomalies and summarize approved feedback for human review.' },
    { systems: ['Rippling', 'Gusto', 'BambooHR'], work: 'People operations, payroll, benefits, and onboarding.', ai: 'Organize onboarding tasks and answer policy questions grounded in approved documents.' },
    { systems: ['Shareworks', 'Equity Edge', 'Solium'], work: 'Equity plans and employee stock administration.', ai: 'Draft equity-plan explanations from approved information for specialist review.' },
    { systems: ['Greenhouse', 'Lever', 'Ashby'], work: 'Recruiting operations, interviews, and hiring workflows.', ai: 'Summarize approved interview notes and identify pipeline bottlenecks, subject to fairness and privacy review.' }
  ],
  legal: [
    { systems: ['Intelligize'], work: 'SEC filings and disclosure research.', ai: 'Locate relevant public disclosures and organize peer comparisons for legal review.' },
    { systems: ['Workiva', 'Wdesk'], work: 'Collaborative reporting, filings, and controls.', ai: 'Flag possible inconsistencies in approved reports and summarize open control questions.' },
    { systems: ['Ironclad', 'DocuSign CLM', 'LinkSquares'], work: 'Contract review and obligation tracking.', ai: 'Extract renewal dates and terms for a qualified reviewer to verify.' },
    { systems: ['Relativity', 'Everlaw', 'DISCO'], work: 'Document review and investigations.', ai: 'Organize document sets and propose timelines while respecting privilege and permissions.' },
    { systems: ['MetricStream', 'Archer', 'OneTrust', 'Vanta'], work: 'Risk, privacy, controls, and security evidence.', ai: 'Summarize questionnaires and identify missing control evidence for review.' }
  ],
  engineering: [
    { systems: ['AutoCAD', 'SolidWorks', 'CATIA', 'Creo', 'Revit'], work: 'Design, engineering drawings, and modeling.', ai: 'Organize design options or flag potential review items for qualified engineers.' },
    { systems: ['Siemens Teamcenter', 'PTC Windchill', 'Arena'], work: 'Product lifecycle, bills of materials, and change management.', ai: 'Summarize proposed changes and flag possible downstream impacts.' },
    { systems: ['MES', 'SCADA'], work: 'Production execution and operational telemetry.', ai: 'Surface unusual sensor or production patterns for qualified teams to investigate.' },
    { systems: ['IBM Maximo', 'SAP EAM'], work: 'Maintenance and asset management.', ai: 'Organize maintenance history and flag work orders for reliability review.' }
  ],
  technology: [
    { systems: ['ServiceNow', 'Jira Service Management'], work: 'IT service requests, incidents, and change management.', ai: 'Classify tickets and suggest approved runbooks for a service team to review.' },
    { systems: ['Jira', 'Linear', 'GitHub', 'GitLab'], work: 'Software development, issue tracking, and delivery.', ai: 'Draft change summaries and group related reports for engineering review.' },
    { systems: ['Datadog', 'Splunk', 'New Relic', 'Dynatrace'], work: 'Monitoring, logs, tracing, and security analytics.', ai: 'Summarize alert patterns and surface hypotheses for investigation.' },
    { systems: ['CrowdStrike', 'Palo Alto Cortex', 'Okta'], work: 'Security operations, endpoints, and identity management.', ai: 'Organize threat signals and propose access-review questions with human approval.' },
    { systems: ['Snowflake', 'Databricks', 'BigQuery'], work: 'Data engineering, analytics, and cloud data platforms.', ai: 'Assist with governed data queries and flag potential freshness or schema anomalies.' },
    { systems: ['Tableau', 'Power BI', 'Looker'], work: 'Dashboards, metrics, and business intelligence.', ai: 'Draft metric summaries and highlight changes for analysts to validate.' }
  ],
  markets: [
    { systems: ['Bloomberg AIM', 'Charles River IMS', 'Aladdin'], work: 'Portfolio management, trading, and risk workflows.', ai: 'Summarize approved research and highlight exposure changes for investment teams.' },
    { systems: ['Murex', 'Calypso', 'ION'], work: 'Derivatives, treasury, and market risk operations.', ai: 'Surface pricing or curve exceptions and organize scenario results for review.' },
    { systems: ['Enfusion', 'SimCorp Dimension'], work: 'Portfolio operations, accounting, and reconciliation.', ai: 'Organize cash or position breaks for investigation.' }
  ],
  customer: [
    { systems: ['Salesforce', 'HubSpot', 'Microsoft Dynamics CRM'], work: 'Sales, account management, and customer records.', ai: 'Draft outreach and summarize authorized customer interactions for review.' },
    { systems: ['Marketo', 'Klaviyo', 'Braze'], work: 'Campaigns and lifecycle marketing.', ai: 'Prepare copy variants and organize campaign results for marketing review.' },
    { systems: ['Zendesk', 'Intercom', 'Freshdesk'], work: 'Support tickets and help centers.', ai: 'Summarize tickets and suggest grounded responses for support agents.' },
    { systems: ['Gainsight', 'Totango', 'ChurnZero'], work: 'Customer success, onboarding, and renewals.', ai: 'Highlight account follow-up questions and draft review materials from approved data.' }
  ],
  'supply-chain': [
    { systems: ['Manhattan Associates', 'Blue Yonder', 'JDA'], work: 'Demand planning, warehouse operations, and inventory.', ai: 'Organize inventory and demand exceptions for planners to assess.' },
    { systems: ['SAP TM', 'Oracle Transportation Management', 'OTM'], work: 'Freight, transportation, and shipment management.', ai: 'Flag potential shipment delays and freight-bill discrepancies for review.' },
    { systems: ['Shopify Plus', 'Magento', 'Adobe Commerce'], work: 'Ecommerce operations and product catalogs.', ai: 'Organize product content and flag orders for authorized review.' }
  ],
  health: [
    { systems: ['Veeva Vault', 'Medidata'], work: 'Clinical operations, trial documentation, and regulatory processes.', ai: 'Identify potentially missing trial documents for qualified staff to review.' },
    { systems: ['Epic', 'Cerner', 'Oracle Health'], work: 'Healthcare records, clinical workflows, and revenue cycle.', ai: 'Prepare authorized administrative summaries for qualified review using approved systems and data.' }
  ],
  property: [
    { systems: ['Yardi', 'MRI Software', 'CoStar'], work: 'Property accounting, leasing, and real-estate research.', ai: 'Extract lease terms and flag potential billing discrepancies for human review.' },
    { systems: ['Procore', 'Primavera P6'], work: 'Construction projects, reports, and schedules.', ai: 'Summarize field reports and identify potential schedule risks for project teams.' }
  ]
};