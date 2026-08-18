import { ConsultingProject, DigitalSolution } from '../types';
import { TailoredProjectSet } from './presetProjectsId';

export const PRESET_PROJECTS_EN: Record<string, TailoredProjectSet> = {
  optimal: {
    summary:
      'Comprehensive portfolio covering operational consulting, AI & digital application development, HR governance, retail pricing strategy, large-scale event management, and multi-channel digital campaigns for diverse clients and industries.',
    projects: [
      {
        id: 'proj-1',
        role: 'HR & Operations',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed 30+ website & application development projects along with 5+ commercial video production projects end-to-end.',
          'Developed custom websites, mobile/web apps, AI automation solutions, and digital strategy tailored to client requirements.',
          'Led projects from planning, resource allocation, and technical execution to final delivery and client onboarding.',
          'Coordinated with executive stakeholders to ensure timeline adherence, budget compliance, and quality benchmarks.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Business Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Developed a structured master product database for 100+ SKUs utilizing Google Sheets & cloud data architecture.',
          'Formulated comprehensive pricing strategy: COGS calculation, profit margins, bottom price thresholds, and marketplace tax adjustments.',
          'Established multi-channel commercial partnerships and operational workflows across reseller and affiliate networks.',
          'Designed periodic operational/financial reporting systems and automated stock replenishment workflows.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Operations Consultant',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Managed academic operations and synchronized 300+ active student members across tutor schedules, course package tiers, and session quotas.',
          'Supervised and coordinated a 30-member academic and operational team consisting of lead tutors, assistant tutors, and administrative staff.',
          'Established integrated scheduling workflows, class administration guidelines, and student learning progress evaluation systems.',
          'Optimized classroom capacity and tutor scheduling utilization, eliminating scheduling bottlenecks with >95% student satisfaction.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Business Operations Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Managed product database and catalog structure across 50+ perfume variant SKUs.',
          'Calculated COGS, profit margins, bottom prices, and platform tax adjustments across multiple e-commerce channels.',
          'Developed reseller and commercial operational workflows, ensuring streamlined inventory replenishment.',
          'Standardized periodic operational/financial reports and stock controls.',
        ],
      },
      {
        id: 'proj-5',
        role: 'Social Media & Project Coordinator',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: '1.5-Year Project',
        category: 'marketing_media',
        highlights: [
          'Managed social media operations and digital marketing campaigns for the higher education institution.',
          'Handled contract administration, legal documents, and stakeholder coordination.',
          'Coordinated creative talents, production vendors, and media assets for institutional events.',
          'Directed promotional video shoots and corporate media production.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Multimedia & Website Project Lead',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Produced official company profile video for institutional branding and admissions outreach.',
          'Developed modern, responsive official website tailored to institutional information architecture.',
          'Coordinated with school leadership board for digital content curation.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Speaker & Event Organizer',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          'Master of Ceremony (MC) for 50+ wedding and formal corporate/governmental ceremonies.',
          'Featured speaker at 15+ seminars, workshops, and youth leadership educational programs.',
          'Led end-to-end management for 10+ large-scale events (1,000+ attendees), managing budgets, vendors, and live execution.',
          'Structured event rundowns, stage flow, and risk mitigation procedures ensuring seamless execution.',
        ],
      },
      {
        id: 'proj-8',
        role: 'Social Media Ads Specialist',
        organization: "Vany's Group",
        sector: 'Retail Fashion & Hospitality',
        periodType: '4-Month Project',
        category: 'marketing_media',
        highlights: [
          'Managed targeted Meta Ads and TikTok Ads campaigns driving retail fashion penetration and sales.',
          'Formulated creative content calendars and data-driven advertising strategies.',
          'Produced promotional launch videos for the Grand Opening of Vany Villa Balige in North Sumatra.',
          'Monitored advertising ROAS and campaign conversion metrics continuously.',
        ],
      },
      {
        id: 'proj-9',
        role: 'Digital Marketing Consultant',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project-based',
        category: 'marketing_media',
        highlights: [
          'Formulated digital marketing strategy and brand repositioning for commercial printing solutions.',
          'Managed 2 Meta Ads campaigns and 3 e-commerce storefronts targeting B2B & B2C audiences.',
          'Optimized customer acquisition funnels, increasing inbound commercial printing inquiries.',
        ],
      },
      {
        id: 'proj-10',
        role: 'Administrative & Finance Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Managed operational administration and financial billing for 2,000+ active utility customer accounts.',
          'Executed monthly revenue calculations, cash book reconciliations, and staff payroll disbursements.',
          'Maintained organized administrative records, ledger documentation, and transparent financial reporting.',
        ],
      },
      {
        id: 'proj-11',
        role: 'Marketing Communication Manager',
        organization: 'CV Multi Sejahtera',
        sector: 'Gadget & Smartphone Retail',
        periodType: '4-Month Project',
        category: 'marketing_media',
        highlights: [
          'Directed integrated marketing communications, branding, and promotional strategies across a retail network of 5 gadget store outlets.',
          'Formulated and executed monthly promotional drives, in-store sales activations, POS visual collateral, and multi-branch digital ad campaigns.',
          'Conducted regular audits across 5 retail stores to ensure visual merchandising consistency, promo display implementation, and staff sales messaging alignment.',
          'Analyzed branch sales performance metrics, promotional ROI, and gadget consumer demand trends to drive data-backed marketing decisions.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise Resource Planning',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Full-stack multi-module corporate ERP connecting Marketing, Finance & Accounting, HRGA, Operations, and Executive BI Dashboard in real-time.',
        impact:
          'Improves cross-departmental workflow efficiency by 65%, eliminates 80% of operational data redundancy, and accelerates C-Level decision-making cycles 2x.',
        techStack: ['Full-Stack ERP', 'Executive BI Dashboard', 'Cross-Department Sync'],
        features: ['Multi-Module Integration', 'Owner/Executive Portal', 'Cross-Divisional Workflow'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Logistics & Operations Management',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Comprehensive supply chain & logistics system: raw material tracking, inventory in/out, automated COGS (FIFO/LIFO/Average), supplier database, AP/AR ledger, production scheduling, and client distribution.',
        impact:
          'Reduces inventory shrinkage by 70%, automates 100% accurate COGS calculation, and cuts warehouse reporting cycles by 60%.',
        techStack: ['Inventory Engine (FIFO/LIFO)', 'Supply Chain & AP/AR', 'Production Scheduling'],
        features: ['Multi-Method HPP Engine', 'Supplier & Debt/Receivable Tracking', 'End-to-End Production & Distribution'],
      },
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Human Resource Information System',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'End-to-end HR platform: applicant tracking system (ATS), interactive online testing portal, digital employment contracts, GPS attendance tracking, internal chat, objective KPI scoring, and automated payroll.',
        impact:
          'Automates 80% of recruitment workflows, cuts monthly payroll processing duration by 75%, and elevates attendance tracking accuracy to 90%.',
        techStack: ['Applicant Tracking System (ATS)', 'GPS Geo-Attendance', 'Interactive Assessment & Payroll'],
        features: ['Online Candidate Portal & Testing', 'GPS Geo-Fencing Attendance', 'Internal Team Chat & KPI Matrix'],
      },
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'CRM & Marketing Automation',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Integrated multi-channel CRM and marketing automation platform for managing B2B lead pipelines, automated follow-ups, and digital ad performance analytics.',
        impact:
          'Increases B2B prospect conversion closing rate by 45%, speeds up lead response 3x, and improves ad spend efficiency (ROAS) by 35%.',
        techStack: ['CRM Pipeline', 'Ad Performance & ROI Analytics', 'Marketing Automation Engine'],
        features: ['Multi-Channel Campaign Tracking', 'Ad Spend & ROI Analytics', 'Automated Lead Nurturing'],
      },
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'Accounting & Asset Management',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'General ledger accounting, cash flow tracking, fixed asset depreciation models, balance synchronization, and structured financial statements.',
        impact:
          'Provides real-time financial reporting, eliminates 95% of manual journal entries errors, and accelerates month-end closing by 50%.',
        techStack: ['Financial Ledger', 'Balance Sync', 'Asset Depreciation Engine'],
        features: ['Transaction Ledger', 'Automated Financial Reports', 'Asset Lifecycle Tracking'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Corporate Intelligence Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Market intelligence directory mapping 4,000+ corporate profiles (HRGA, Purchasing, GM contacts) and industrial park zoning coordinates.',
        impact:
          'Indexes 4,000+ corporations and 5,200+ decision makers across strategic industrial corridors, boosting B2B prospecting efficiency by 85%.',
        techStack: ['Database Management', 'Geo-Mapping Index', 'Export & Filter Engine'],
        features: ['4000+ Company Profiling', 'Geo-Mapping Kawasan Industri', 'Multi-level Filter'],
      },
    ],
  },
  business_operations: {
    summary:
      'Portfolio in business operational systems, multi-unit SOP standardization, supply chain database architecture, governance across 30+ projects, and resource utilization efficiency across retail, education, and utility sectors.',
    projects: [
      {
        id: 'proj-1',
        role: 'Operations & Systems Consultant',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Engineered standard operating procedures (SOP) and streamlined operational workflows across 30+ software and multimedia projects.',
          'Implemented bottleneck monitoring systems, technical resource capacity planning, and release schedule risk governance.',
          'Enforced multi-tiered quality control (QC) and standardized client handover documentation for enterprise clients.',
          'Achieved 96%+ on-time milestone delivery with a 20% improvement in project operational cost efficiency.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Lead Business Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Constructed structured master inventory database for 100+ SKUs and established automated replenishment controls to prevent stockouts.',
          'Formulated operational COGS calculations, contribution margins, and packaging/multi-carrier shipping cost controls.',
          'Standardized e-commerce order fulfillment workflows and structured return merchandise authorization (RMA) procedures.',
          'Instituted periodic operational reporting systems, reducing warehouse inventory reconciliation time by 60%.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Operations Director Consultant',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Directed daily institutional operations: synchronized 300+ students with classroom space availability and tutor assignments.',
          'Coordinated 30 operational and instructional staff members through structured duty rosters and daily SOP adherence audits.',
          'Engineered attendance tracking workflows, make-up class scheduling protocols, and learning facility management.',
          'Maximized room utilization to 90% and eliminated 100% of tutor scheduling conflicts.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Retail Operations Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Engineered inventory management and automated reorder triggers across 50+ perfume variant SKUs.',
          'Standardized e-commerce order fulfillment workflows from pick-and-pack to courier handover.',
          'Instituted regular physical stock audit (stock opname) SOPs, suppressing inventory variance below 1%.',
          'Synchronized daily sales recapitulation with raw material inventory transactions.',
        ],
      },
      {
        id: 'proj-10',
        role: 'Operations & Billing Administration Lead',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Administered meter reading and centralized billing operations for 2,000+ active household connections.',
          'Formulated SOPs for water distribution maintenance, client grievance dispatch, and field technician operations.',
          'Automated monthly operational data compilation and transparent collection records.',
          'Increased on-time collection rate by 35% and lowered delinquent customer dues by 40%.',
        ],
      },
      {
        id: 'proj-11',
        role: 'Multi-Store Operations & Marketing Coordinator',
        organization: 'CV Multi Sejahtera',
        sector: 'Gadget & Smartphone Retail',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Audited and aligned promotional display and merchandising SOPs across 5 gadget retail branches.',
          'Conducted regular frontliner training on promotional campaigns and POS transaction handling.',
          'Monitored customer service SLAs and promotional unit inventory readiness across all store branches.',
          'Produced weekly branch operational performance and sales productivity reviews.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise Resource Planning & Operations',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Centralized multi-divisional ERP system for governing operational workflows, cross-departmental data synchronization, and real-time production bottleneck tracking.',
        impact:
          'Enhances cross-divisional operational efficiency by 65% and cuts inter-branch coordination friction by 80%.',
        techStack: ['Workflow Engine', 'Cross-Divisional ERP', 'Operational Dashboard'],
        features: ['Real-Time Workflow Tracking', 'Multi-Branch Sync', 'Bottleneck Alert'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Logistics & Operations Management System',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Comprehensive supply chain and logistics platform: inventory in/out controls, automated COGS, production scheduling, and multi-city client deliveries.',
        impact:
          'Cuts inventory discrepancies by 70%, automates production scheduling, and reduces warehouse reporting cycles by 60%.',
        techStack: ['Supply Chain Automation', 'Inventory Control Engine', 'Production Dispatcher'],
        features: ['Automated Reorder Point', 'Warehouse In/Out Tracking', 'Live Logistics SLA'],
      },
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Operations & Workforce Administration',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'Workforce operations system for multi-branch GPS attendance, daily task dispatching, and field team operational KPI scoring.',
        impact:
          'Ensures 90%+ operational shift compliance and streamlines field task tracking workflows.',
        techStack: ['GPS Geo-Fencing', 'Task Dispatch', 'Shift Scheduling'],
        features: ['Multi-Branch Attendance', 'Daily Task Log', 'Operational KPI Matrix'],
      },
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'Operational CRM & Lead Tracking',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Lead handling workflow management system with automated follow-up dispatching and customer response SLA tracking.',
        impact:
          'Speeds up operational lead response times 3x and eliminates pipeline drop-offs.',
        techStack: ['Lead Routing Engine', 'SLA Monitoring', 'CRM Automation'],
        features: ['Automated Lead Assignment', 'SLA Breach Warning', 'Activity History'],
      },
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'Operational Asset & Cashflow Tracker',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Operational asset registry, capital maintenance tracking, and branch petty cash expense governance.',
        impact:
          'Elevates operational asset tracking accuracy to 95% and accelerates daily operational cash reconciliations.',
        techStack: ['Asset Registry', 'Petty Cash Flow', 'Depreciation Calculator'],
        features: ['Asset Tracking', 'Maintenance Schedule', 'Operational Expense Log'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'Corporate Operations Directory Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Comprehensive directory mapping 4,000+ corporate profiles and industrial park zones for logistics route planning and B2B operational visits.',
        impact:
          'Reduces logistics route planning and operational visit preparation time by 85%.',
        techStack: ['Industrial Zoning Map', 'Logistics Database', 'Filter Matrix'],
        features: ['Industrial Zone Directory', 'Route Optimization', 'Decision Maker Contact'],
      },
    ],
  },
  hr_operations: {
    summary:
      'Portfolio in human resources governance (HR), multi-divisional team supervision (30+ staff), talent acquisition & screening, leadership curriculum design, and HRIS platform implementation.',
    projects: [
      {
        id: 'proj-3',
        role: 'Academic Team & HR Operations Lead',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Led supervision, scheduling, and workload balancing for a 30-member instructional (lead tutors, assistant tutors) and administrative team.',
          'Formulated instructor guidelines, teaching code of conduct, and periodic KPI performance evaluation frameworks.',
          'Administered new tutor onboarding programs and mentoring workshops to sustain high pedagogical quality.',
          'Achieved 95% tutor retention rate and resolved student academic concerns with a human-centric approach.',
        ],
      },
      {
        id: 'proj-1',
        role: 'Talent & Project Operations Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed freelance talent acquisition (developers, UI/UX designers, video editors) for 30+ technology projects.',
          'Established deliverable-based compensation structures and milestone-oriented performance evaluations.',
          'Cultivated high-trust remote team culture through structured check-ins and standard task workflows.',
          'Maintained high internal talent engagement, driving consistent, top-quality project deliveries.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Talent Coordinator & People Development Speaker',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          'Featured speaker across 15+ seminars focused on youth leadership, public communication, and talent capacity development.',
          'Coordinated large event committee teams (50+ volunteers), ensuring high collaboration and morale.',
          'Developed public speaking and professional ethics training modules for student organization executives.',
          'Facilitated team building and internal conflict resolution workshops for major events.',
        ],
      },
      {
        id: 'proj-10',
        role: 'HR Administration & Payroll Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Managed personnel administrative records, field technician attendance, and monthly payroll disbursements.',
          'Organized technician shift rosters, guaranteeing 24/7 on-call emergency response readiness.',
          'Facilitated clear communication between board leadership and field utility staff.',
          'Enhanced personnel administrative compliance, ensuring 100% on-time compensation delivery.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-3',
        title: 'MY CAREER',
        subtitle: 'Human Resource Information System (HRIS)',
        category: 'management',
        demoUrl: 'https://hrworkforce.vercel.app',
        isPrototype: true,
        description:
          'Comprehensive HR platform: applicant tracking system (ATS), online testing, digital contracts, GPS attendance, team chat, KPI reviews, and automated payroll.',
        impact:
          'Automates 80% of hiring workflows, cuts payroll processing time by 75%, and boosts employee KPI transparency to 90%.',
        techStack: ['ATS Recruitment', 'GPS Attendance', 'Payroll & KPI Engine'],
        features: ['Online Candidate Portal', 'Performance Review Matrix', 'Automated Payroll'],
      },
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Enterprise HRGA & Workforce Management',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Corporate ERP HRGA module integrating organizational structures, employee databases, leave approval workflows, and workforce productivity metrics.',
        impact:
          'Cuts employee administrative request turnaround time by 70% and delivers real-time workforce metrics to executive management.',
        techStack: ['HRGA Integration', 'Employee Directory', 'Executive BI'],
        features: ['Leave Approval Flow', 'Organizational Chart Sync', 'Productivity Metrics'],
      },
    ],
  },
  project_management: {
    summary:
      'Portfolio in project lifecycle management (Scoping, Milestone Execution, UAT), risk mitigation, budget allocation, and multi-stakeholder governance across 30+ digital, consulting, and event projects.',
    projects: [
      {
        id: 'proj-1',
        role: 'Project Director & Delivery Specialist',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Directed project lifecycle governance for 30+ website/app projects and 5+ video projects from scoping and milestone planning to user acceptance testing (UAT).',
          'Enforced agile/waterfall frameworks and tracked timelines using Gantt charts and Trello/Notion boards.',
          'Managed corporate client expectations, scope adjustments, and timeline risk contingencies.',
          'Maintained a 98% on-time project acceptance rate across all client deliveries.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Lead Event Project Manager',
        organization: 'Various Organizations & Communities',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          'Led end-to-end project management for 10+ major events (1,000+ attendees), overseeing budgets, master timelines, and live production.',
          'Coordinated cross-functional committees (programming, logistics, marketing, security) and external suppliers.',
          'Drafted risk mitigation contingency plans to preempt on-site operational and technical hurdles.',
          'Ensured 100% of event milestones met required schedules and budget constraints.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Project Manager Website & Multimedia',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed the production of the institution company profile video and website under an aggressive 1-month timeline.',
          'Orchestrated storyboards, shooting schedules, crew assignments, and review milestones with board executives.',
          'Delivered final multimedia assets and launched website on schedule with unanimous leadership commendation.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Operations Project Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Initiated and delivered a 2-month restructuring project for the 100+ SKU database and pricing model.',
          'Mapped implementation milestones, trained administrative staff, and established structured cataloging.',
          'Delivered comprehensive SOP manuals to company leadership as final project handover.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Project & Operations Management Suite',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Internal project management system for tracking production phases, installation milestones, visual progress documentation, and client handover SLAs.',
        impact:
          'Ensures 95%+ of commercial deliverables finish on time and accelerates client status reporting by 60%.',
        techStack: ['Gantt & Timeline Engine', 'Milestone Tracker', 'Visual Documentation'],
        features: ['Phase Scheduling', 'SLA Monitoring', 'Client Delivery Portal'],
      },
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Multi-Project Corporate Control ERP',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Unified executive dashboard for overseeing multi-divisional project portfolios, project budget utilization, and execution velocity.',
        impact:
          'Accelerates C-Level project progress visibility 2x and prevents project budget variances.',
        techStack: ['Executive Project BI', 'Budget Tracking', 'Milestone Alert'],
        features: ['Cross-Project Dashboard', 'Budget vs Actual Tracker', 'Resource Allocation'],
      },
    ],
  },
  finance_accounting: {
    summary:
      'Portfolio in cost of goods sold (COGS/HPP) calculation, retail profit margin engineering, billing administration for 2,000+ utility customers, project budget auditing, and asset accounting software design.',
    projects: [
      {
        id: 'proj-2',
        role: 'Pricing & Financial Operations Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Audited and formulated granular COGS (HPP) calculations across 100+ footwear SKU lines.',
          'Structured tiered pricing formulas: bottom price thresholds, reseller/distributor margins, and e-commerce channel pricing factoring platform fees and taxes.',
          'Calculated break-even points (BEP) and projected gross cash flow margins across sales channels.',
          'Helped enhance net profit margins by +12% through optimized pricing architecture.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Costing & Pricing Consultant',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Determined unit cost of production per milliliter and packaging components across 50+ perfume variants.',
          'Constructed e-commerce retail pricing models factoring in platform commissions, discounts, and reseller margins.',
          'Designed monthly profit-and-loss summary formats for owner financial visibility.',
        ],
      },
      {
        id: 'proj-10',
        role: 'Finance & Billing Administration Lead',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Administered monthly revenue collections and ledger bookkeeping for 2,000+ active utility customer accounts.',
          'Compiled cash flow reports, petty cash registers, operational expense logs, and technician payroll records.',
          'Conducted routine reconciliations between meter logs and physical bank balances with 100% financial accuracy.',
          'Presented periodic financial accounting reports during stakeholder community assemblies.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-5',
        title: 'VYNANCE & ASET+',
        subtitle: 'General Ledger, Cashflow & Asset Accounting',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Integrated accounting system: debit/credit transaction journals, general ledger, P&L statements, fixed asset depreciation schedules, and balance sheet sync.',
        impact:
          'Eliminates 95% of manual journal booking errors and accelerates monthly financial closing cycles by 50%.',
        techStack: ['General Ledger Engine', 'Depreciation Model', 'Financial Statement Generator'],
        features: ['Real-Time Balance Sheet', 'Automated P&L', 'Fixed Asset Depreciation'],
      },
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'HPP Engine & Cost Control System',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Automated COGS module (FIFO, LIFO, Weighted Average), accounts payable/receivable (AP/AR) tracking, and precise inventory valuation.',
        impact:
          'Automates 100% accurate raw material COGS calculations and prevents inventory cost leakage up to 70%.',
        techStack: ['FIFO/LIFO/Average Engine', 'Accounts Payable/Receivable', 'Inventory Valuation'],
        features: ['Multi-Method COGS', 'Supplier AP Aging', 'Inventory Asset Value'],
      },
    ],
  },
  marketing: {
    summary:
      'Portfolio in integrated multi-channel marketing campaigns, paid digital advertising (Meta & TikTok Ads), multi-branch retail promotional activations (CV Multi Sejahtera & Jaya Baru), and ROI-driven multimedia production.',
    projects: [
      {
        id: 'proj-11',
        role: 'Marketing Communication Manager',
        organization: 'CV Multi Sejahtera',
        sector: 'Gadget & Smartphone Retail',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Directed marketing communications, integrated promotions, and multi-branch branding across a network of 5 gadget retail stores.',
          'Formulated and executed monthly promotional drives, in-store sales activations, POS visual collateral, and multi-branch digital ad campaigns.',
          'Conducted regular audits across 5 retail stores to ensure visual merchandising consistency, promo display implementation, and staff sales messaging alignment.',
          'Analyzed branch sales performance metrics, promotional ROI, and gadget consumer demand trends to drive data-backed marketing decisions.',
        ],
      },
      {
        id: 'proj-8',
        role: 'Social Media & Digital Advertising Specialist',
        organization: "Vany's Group",
        sector: 'Retail Fashion & Hospitality',
        periodType: 'Project 4 Months',
        category: 'marketing_media',
        highlights: [
          'Managed paid Meta Ads & TikTok Ads campaigns with precise audience segmentation driving measurable ROAS gains.',
          'Structured creative content calendars, promotional copywriting, and brand storytelling for fashion apparel lines.',
          'Produced cinematic promotional videos for the Grand Opening of Vany Villa Balige in North Sumatra.',
          'Monitored ad conversion funnels to maximize CTR and lower customer acquisition costs.',
        ],
      },
      {
        id: 'proj-9',
        role: 'Digital Marketing & Branding Consultant',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project-based',
        category: 'marketing_media',
        highlights: [
          'Crafted digital brand positioning and online messaging strategies for commercial digital printing services.',
          'Supervised Meta Ads campaigns and optimized storefront listings across 3 e-commerce channels.',
          'Boosted inbound commercial B2B sales inquiries by 40% via industry-targeted digital ads.',
        ],
      },
      {
        id: 'proj-5',
        role: 'Social Media & Creative Campaign Lead',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: 'Project 1.5 Years',
        category: 'marketing_media',
        highlights: [
          'Managed institution social media channels to enhance prospective student engagement.',
          'Produced campus promotional videos, academic event coverage, and student testimonial series.',
          'Supported annual new student enrollment targets through sustained digital outreach campaigns.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'CRM & Marketing Automation Platform',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Marketing automation platform: multi-channel campaign tracking, ad performance analytics integration (ROAS/ROI), and automated lead nurturing pipelines.',
        impact:
          'Elevates prospect closing rates by 45% and improves digital ad spend efficiency (ROAS) by 35%.',
        techStack: ['Marketing Automation', 'Ad Performance Tracker', 'Conversion Analytics'],
        features: ['Multi-Channel Campaign View', 'ROAS Calculator', 'Automated Lead Workflow'],
      },
    ],
  },
  digital_transformation: {
    summary:
      'Portfolio in digital systems architecture, business process automation, full-stack website/app engineering across 30+ projects, AI integrations, and enterprise workflow modernization.',
    projects: [
      {
        id: 'proj-1',
        role: 'Software Architect & AI Consultant',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Architected and engineered 30+ websites, web apps, and AI automation workflows tailored to corporate operational needs.',
          'Integrated modern REST APIs, cloud databases (Firebase/MySQL), and automated task processing systems.',
          'Guided corporate clients in transitioning from paper-based operations to modern cloud web applications.',
          'Delivered technical training and system user guides to internal teams, ensuring 100% adoption.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Web Platform & Multimedia Architect',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Engineered official institutional web platform with interactive portals for student data, donation channels, and academic curricula.',
          'Produced high-definition promotional video assets embedded directly into the institutional landing page.',
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Integrated Enterprise Digital Ecosystem',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Full-stack enterprise information architecture digitizing operations, finance, HR, and C-Level reporting in a unified cloud platform.',
        impact:
          'Eliminates 80% of data redundancy and accelerates business process execution 2x.',
        techStack: ['Cloud ERP Architecture', 'REST API Integration', 'Real-Time Sync'],
        features: ['Multi-Module Sync', 'Executive Dashboard', 'Paperless Workflow'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Market Intelligence & Geo-Spatial Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'Web-based corporate intelligence platform featuring multi-level filtering and geospatial indexing of major industrial corridors.',
        impact:
          'Digitized 4,000+ corporate records, reducing B2B prospecting research duration by 85%.',
        techStack: ['Geo-Mapping Matrix', 'Database Indexing', 'Fast Query Engine'],
        features: ['Industrial Zoning Index', 'Instant Search & Filter', 'Contact Data Intelligence'],
      },
    ],
  },
};
