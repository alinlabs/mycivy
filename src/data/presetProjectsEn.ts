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
        role: 'Keynote Speaker & Event Organizer',
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Served as professional Master of Ceremonies (MC) for 50+ wedding celebrations and formal corporate/government functions.",
          "Delivered keynote speeches and workshops on operational management, youth empowerment, and leadership across 15+ seminars.",
          "Directed end-to-end planning and live execution for 10+ large-scale events, managing vendor coordination, budgeting, and run-of-show.",
          "Formulated technical rundowns and contingency protocols ensuring flawless event delivery.",
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
      {
        id: 'proj-12',
        role: 'Interim Operations Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Conducted a comprehensive audit and restructuring of operational management systems, financial governance, and social media strategy.",
          "Standardized internal cross-divisional workflow SOPs to eliminate process inefficiencies within an intensive 1-month timeline.",
          "Developed operational data integration governance and structured reporting to support executive decision-making.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Marketing & Content Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Managed influencer collaborations and creator activations for the digital promotion campaign of the Ambefit health product.",
          "Formulated creative content concepts and directed promotional assets to maximize brand awareness and sales conversion.",
          "Monitored and evaluated content engagement metrics, audience reach, and campaign ROI.",
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
      {
        id: 'proj-12',
        role: 'Interim Operations & Workflow Restructuring Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Led business process audits and holistic operational restructuring for an interior design & build firm.",
          "Standardized cross-functional workflow SOPs (design, production, logistics, finance) to eliminate operational bottlenecks.",
          "Established weekly operational data synchronization mechanisms to guarantee on-time interior project delivery.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Campaign & Operations Lead',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Orchestrated operational workflows for an influencer marketing campaign promoting Ambefit health products.",
          "Managed content production timelines, asset approval standards, and creator publishing schedule compliance.",
          "Evaluated operational campaign metrics and delivery efficiency across digital marketing channels.",
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
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Coordinated event hosts, performers, and on-ground crew across 50+ formal galas and wedding celebrations.",
          "Facilitated 15+ training workshops on leadership development, public communication, and talent management.",
          "Managed on-site staffing allocations, execution discipline, and team morale across 10+ large-scale productions.",
          "Built standardized service protocols and strong interpersonal coordination among organizing committee members.",
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
      {
        id: 'proj-12',
        role: 'Interim Operations & Org Restructuring Lead',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Audited organizational structure, team workload distribution, and cross-departmental communication flows.",
          "Established clear role accountability (RACI Framework), job standardizations, and inter-divisional coordination SOPs.",
          "Spearheaded change management initiatives fostering disciplined, transparent, and collaborative operational culture.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Creator & Talent Partnership Coordinator',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Managed creator onboarding, creative briefing, and collaborative engagements with external influencers.",
          "Established standardized content guidelines, production timelines, and talent performance review criteria.",
          "Ensured brand messaging compliance and sustained high creator output quality for Ambefit product campaigns.",
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
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Managed end-to-end event production lifecycles for 50+ weddings and 10+ corporate/community summits.",
          "Developed Work Breakdown Structures (WBS), master timeline schedules, and multi-vendor supervisory systems.",
          "Controlled event production budgets and mitigated stage technical risks with a 100% flawless execution record.",
          "Ensured all pre-event milestones and live execution deliverables met client quality expectations.",
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
      {
        id: 'proj-12',
        role: 'Interim Operations Project Manager (1-Month Sprint)',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Directed a high-velocity 1-month turnaround project restructuring operations, finance, and social media ecosystems.",
          "Established weekly sprint milestones, identified operational bottlenecks, and executed tactical corrective actions.",
          "Delivered 100% of targeted system enhancements on schedule with documented SOP handover.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Marketing Campaign Project Manager',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Managed the 2-month project lifecycle for an influencer marketing launch campaign for the Ambefit health product.",
          "Controlled creative asset production pipelines, multi-influencer release schedules, and content deliverables.",
          "Monitored campaign KPIs (reach, impressions, CTR) while mitigating content release timeline risks.",
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
      {
        id: 'proj-12',
        role: 'Interim Financial & Operations Systems Auditor',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'admin_finance',
        highlights: [
          "Conducted thorough audits of project financial tracking, operational cash flows, and overhead cost structures.",
          "Restructured expenditure authorization workflows, project budgeting protocols, and financial reconciliations.",
          "Designed structured project financial reporting templates to improve profit margin visibility and cost control.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Commercial Campaign & Budget Analyst',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'admin_finance',
        highlights: [
          "Managed influencer promotional budget allocations and monitored acquisition cost efficiencies (CPA / ROAS).",
          "Calculated creator performance commissions and audited deliverable proof-of-work prior to disbursement.",
          "Produced e-commerce marketing cost-efficiency reports based on sales conversion metrics.",
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
      {
        id: 'proj-12',
        role: 'Interim Operations & Social Media Strategy Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'marketing_media',
        highlights: [
          "Revamped social media presence, visual branding, and project portfolio showcases for PT Shansusdzar Indonesia.",
          "Aligned creative media production workflows with on-site interior project milestones for routine case studies.",
          "Enhanced posting consistency, visual identity coherence, and organic lead generation through digital channels.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Marketing & Digital Campaign Specialist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Designed and executed integrated digital influencer marketing campaigns for the Ambefit health product.",
          "Curated and directed content creators to produce high-converting educational and promotional video content.",
          "Analyzed engagement trends, short-form video virality, and digital sales funnel performance.",
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
      {
        id: 'proj-12',
        role: 'Operations & Systems Modernization Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'digital_tech',
        highlights: [
          "Designed workflow digitization and integrated reporting systems connecting operations and finance.",
          "Eliminated error-prone manual spreadsheets through cloud database architecture and digital workflow templates.",
          "Synchronized interior construction progress data for real-time executive dashboard monitoring.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Digital Content & E-Commerce Growth Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'digital_tech',
        highlights: [
          "Optimized e-commerce storefronts and social media channels through creator-led digital campaigns.",
          "Leveraged content performance analytics (reach, shares, click-through rates) for continuous creative optimization.",
          "Integrated influencer promotional calls-to-action with e-commerce landing pages and checkout funnels.",
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
  business_development: {
    summary:
      'Portfolio covering B2B corporate account delivery, commercial solution pitching, distribution and reseller channel acquisition, commercial pricing strategy, and client relationship management to maximize retention and account value.',
    projects: [
      {
        id: 'proj-1',
        role: 'Client Solutions & Account Delivery Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed account relationships and technical solution delivery for 30+ corporate agency software and multimedia projects.',
          'Identified corporate client pain points, drafted technical proposals, and negotiated project scope of work.',
          'Oversee project deliverable handovers to maintain high client satisfaction (CSAT >95%) and foster repeat orders.',
          'Coordinated closely with technical engineering teams to ensure deliverables aligned with commercial commitments.',
        ],
      },
      {
        id: 'proj-2',
        role: 'B2B & Reseller Channel Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Designed wholesale/reseller pricing matrices, COGS calculations, partner margin structures, and affiliate commissions.',
          'Established onboarding workflows and operational systems for B2B commercial partnerships to expand retail reach.',
          'Formulated competitive multi-channel pricing strategies balancing profitability and distributor growth.',
        ],
      },
      {
        id: 'proj-9',
        role: 'B2B Sales & Digital Acquisition Specialist',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project-based',
        category: 'marketing_media',
        highlights: [
          'Developed B2B lead acquisition pipelines for commercial printing solutions through targeted digital channels.',
          'Managed Meta Ads campaigns and digital storefronts to drive inbound price requests from corporate accounts.',
          'Increased B2B inbound inquiries by 40% while optimizing customer acquisition costs (CAC).',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Commercial Systems Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Reformed operational workflows and business proposal structures to enhance competitive positioning in the interior market.",
          "Restructured portfolio presentation standards, client inquiry response SLAs, and automated quotation pipelines.",
          "Optimized digital showcases on social media to attract high-ticket residential and commercial interior leads.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Partnership & Influencer Marketing Specialist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Built strategic promotional partnerships with e-commerce influencer networks for Ambefit health products.",
          "Formulated win-win commercial collaboration agreements between the brand, creators, and target consumer segments.",
          "Drove e-commerce store revenue growth by expanding brand reach across trusted creator audiences.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'B2B CRM & Lead Pipeline Platform',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'B2B CRM & lead pipeline platform: quote status tracking, automated client follow-ups, and deal conversion analytics.',
        impact:
          'Increased B2B prospect closing rate by 45% and accelerated deal conversion cycles 3x.',
        techStack: ['CRM Sales Pipeline', 'Lead Nurturing Automation', 'Deal Closing Analytics'],
        features: ['B2B Sales Funnel View', 'Automated Client Follow-up', 'Deal Valuation Analytics'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Corporate Prospecting Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'B2B market intelligence directory mapping 4,000+ corporate profiles (HRGA, Purchasing, GM) and industrial zones.',
        impact:
          'Mapped 4,000+ corporate entities and 5.200+ B2B decision-maker contacts, reducing initial prospecting time by 85%.',
        techStack: ['Corporate Intelligence Database', 'Industrial Geo-Index', 'B2B Search Engine'],
        features: ['PIC Contact Directory', 'Industrial Zone Filtering', 'Target Account Profiling'],
      },
    ],
  },
  strategic_management: {
    summary:
      'Portfolio covering strategic portfolio governance, operational efficiency advisory, C-level stakeholder management, business risk control, and cross-divisional program oversight.',
    projects: [
      {
        id: 'proj-1',
        role: 'Strategic Project Governance Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Oversees a portfolio of 35+ digital and multimedia projects from strategic goal definition to handover.',
          'Aligned project investment allocations with corporate strategic growth objectives.',
          'Provided guidance on operational risk management, quality compliance, and executive performance reporting.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Executive Event Director & Keynote Speaker',
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Led executive oversight and strategic direction for 10+ major regional events and formal symposiums.",
          "Delivered keynote addresses across 15+ forums on strategic leadership, management, and professional growth.",
          "Formed strategic partnerships with corporate leaders and public institutions.",
          "Established formal event protocol standards, crisis management, and institutional brand safeguarding.",
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Executive Operations & Management Advisor',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Executed an executive turnaround audit and restructured operational, financial, and branding governance systems.",
          "Engineered a streamlined governance framework eliminating bureaucratic friction within an intensive 1-month sprint.",
          "Presented strategic executive recommendations ensuring sustained operational efficiency and long-term business scalability.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Growth & Strategic Marketing Partner',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Spearheaded influencer marketing strategy for the commercial expansion of the Ambefit health product portfolio.",
          "Aligned digital marketing investments with target market penetration and marketplace brand equity objectives.",
          "Evaluated overall campaign ROI and formulated blueprints for ongoing creator marketing partnerships.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Executive Decision & ERP Portal',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Consolidated ERP and executive BI dashboard for real-time monitoring of financial, operational, and HR performance.',
        impact:
          'Accelerated C-Level decision-making cycles 2x with real-time consolidated data transparency.',
        techStack: ['Executive Dashboard', 'Cross-Divisional ERP', 'Business Intelligence'],
        features: ['C-Level Summary View', 'Real-time KPI Tracking', 'Multi-Unit Governance'],
      },
    ],
  },
  office_administration: {
    summary:
      'Portfolio covering operational administration governance, document archiving, daily financial recordkeeping, customer billing administration, and workflow consistency.',
    projects: [
      {
        id: 'proj-10',
        role: 'Administrative & Financial Control Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Managed monthly operational administration and financial reporting for 2,000+ active utility accounts.',
          'Handled daily cash logs, monthly bill calculations, and technical staff payroll reconciliation.',
          'Documented administrative archives and financial journals with high accuracy and transparency.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Administrative Operations Officer',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Managed student enrollment records, attendance logging, and tutor scheduling archives.',
          'Compiled periodic operational summary reports for management evaluation.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Administrative Systems Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'admin_finance',
        highlights: [
          "Restructured administrative archiving, operational cash records, and interior project documentation systems.",
          "Standardized periodic reporting formats, corporate correspondence, and inter-departmental document flows.",
          "Ensured comprehensive administrative transparency and operational ledger accuracy across business units.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Campaign Administration & Content Coordinator',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'admin_finance',
        highlights: [
          "Managed partnership contracts, influencer agreements, and proof-of-posting documentation archives.",
          "Maintained structured tracking sheets for campaign performance metrics and creator compensation disbursements.",
          "Coordinated marketing collateral distributions and timely product sample shipments to creator partners.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-5',
        title: 'VYNANCE',
        subtitle: 'Financial Ledger & Document System',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Financial transaction administration system, cash journal logging, and structured document archiving.',
        impact:
          'Reduced administrative reporting compilation time by 50% while improving record accuracy.',
        techStack: ['Ledger System', 'Document Archiving', 'Cash Flow Journal'],
        features: ['Automated Journaling', 'Receipt Archiving', 'Monthly Balance Report'],
      },
    ],
  },
  public_relations: {
    summary:
      'Portfolio covering corporate communications, public relations, digital & media management, formal event direction, and professional Master of Ceremony (MC) engagements.',
    projects: [
      {
        id: 'proj-7',
        role: 'Public Relations Speaker & MC Director',
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Represented institutional reputation as Master of Ceremonies (MC) across 50+ high-profile formal and corporate events.",
          "Delivered public lectures and interactive workshops on corporate PR, communication ethics, and youth leadership across 15+ events.",
          "Directed stage communication protocols, VIP guest relations, and live event run-downs for 10+ major regional gatherings.",
          "Maintained high public relations standards, media engagement alignment, and smooth audience interactions.",
        ],
      },
      {
        id: 'proj-5',
        role: 'Public Relations & Media Project Lead',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: '1.5-Year Project',
        category: 'marketing_media',
        highlights: [
          'Managed public communications, institutional social media channels, and promotional media production.',
          'Coordinated partnership contracts, legal documentation, and external stakeholder relationships.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Institutional Communications & Video Lead',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Produced institutional profile videos and managed website content for public messaging.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Corporate Communications & Operations Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'marketing_media',
        highlights: [
          "Restructured corporate visual branding and digital communications narrative through social media channels.",
          "Aligned architectural & interior design messaging with company operational craftsmanship standards.",
          "Established public communication SOPs and responsive client consultation handling on digital platforms.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Relations & Digital PR Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Built and nurtured strategic relationships with wellness influencers for the Ambefit digital product campaign.",
          "Crafted authentic brand storytelling guidelines ensuring credible and compliant communication of product benefits.",
          "Managed public engagement sentiment and optimized content reach to enhance online brand reputation.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'Digital PR & Media Campaign Hub',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Digital media communication platform: promotional publishing, press outreach tracking, and audience engagement analytics.',
        impact:
          'Enhanced institutional messaging visibility and media publication distribution efficiency.',
        techStack: ['Media Campaign Analytics', 'Content Scheduler', 'Public Engagement Tracker'],
        features: ['Multi-Channel Distribution', 'Audience Reach Analytics', 'Campaign Monitor'],
      },
    ],
  },
  supply_chain_logistics: {
    summary:
      'Portfolio covering inventory database architecture, automated stock replenishment, courier logistics coordination, supply chain efficiency, and warehouse shrinkage reduction.',
    projects: [
      {
        id: 'proj-2',
        role: 'Supply Chain & Inventory Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Built master inventory database for 100+ SKUs and designed automated replenishment systems to eliminate stockouts.',
          'Managed multi-courier logistics workflows, controlled shipping costs, and optimized order dispatch times.',
          'Implemented warehouse stock count SOPs, reducing inventory audit reconciliation duration by 60%.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Retail Supply Chain & Inventory Specialist',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Managed product database and catalog structure for 50+ perfume variant SKUs.',
          'Designed automated stock reorder controls to maintain optimal warehouse safety stock.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Supply Flow Restructuring Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Audited and streamlined interior material supply chains, subcontractor coordination, and workshop delivery schedules.",
          "Formulated material receiving SOPs, project inventory controls, and supply bottleneck mitigation strategies.",
          "Improved synchronization between procurement schedules and on-site interior installation timelines.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Product Fulfillment & Campaign Coordinator',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'operations_retail',
        highlights: [
          "Coordinated e-commerce inventory readiness to absorb customer order spikes generated by influencer campaigns.",
          "Monitored fulfillment speed and tracked promotional sample product deliveries to content creator partners.",
          "Evaluated alignment between promotional campaign timelines and marketplace stock availability.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Supply Chain & Logistics Engine',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Supply chain management system: raw material tracking, stock inbound/outbound logging, and vendor AP/AR management.',
        impact:
          'Reduced inventory discrepancies by 70% and automated 100% accurate COGS ledgering.',
        techStack: ['Inventory Engine', 'Supplier Ledger', 'Warehouse Distribution Tracker'],
        features: ['Real-time Stock Balance', 'Supplier Order Tracking', 'HPP FIFO/LIFO Calculator'],
      },
    ],
  },
  software_development: {
    summary:
      'Portfolio covering full-stack web software engineering, AI automation API integration, MySQL/Firebase database optimization, and application release lifecycle management.',
    projects: [
      {
        id: 'proj-1',
        role: 'Full-Stack Software & AI Specialist',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Architected and built 30+ websites, web apps, and API-driven AI automation solutions.',
          'Integrated REST APIs, cloud databases (Firebase/MySQL), and automated workflow scripts.',
          'Ensured code quality, data security, and release pipeline reliability.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Web Platform & System Developer',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Developed official institutional website utilizing modern, responsive web engineering standards.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Operations & Systems Modernization Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'digital_tech',
        highlights: [
          "Designed workflow digitization and integrated reporting systems connecting operations and finance.",
          "Eliminated error-prone manual spreadsheets through cloud database architecture and digital workflow templates.",
          "Synchronized interior construction progress data for real-time executive dashboard monitoring.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Digital Content & E-Commerce Growth Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'digital_tech',
        highlights: [
          "Optimized e-commerce storefronts and social media channels through creator-led digital campaigns.",
          "Leveraged content performance analytics (reach, shares, click-through rates) for continuous creative optimization.",
          "Integrated influencer promotional calls-to-action with e-commerce landing pages and checkout funnels.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Full-Stack Enterprise Web Application',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Full-stack enterprise web application with modular architecture, REST API integrations, and real-time data sync.',
        impact:
          'Eliminated 80% of data redundancy and delivered high-performance system access.',
        techStack: ['React & Node', 'REST API Engine', 'Real-Time Database'],
        features: ['Modular Architecture', 'Role-Based Access', 'Real-Time Data Sync'],
      },
    ],
  },
  b2b_sales: {
    summary:
      'Portfolio covering B2B corporate account delivery, commercial solution pitching, distribution and reseller channel acquisition, commercial pricing strategy, and client relationship management to maximize retention and account value.',
    projects: [
      {
        id: 'proj-1',
        role: 'Client Solutions & Account Delivery Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed account relationships and technical solution delivery for 30+ corporate agency software and multimedia projects.',
          'Identified corporate client pain points, drafted technical proposals, and negotiated project scope of work.',
          'Oversee project deliverable handovers to maintain high client satisfaction (CSAT >95%) and foster repeat orders.',
          'Coordinated closely with technical engineering teams to ensure deliverables aligned with commercial commitments.',
        ],
      },
      {
        id: 'proj-2',
        role: 'B2B & Reseller Channel Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Designed wholesale/reseller pricing matrices, COGS calculations, partner margin structures, and affiliate commissions.',
          'Established onboarding workflows and operational systems for B2B commercial partnerships to expand retail reach.',
          'Formulated competitive multi-channel pricing strategies balancing profitability and distributor growth.',
        ],
      },
      {
        id: 'proj-9',
        role: 'B2B Sales & Digital Acquisition Specialist',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project-based',
        category: 'marketing_media',
        highlights: [
          'Developed B2B lead acquisition pipelines for commercial printing solutions through targeted digital channels.',
          'Managed Meta Ads campaigns and digital storefronts to drive inbound price requests from corporate accounts.',
          'Increased B2B inbound inquiries by 40% while optimizing customer acquisition costs (CAC).',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Commercial Systems Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Reformed operational workflows and business proposal structures to enhance competitive positioning in the interior market.",
          "Restructured portfolio presentation standards, client inquiry response SLAs, and automated quotation pipelines.",
          "Optimized digital showcases on social media to attract high-ticket residential and commercial interior leads.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Partnership & Influencer Marketing Specialist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Built strategic promotional partnerships with e-commerce influencer networks for Ambefit health products.",
          "Formulated win-win commercial collaboration agreements between the brand, creators, and target consumer segments.",
          "Drove e-commerce store revenue growth by expanding brand reach across trusted creator audiences.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'B2B CRM & Lead Pipeline Platform',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'B2B CRM & lead pipeline platform: quote status tracking, automated client follow-ups, and deal conversion analytics.',
        impact:
          'Increased B2B prospect closing rate by 45% and accelerated deal conversion cycles 3x.',
        techStack: ['CRM Sales Pipeline', 'Lead Nurturing Automation', 'Deal Closing Analytics'],
        features: ['B2B Sales Funnel View', 'Automated Client Follow-up', 'Deal Valuation Analytics'],
      },
      {
        id: 'sol-6',
        title: 'MYDIBY',
        subtitle: 'B2B Corporate Prospecting Engine',
        category: 'management',
        demoUrl: 'https://mydiby.vercel.app',
        isPrototype: true,
        description:
          'B2B market intelligence directory mapping 4,000+ corporate profiles (HRGA, Purchasing, GM) and industrial zones.',
        impact:
          'Mapped 4,000+ corporate entities and 5,200+ B2B decision-maker contacts, reducing initial prospecting time by 85%.',
        techStack: ['Corporate Intelligence Database', 'Industrial Geo-Index', 'B2B Search Engine'],
        features: ['PIC Contact Directory', 'Industrial Zone Filtering', 'Target Account Profiling'],
      },
    ],
  },
  sales_executive: {
    summary:
      'Portfolio focused on B2B sales execution, corporate market penetration, price negotiations, sales pipeline management, and client retention.',
    projects: [
      {
        id: 'proj-9',
        role: 'B2B Sales & Account Consultant',
        organization: 'PT. Anugrah Dwi Tunggal',
        sector: 'Digital Printing Solution',
        periodType: 'Project-based',
        category: 'marketing_media',
        highlights: [
          'Led B2B corporate client acquisition for commercial printing volume projects.',
          'Drafted commercial proposals, led price negotiations, and presented solution pitches to corporate decision-makers.',
          'Increased B2B lead inquiry volume by 40% via targeted digital acquisition campaigns.',
        ],
      },
      {
        id: 'proj-1',
        role: 'Client Account Delivery Specialist',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Managed ongoing engagements with 30+ agency project clients to ensure commercial expectation fulfillment.',
          'Oversee on-time solution delivery to maintain account retention and customer satisfaction.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Commercial Systems Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Reformed operational workflows and business proposal structures to enhance competitive positioning in the interior market.",
          "Restructured portfolio presentation standards, client inquiry response SLAs, and automated quotation pipelines.",
          "Optimized digital showcases on social media to attract high-ticket residential and commercial interior leads.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Marketing & Sales Conversion Specialist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Directed creator-led promotional campaigns designed to maximize retail sales volume on e-commerce platforms.",
          "Integrated creator discount voucher tracking and conversion funnels to evaluate channel sales velocity.",
          "Boosted e-commerce store revenues through coordinated multi-influencer product promotions.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'Sales Pipeline & CRM Engine',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Sales pipeline and CRM application for tracking leads, client meeting schedules, and closing probabilities.',
        impact:
          'Improved B2B prospect handling efficiency by 45% and sped up commercial follow-up times.',
        techStack: ['Sales Pipeline', 'Lead Tracking', 'Opportunity Matrix'],
        features: ['Deal Funnel', 'Client Task Reminder', 'Revenue Forecasting'],
      },
    ],
  },
  executive: {
    summary:
      'Portfolio covering strategic portfolio governance, operational efficiency advisory, C-level stakeholder management, business risk control, and cross-divisional program oversight.',
    projects: [
      {
        id: 'proj-1',
        role: 'Strategic Project Governance Lead',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Oversees a portfolio of 35+ digital and multimedia projects from strategic goal definition to handover.',
          'Aligned project investment allocations with corporate strategic growth objectives.',
          'Provided guidance on operational risk management, quality compliance, and executive performance reporting.',
        ],
      },
      {
        id: 'proj-7',
        role: 'Executive Event Director & Keynote Speaker',
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Led executive oversight and strategic direction for 10+ major regional events and formal symposiums.",
          "Delivered keynote addresses across 15+ forums on strategic leadership, management, and professional growth.",
          "Formed strategic partnerships with corporate leaders and public institutions.",
          "Established formal event protocol standards, crisis management, and institutional brand safeguarding.",
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Executive Operations & Management Advisor',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Executed an executive turnaround audit and restructured operational, financial, and branding governance systems.",
          "Engineered a streamlined governance framework eliminating bureaucratic friction within an intensive 1-month sprint.",
          "Presented strategic executive recommendations ensuring sustained operational efficiency and long-term business scalability.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Growth & Strategic Marketing Partner',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Spearheaded influencer marketing strategy for the commercial expansion of the Ambefit health product portfolio.",
          "Aligned digital marketing investments with target market penetration and marketplace brand equity objectives.",
          "Evaluated overall campaign ROI and formulated blueprints for ongoing creator marketing partnerships.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Executive Decision & ERP Portal',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Consolidated ERP and executive BI dashboard for real-time monitoring of financial, operational, and HR performance.',
        impact:
          'Accelerated C-Level decision-making cycles 2x with real-time consolidated data transparency.',
        techStack: ['Executive Dashboard', 'Cross-Divisional ERP', 'Business Intelligence'],
        features: ['C-Level Summary View', 'Real-time KPI Tracking', 'Multi-Unit Governance'],
      },
    ],
  },
  branch_manager: {
    summary:
      'Portfolio covering multi-branch store operations governance, outlet service audit, stock & POS control, store frontliner team supervision, and branch commercial performance.',
    projects: [
      {
        id: 'proj-11',
        role: 'Retail Store Network Manager',
        organization: 'CV Multi Sejahtera',
        sector: 'Retail Gadget & Smartphone',
        periodType: '4-Month Project',
        category: 'marketing_media',
        highlights: [
          'Led retail operations and marketing strategy across a 5-store gadget retail network.',
          'Conducted visual merchandising audits across all outlets and aligned frontliner staff sales scripts.',
          'Analyzed branch sales performance metrics and localized promotional effectiveness.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Branch Operations & Retail Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Designed store outlet SOPs, cashier/POS management, and automated inventory replenishment workflows.',
          'Established stock receiving controls, periodic inventory audits, and loss prevention procedures.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Branch Academic & Operations Manager',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Managed daily branch operations: scheduling 300+ students across 30 tutors and classroom capacities.',
          'Supervised administrative and teaching staff workflow compliance to maximize student retention.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Branch Management Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Upgraded daily operations, petty cash governance, and staff SOP compliance at PT Shansusdzar Indonesia.",
          "Standardized operational supervision systems, task targets, and team execution discipline.",
          "Implemented periodic reporting rhythms enabling comprehensive holistic business monitoring.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Multi-Channel Promotional Campaign Lead',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Led digital promotional drives for the Ambefit product via coordinated creator partnerships.",
          "Ensured marketing messaging aligned with e-commerce revenue targets and target buyer personas.",
          "Evaluated activation results to enhance promotional effectiveness across subsequent quarters.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Multi-Branch Inventory & Logistics Engine',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Multi-branch stock management system: stock inbound/outbound logging, inter-outlet stock transfers, and automated COGS calculation.',
        impact:
          'Reduced stock discrepancies by 70% and accelerated branch stock audit processes by 60%.',
        techStack: ['Multi-Branch Inventory', 'POS Sync', 'Stock Transfer Engine'],
        features: ['Inter-Store Transfer', 'Outlet Stock Alerts', 'Automated HPP Ledger'],
      },
    ],
  },
  admin: {
    summary:
      'Portfolio covering operational administration governance, document archiving, daily financial recordkeeping, customer billing administration, and workflow consistency.',
    projects: [
      {
        id: 'proj-10',
        role: 'Administrative & Financial Control Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Managed monthly operational administration and financial reporting for 2,000+ active utility accounts.',
          'Handled daily cash logs, monthly bill calculations, and technical staff payroll reconciliation.',
          'Documented administrative archives and financial journals with high accuracy and transparency.',
        ],
      },
      {
        id: 'proj-3',
        role: 'Academic & Administrative Operations Officer',
        organization: 'Lingua First',
        sector: 'English Language Institute',
        periodType: '6-Month Collaboration',
        category: 'operations_retail',
        highlights: [
          'Managed student enrollment records, attendance logging, and tutor scheduling archives.',
          'Compiled periodic operational summary reports for management evaluation.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Administrative Systems Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'admin_finance',
        highlights: [
          "Restructured administrative archiving, operational cash records, and interior project documentation systems.",
          "Standardized periodic reporting formats, corporate correspondence, and inter-departmental document flows.",
          "Ensured comprehensive administrative transparency and operational ledger accuracy across business units.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Campaign Administration & Content Coordinator',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'admin_finance',
        highlights: [
          "Managed partnership contracts, influencer agreements, and proof-of-posting documentation archives.",
          "Maintained structured tracking sheets for campaign performance metrics and creator compensation disbursements.",
          "Coordinated marketing collateral distributions and timely product sample shipments to creator partners.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-5',
        title: 'VYNANCE',
        subtitle: 'Financial Ledger & Document System',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Financial transaction administration system, cash journal logging, and structured document archiving.',
        impact:
          'Reduced administrative reporting compilation time by 50% while improving record accuracy.',
        techStack: ['Ledger System', 'Document Archiving', 'Cash Flow Journal'],
        features: ['Automated Journaling', 'Receipt Archiving', 'Monthly Balance Report'],
      },
    ],
  },
  pr: {
    summary:
      'Portfolio covering corporate communications, public relations, digital & media management, formal event direction, and professional Master of Ceremony (MC) engagements.',
    projects: [
      {
        id: 'proj-7',
        role: 'Public Relations Speaker & MC Director',
        organization: 'PRATAMA EVENT ORGANIZER',
        sector: 'Event Management & Public Speaking',
        periodType: 'Project-based',
        category: 'event_public',
        highlights: [
          "Represented institutional reputation as Master of Ceremonies (MC) across 50+ high-profile formal and corporate events.",
          "Delivered public lectures and interactive workshops on corporate PR, communication ethics, and youth leadership across 15+ events.",
          "Directed stage communication protocols, VIP guest relations, and live event run-downs for 10+ major regional gatherings.",
          "Maintained high public relations standards, media engagement alignment, and smooth audience interactions.",
        ],
      },
      {
        id: 'proj-5',
        role: 'Public Relations & Media Project Lead',
        organization: 'STIE Wibawa Karta Raharja',
        sector: 'Higher Education',
        periodType: '1.5-Year Project',
        category: 'marketing_media',
        highlights: [
          'Managed public communications, institutional social media channels, and promotional media production.',
          'Coordinated partnership contracts, legal documentation, and external stakeholder relationships.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Institutional Communications & Video Lead',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Produced institutional profile videos and managed website content for public messaging.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Corporate Communications & Operations Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'marketing_media',
        highlights: [
          "Restructured corporate visual branding and digital communications narrative through social media channels.",
          "Aligned architectural & interior design messaging with company operational craftsmanship standards.",
          "Established public communication SOPs and responsive client consultation handling on digital platforms.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Influencer Relations & Digital PR Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'marketing_media',
        highlights: [
          "Built and nurtured strategic relationships with wellness influencers for the Ambefit digital product campaign.",
          "Crafted authentic brand storytelling guidelines ensuring credible and compliant communication of product benefits.",
          "Managed public engagement sentiment and optimized content reach to enhance online brand reputation.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-4',
        title: 'NEXTMARK',
        subtitle: 'Digital PR & Media Campaign Hub',
        category: 'crm',
        demoUrl: 'https://nextmarkefing.vercel.app',
        isPrototype: true,
        description:
          'Digital media communication platform: promotional publishing, press outreach tracking, and audience engagement analytics.',
        impact:
          'Enhanced institutional messaging visibility and media publication distribution efficiency.',
        techStack: ['Media Campaign Analytics', 'Content Scheduler', 'Public Engagement Tracker'],
        features: ['Multi-Channel Distribution', 'Audience Reach Analytics', 'Campaign Monitor'],
      },
    ],
  },
  supply_chain: {
    summary:
      'Portfolio covering inventory database architecture, automated stock replenishment, courier logistics coordination, supply chain efficiency, and warehouse shrinkage reduction.',
    projects: [
      {
        id: 'proj-2',
        role: 'Supply Chain & Inventory Consultant',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Built master inventory database for 100+ SKUs and designed automated replenishment systems to eliminate stockouts.',
          'Managed multi-courier logistics workflows, controlled shipping costs, and optimized order dispatch times.',
          'Implemented warehouse stock count SOPs, reducing inventory audit reconciliation duration by 60%.',
        ],
      },
      {
        id: 'proj-4',
        role: 'Retail Supply Chain & Inventory Specialist',
        organization: 'Melin Parfum',
        sector: 'Perfume Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Managed product database and catalog structure for 50+ perfume variant SKUs.',
          'Designed automated stock reorder controls to maintain optimal warehouse safety stock.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Operations & Supply Flow Restructuring Manager',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'operations_retail',
        highlights: [
          "Audited and streamlined interior material supply chains, subcontractor coordination, and workshop delivery schedules.",
          "Formulated material receiving SOPs, project inventory controls, and supply bottleneck mitigation strategies.",
          "Improved synchronization between procurement schedules and on-site interior installation timelines.",
        ],
      },
      {
        id: 'proj-13',
        role: 'E-Commerce Product Fulfillment & Campaign Coordinator',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'operations_retail',
        highlights: [
          "Coordinated e-commerce inventory readiness to absorb customer order spikes generated by influencer campaigns.",
          "Monitored fulfillment speed and tracked promotional sample product deliveries to content creator partners.",
          "Evaluated alignment between promotional campaign timelines and marketplace stock availability.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-2',
        title: 'LOGISTOR',
        subtitle: 'Supply Chain & Logistics Engine',
        category: 'enterprise',
        demoUrl: 'https://logistor.vercel.app',
        isPrototype: true,
        description:
          'Supply chain management system: raw material tracking, stock inbound/outbound logging, and vendor AP/AR management.',
        impact:
          'Reduced inventory discrepancies by 70% and automated 100% accurate COGS ledgering.',
        techStack: ['Inventory Engine', 'Supplier Ledger', 'Warehouse Distribution Tracker'],
        features: ['Real-time Stock Balance', 'Supplier Order Tracking', 'HPP FIFO/LIFO Calculator'],
      },
    ],
  },
  finance: {
    summary:
      'Portfolio covering operational financial analysis, COGS calculation, multi-platform tax & pricing structure formulation, cash journal ledger, cashier audit, and P&L reporting.',
    projects: [
      {
        id: 'proj-10',
        role: 'Financial & Administrative Control Officer',
        organization: 'Tirta Raharja – BPSPAMS',
        sector: 'Water & Sanitation Organization',
        periodType: 'Monthly Project',
        category: 'admin_finance',
        highlights: [
          'Managed monthly operational administration and financial reporting for 2,000+ active utility accounts.',
          'Calculated monthly billing, tracked cash inflows/outflows, and reconciled technical staff payroll.',
          'Maintained accurate cash ledger books and monthly financial transparency reports.',
        ],
      },
      {
        id: 'proj-2',
        role: 'Financial & Pricing Operations Analyst',
        organization: 'World Street Trendy Fashion',
        sector: 'Footwear Retail',
        periodType: 'Project-based',
        category: 'operations_retail',
        highlights: [
          'Formulated COGS calculations, profit margins, and bottom price thresholds for 100+ SKUs.',
          'Adjusted e-commerce list prices for marketplace commission cuts and tax requirements.',
          'Compiled periodic financial reports and stock-to-cash reconciliation balances.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Interim Financial & Operations Systems Auditor',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'admin_finance',
        highlights: [
          "Conducted thorough audits of project financial tracking, operational cash flows, and overhead cost structures.",
          "Restructured expenditure authorization workflows, project budgeting protocols, and financial reconciliations.",
          "Designed structured project financial reporting templates to improve profit margin visibility and cost control.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Commercial Campaign & Budget Analyst',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'admin_finance',
        highlights: [
          "Managed influencer promotional budget allocations and monitored acquisition cost efficiencies (CPA / ROAS).",
          "Calculated creator performance commissions and audited deliverable proof-of-work prior to disbursement.",
          "Produced e-commerce marketing cost-efficiency reports based on sales conversion metrics.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-5',
        title: 'VYNANCE',
        subtitle: 'Accounting & Asset Management System',
        category: 'management',
        demoUrl: 'https://aset-plus.vercel.app',
        isPrototype: true,
        description:
          'Financial accounting system, transaction journals, cash flow tracking, asset depreciation, and real-time P&L reports.',
        impact:
          'Eliminated manual bookkeeping errors by 95% and accelerated monthly close cycles by 50%.',
        techStack: ['General Ledger', 'Asset Depreciation Engine', 'P&L Sync'],
        features: ['Automated Ledger Entry', 'Asset Lifecycle Tracking', 'Cash Flow Statement'],
      },
    ],
  },
  software_dev: {
    summary:
      'Portfolio covering full-stack web software engineering, AI automation API integration, MySQL/Firebase database optimization, and application release lifecycle management.',
    projects: [
      {
        id: 'proj-1',
        role: 'Full-Stack Software & AI Specialist',
        organization: 'Alinlabs Indonesia',
        sector: 'Digital Agency & AI Solutions',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Architected and built 30+ websites, web apps, and API-driven AI automation solutions.',
          'Integrated REST APIs, cloud databases (Firebase/MySQL), and automated workflow scripts.',
          'Ensured code quality, data security, and release pipeline reliability.',
        ],
      },
      {
        id: 'proj-6',
        role: 'Web Platform & System Developer',
        organization: 'Pesantren Minnatul Huda',
        sector: 'Islamic Educational Boarding School',
        periodType: 'Project-based',
        category: 'digital_tech',
        highlights: [
          'Developed official institutional website utilizing modern, responsive web engineering standards.',
        ],
      },
      {
        id: 'proj-12',
        role: 'Operations & Systems Modernization Consultant',
        organization: 'PT Shansusdzar Indonesia',
        sector: 'Interior Design & Build',
        periodType: '1-Month Project',
        category: 'digital_tech',
        highlights: [
          "Designed workflow digitization and integrated reporting systems connecting operations and finance.",
          "Eliminated error-prone manual spreadsheets through cloud database architecture and digital workflow templates.",
          "Synchronized interior construction progress data for real-time executive dashboard monitoring.",
        ],
      },
      {
        id: 'proj-13',
        role: 'Digital Content & E-Commerce Growth Strategist',
        organization: 'Tiens E-Commerce Partner (Ambefit)',
        sector: 'Health & Wellness E-Commerce',
        periodType: '2-Month Project',
        category: 'digital_tech',
        highlights: [
          "Optimized e-commerce storefronts and social media channels through creator-led digital campaigns.",
          "Leveraged content performance analytics (reach, shares, click-through rates) for continuous creative optimization.",
          "Integrated influencer promotional calls-to-action with e-commerce landing pages and checkout funnels.",
        ],
      },
    ],
    digitalSolutions: [
      {
        id: 'sol-1',
        title: 'GLOBAL MITRA GATEWAY',
        subtitle: 'Full-Stack Enterprise Web Application',
        category: 'enterprise',
        demoUrl: 'https://gmgindonesia.vercel.app',
        isPrototype: true,
        description:
          'Full-stack enterprise web application with modular architecture, REST API integrations, and real-time data sync.',
        impact:
          'Eliminated 80% of data redundancy and delivered high-performance system access.',
        techStack: ['React & Node', 'REST API Engine', 'Real-Time Database'],
        features: ['Modular Architecture', 'Role-Based Access', 'Real-Time Data Sync'],
      },
    ],
  },
};
// Additional preset aliases and industrial mappings
PRESET_PROJECTS_EN['manufacturing_operations'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['hospital_office_admin'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['general_affairs'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['ppic_inventory'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['procurement_purchasing'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['qa_qc_compliance'] = PRESET_PROJECTS_EN['optimal'];
PRESET_PROJECTS_EN['customer_service_operations'] = PRESET_PROJECTS_EN['optimal'];
