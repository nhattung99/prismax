import type { EcosystemSector, GlossaryTerm, OnboardingTopic, TeleopStep, TimelineEvent } from '../types/learn';

export const ONBOARDING_TOPICS: OnboardingTopic[] = [
  {
    id: 'what-is-prismax',
    number: 1,
    title: 'What is PrismaX?',
    subtitle: 'The Service Layer for Physical AI',
    category: 'core',
    definition: 'PrismaX describes itself as "the service layer for physical AI" — an infrastructure layer that enables robots, training data, and human effort to be deployed under a unified standard for physical artificial intelligence development. In simple terms: PrismaX builds infrastructure for humans to teach physical robots using remote operation (teleoperation) while capturing high-quality data to train robot foundation models.',
    whyItMatters: 'This is the foundational concept. Every other element in the ecosystem (Teleop, Verify Quality, Prisma Points, Robot Fleet) is a component serving this core objective.',
    source: 'prismax.ai (Official Homepage)'
  },
  {
    id: 'three-pillars',
    number: 2,
    title: 'Three Pillars: Robots — Data — Intelligence',
    subtitle: 'The Closed-Loop Architecture',
    category: 'core',
    definition: 'PrismaX is built around 3 core pillars: (1) Robots (Remote Operation): Standardizing remote robot operation, providing turn-key software and payment infrastructure so hardware manufacturers can focus on core hardware innovations. (2) Data: Establishing verification and incentive mechanisms for large-scale video/multimodal data collection to match text data quality and reliability. (3) Intelligence (Models): Partnering with leading AI teams to build models trained on this data pipeline.',
    whyItMatters: 'Helps newcomers realize PrismaX is not just an app to control robots for points, but a complete flywheel: Robots ➔ Data ➔ AI Models ➔ Better Robot Control.',
    source: 'prismax.ai & MEXC News CEO Interview'
  },
  {
    id: 'vla',
    number: 3,
    title: 'VLA (Vision-Language-Action)',
    subtitle: 'Multimodal Foundation Models for Robotics',
    category: 'core',
    definition: 'VLA is an AI model architecture that learns simultaneously from three signal sources — visual perception (Vision), natural language instructions (Language), and motor actions (Action) — allowing robots to understand their environment, interpret human instructions, and execute physical tasks in real time. Teleop data collected by operators serves directly as VLA training dataset.',
    whyItMatters: 'VLA is the technical destination for all dataset harvesting on PrismaX — understanding VLA explains why individual session quality is crucial.',
    source: 'prismax.ai/blog/introducing-the-first-100'
  },
  {
    id: 'vla-foundry',
    number: 4,
    title: 'VLA Foundry',
    subtitle: 'The Industrialized Data Production Engine',
    category: 'core',
    definition: 'VLA Foundry is the data factory of PrismaX — transforming raw teleoperation data into diverse, large-scale, high-quality, production-ready datasets for robot model training. The operational cycle: Operators upload teleop data ➔ Validators verify data quality ➔ AI & Robotics clients consume datasets ➔ Training & model benchmark evaluations feed back to refine the next collection cycle.',
    whyItMatters: 'This is the true core product of PrismaX — Verify Quality is the first public-facing module of the VLA Foundry.',
    source: 'prismax.ai/blog/introducing-the-first-100'
  },
  {
    id: 'teleoperation',
    number: 5,
    title: 'Teleoperation (Teleop)',
    subtitle: 'Remote Physical Robot Control',
    category: 'teleop',
    definition: 'The act of controlling a physical robot arm remotely via the web/app interface of PrismaX to perform physical tasks (manipulation, pick-and-place, assembly). Each teleop session serves both as active work execution and training data generation.',
    whyItMatters: 'The core primary activity operators perform upon joining PrismaX.',
    source: 'prismax.ai & gateway.prismax.ai'
  },
  {
    id: 'verify-quality',
    number: 6,
    title: 'Verify Quality',
    subtitle: 'Decentralized Community Data Scoring',
    category: 'teleop',
    definition: 'Data quality evaluation program where community members (with qualifying membership tiers) review video recordings and telemetry logs of recorded robot runs ("episodes") and rate their quality. Evaluation steps: (1) Pass/Fail Criteria: Clear camera feeds, successful task completion, robot hand visible in frame, camera synchronization. (2) Sliding Scale Scoring: Smoothness of trajectory, operator control dexterity, appropriate speed, reaching intended target state, and introducing novel state variations rather than redundant repetition. Episodes are evaluated independently by multiple validators to form a consensus score.',
    whyItMatters: 'The key quality assurance mechanism powering VLA Foundry, and the primary way for community members to earn Prisma Points.',
    source: 'prismax.ai/blog/introducing-the-first-100'
  },
  {
    id: 'the-first-100',
    number: 7,
    title: 'The First 100',
    subtitle: 'Founding Data Quality Validators',
    category: 'teleop',
    definition: 'The founding program selecting 100 inaugural Data Quality Validators for PrismaX. In the initial evaluation window, Amplifier tier members received 10 ratings, and Innovator tier members received 30 ratings. The 100 validators closest to dataset consensus became The First 100. This list is dynamic — every month, the bottom 25% lowest consensus scoring validators are rotated out and replaced by top performers.',
    whyItMatters: 'A clear example of how PrismaX converts community activity into long-term founding roles based on sustained accuracy.',
    source: 'prismax.ai/blog/introducing-the-first-100'
  },
  {
    id: 'prisma-points',
    number: 8,
    title: 'Prisma Points',
    subtitle: 'Community Telemetry Reward Points',
    category: 'tokens',
    definition: 'Accumulated reward points earned by operators and validators through platform activities — rating episodes in Verify Quality, participating in teleoperation campaigns (e.g. Teleop Cup), and ecosystem events. Every submitted rating (regardless of whether it lands in consensus) earns Prisma Points.',
    whyItMatters: 'Primary reward mechanism driving community engagement across teleop and verification tasks.',
    source: 'prismax.ai/blog/introducing-the-first-100',
    unannouncedWarning: 'Official tokenomics and exact conversion mechanics from Prisma Points to $PIX tokens have NOT been publicly released yet by PrismaX. Avoid speculation on conversion rates.'
  },
  {
    id: 'pix-token',
    number: 9,
    title: '$PIX Token',
    subtitle: 'Utility Token & Service Clearing House Asset',
    category: 'tokens',
    definition: '$PIX is the native utility token of the PrismaX ecosystem, described as a "tradable reservation asset" used to settle network service access via decentralized clearing houses.',
    whyItMatters: 'The economic layer anchoring network service utilization and clearing settlement.',
    source: 'Public Disclosures & Network Technical Overview',
    unannouncedWarning: '$PIX has NOT undergone its Token Generation Event (TGE) yet. There is no circulating supply, market price, or official public tokenomics breakdown (allocations, vesting schedules).'
  },
  {
    id: 'gateway',
    number: 10,
    title: 'Gateway',
    subtitle: 'Real-World Robot Operation Portal',
    category: 'hardware',
    definition: 'Gateway (gateway.prismax.ai) is the physical robot operation portal where operators connect to control physical robot arms, view real-time camera telemetry, and access platform features. Accessible directly via "Operate Real Robots" on the homepage.',
    whyItMatters: 'The actual daily operational workplace for robot teleoperators, distinct from app.prismax.ai (which hosts Verify Quality and Robot Fleet).',
    source: 'prismax.ai Homepage & Q2 2026 Product Update'
  },
  {
    id: 'robot-fleet',
    number: 11,
    title: 'Robot Fleet (Device Partners)',
    subtitle: 'Validated Hardware Marketplace',
    category: 'hardware',
    definition: 'Robot Fleet inside the PrismaX app is a hardware marketplace where operators view technical specs and purchase validated physical robot arms with turnkey onboarding and setup included. Official Validated Models (Q2 2026): Piper (Agilex Robotics), TOK2 (Airbot), YAM (I2RT Robotics). In addition, PrismaX supports direct robot registration for hardware from Airbot, AGILEX, I2RT Robotics, and Realman.',
    whyItMatters: 'Represents the official validated hardware whitelist confirmed by PrismaX.',
    source: 'prismax.ai/blog/prismax-product-updates-q2-2026'
  },
  {
    id: 'membership-tiers',
    number: 12,
    title: 'Membership Tiers: Amplifier & Innovator',
    subtitle: 'Tiered Access & Participation Allowances',
    category: 'hardware',
    definition: 'Membership tiers that determine participation allowances in platform programs such as Verify Quality or teleop campaigns: Amplifier (Standard tier: e.g. 10 rating slots in initial evaluation window, 3 plays/day in Teleop Cup) vs Innovator (Premium tier: e.g. 30 rating slots in initial evaluation window, 6 plays/day in Teleop Cup).',
    whyItMatters: 'Governs daily interaction limits and verification throughput for members.',
    source: 'prismax.ai/blog/introducing-the-first-100',
    unannouncedWarning: 'Complete qualification requirements, upgrade pathways, and pricing for Amplifier/Innovator tiers have not been fully disclosed in official public documentation.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Amplifier',
    shortDef: 'PrismaX membership tier with standard participation allowances (e.g., 10 Verify Quality ratings per initial cycle, 3 Teleop Cup plays/day).',
    category: 'roles',
    topicId: 'membership-tiers'
  },
  {
    term: 'Clearing house',
    shortDef: 'Decentralized settlement mechanism used to exchange and settle network service access within PrismaX using $PIX tokens.',
    category: 'token',
    topicId: 'pix-token'
  },
  {
    term: 'Consensus',
    shortDef: 'Aggregated quality score generated from multiple independent validator ratings on a single data episode in Verify Quality.',
    category: 'teleop',
    topicId: 'verify-quality'
  },
  {
    term: 'Day 1 Launch Partners',
    shortDef: 'Group of founding web3 and robotics organizations that battle-tested Verify Quality prior to public release.',
    category: 'general',
    topicId: 'the-first-100'
  },
  {
    term: 'Episode',
    shortDef: 'A single recorded session segment of a robot performing a task, serving as the foundational unit rated by validators.',
    category: 'teleop',
    topicId: 'verify-quality'
  },
  {
    term: 'Gateway',
    shortDef: 'Physical robot teleoperation portal (gateway.prismax.ai) where operators connect to control real robot arms.',
    category: 'hardware',
    topicId: 'gateway'
  },
  {
    term: 'Innovator',
    shortDef: 'Premium PrismaX membership tier featuring higher participation allowances (e.g., 30 Verify Quality ratings per initial cycle).',
    category: 'roles',
    topicId: 'membership-tiers'
  },
  {
    term: 'Operator',
    shortDef: 'Human user who remotely operates physical robot arms (teleoperation) to complete tasks and harvest VLA training data.',
    category: 'roles',
    topicId: 'teleoperation'
  },
  {
    term: 'Physical AI',
    shortDef: 'Artificial intelligence designed to perceive, learn, and act within the real physical world (distinguished from digital-only AI).',
    category: 'general',
    topicId: 'what-is-prismax'
  },
  {
    term: 'Prisma Points',
    shortDef: 'Reward points earned by community members through teleoperation runs, Verify Quality evaluations, and platform campaigns.',
    category: 'token',
    topicId: 'prisma-points'
  },
  {
    term: 'Robot Fleet',
    shortDef: 'The hardware marketplace section in the PrismaX app listing validated robot arms (Piper, TOK2, YAM) for purchase and registration.',
    category: 'hardware',
    topicId: 'robot-fleet'
  },
  {
    term: 'Teleop / Teleoperation',
    shortDef: 'Remote operation of physical robot arms via web interface to perform tasks and generate high-fidelity robotic data.',
    category: 'teleop',
    topicId: 'teleoperation'
  },
  {
    term: 'The First 100',
    shortDef: 'Inaugural group of 100 founding Data Quality Validators selected based on rating accuracy relative to consensus.',
    category: 'roles',
    topicId: 'the-first-100'
  },
  {
    term: 'Track record',
    shortDef: 'Validator performance history measuring how consistently their episode ratings match the finalized consensus score.',
    category: 'teleop',
    topicId: 'verify-quality'
  },
  {
    term: 'Validator',
    shortDef: 'Community member who reviews recorded teleoperation episodes and submits quality ratings in Verify Quality.',
    category: 'roles',
    topicId: 'verify-quality'
  },
  {
    term: 'Verify Quality',
    shortDef: 'Public community program for rating the fidelity, trajectory smoothness, and completion quality of robot data episodes.',
    category: 'teleop',
    topicId: 'verify-quality'
  },
  {
    term: 'VLA (Vision-Language-Action)',
    shortDef: 'Multimodal AI model architecture trained on visual inputs, natural language instructions, and physical motor actions.',
    category: 'general',
    topicId: 'vla'
  },
  {
    term: 'VLA Foundry',
    shortDef: 'End-to-end data production factory that converts raw teleop logs into verified, high-scale VLA training datasets.',
    category: 'general',
    topicId: 'vla-foundry'
  },
  {
    term: '$PIX',
    shortDef: 'Native utility token of the PrismaX network used for service clearing and settlement (pre-TGE at present).',
    category: 'token',
    topicId: 'pix-token'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: 'June 16, 2025',
    title: 'PrismaX Announces $11M Funding Round Led by a16z crypto CSX',
    description: 'PrismaX publicly revealed its $11 Million seed financing round led by Andreessen Horowitz (a16z crypto CSX) to build decentralized physical AI infrastructure and fair-use robotics data standards.',
    source: 'prismax.ai/blog/prismax-raises-11m-a16z-robotics-funding',
    badge: 'Funding Milestone'
  },
  {
    date: 'June 2025',
    title: 'Emergence from Stealth Mode',
    description: 'PrismaX officially exited stealth mode, unveiling its mission to build the universal service layer for physical AI and remote robotics.',
    source: 'prismax.ai/blog ("A year of robotics in 10 minutes")',
    badge: 'Launch'
  },
  {
    date: 'June 13, 2026',
    title: 'ICRA 2026 Recap Disclosures',
    description: 'Published technical insights and network demonstrations following the IEEE International Conference on Robotics and Automation (ICRA) in Vienna.',
    source: 'prismax.ai/blog ("ICRA 2026 Recap")',
    badge: 'Conference'
  },
  {
    date: 'June 17, 2026',
    title: 'A Year of Robotics Retrospective',
    description: 'Published comprehensive retrospective detailing progress across remote operation infrastructure, partner hardware integrations, and model benchmarking.',
    source: 'prismax.ai/blog ("A year of robotics in 10 minutes")',
    badge: 'Retrospective'
  },
  {
    date: 'June 23, 2026',
    title: 'Verify Quality Launches & The First 100 Program Begins',
    description: 'Verify Quality opened publicly to the community, launching the search for the inaugural 100 Founding Data Quality Validators based on consensus accuracy.',
    source: 'prismax.ai/blog/introducing-the-first-100',
    badge: 'Product Release'
  },
  {
    date: 'July 7, 2026',
    title: 'PrismaX Product Updates: Q2 2026 Major Release',
    description: 'Announced 3 core ecosystem updates: (1) Streamlined VLA upload data pipeline for teleoperators, (2) Expanded Verify Quality access for eligible members, and (3) Redesigned Robot Fleet hardware marketplace featuring Piper, TOK2, and YAM.',
    source: 'prismax.ai/blog/prismax-product-updates-q2-2026',
    badge: 'Major Release'
  }
];

export const TELEOP_STEPS: TeleopStep[] = [
  {
    step: 1,
    title: 'Select or Register Robot Hardware',
    description: 'Operator selects a validated robot arm from the Robot Fleet marketplace (Piper, TOK2, YAM) or registers supported hardware from Airbot, AGILEX, I2RT, or Realman.',
    actor: 'Operator',
    iconName: 'Bot'
  },
  {
    step: 2,
    title: 'Connect & Operate via Gateway Portal',
    description: 'Operator accesses gateway.prismax.ai to establish secure real-time control over the physical robot arm and initiate task execution.',
    actor: 'Operator',
    iconName: 'Globe'
  },
  {
    step: 3,
    title: 'Execute Task & Record Episode Telemetry',
    description: 'The session captures synchronized multi-camera video streams, joint trajectory logs, and control signals in standard MCAP telemetry format.',
    actor: 'PrismaX Engine',
    iconName: 'Video'
  },
  {
    step: 4,
    title: 'Upload Episode to VLA Pipeline',
    description: 'Recorded telemetry episodes are uploaded via the VLA data pipeline with scenario category tagging and resume support.',
    actor: 'Operator',
    iconName: 'Upload'
  },
  {
    step: 5,
    title: 'Community Evaluation via Verify Quality',
    description: 'Validators evaluate episodes using pass/fail integrity checks (clear view, task completion) followed by sliding-scale dexterity ratings.',
    actor: 'Validator',
    iconName: 'CheckSquare'
  },
  {
    step: 6,
    title: 'Consensus Score Aggregation',
    description: 'Independent ratings from multiple validators are mathematically synthesized into a consensus score; outliers are flagged for expert review.',
    actor: 'PrismaX Engine',
    iconName: 'Award'
  },
  {
    step: 7,
    title: 'Dataset Ingestion into VLA Foundry',
    description: 'Episodes meeting consensus quality thresholds enter the verified VLA Foundry repository for production AI training runs.',
    actor: 'PrismaX Engine',
    iconName: 'Database'
  },
  {
    step: 8,
    title: 'Prisma Points Distribution',
    description: 'Operators who logged high-fidelity runs and validators whose ratings aligned with consensus earn Prisma Points rewards.',
    actor: 'PrismaX Engine',
    iconName: 'Sparkles'
  },
  {
    step: 9,
    title: 'Model Training & Closed-Loop Benchmark Feedback',
    description: 'VLA models are trained on verified datasets; evaluation results inform downstream data collection priorities for the next cycle.',
    actor: 'AI Model',
    iconName: 'Cpu'
  }
];

export const ECOSYSTEM_SECTORS: EcosystemSector[] = [
  {
    id: 'backers',
    title: 'Lead Backers & Investors',
    description: 'Prominent venture funds backing PrismaX infrastructure',
    entities: [
      {
        name: 'a16z crypto (CSX)',
        description: 'Lead investor of the $11M seed round announced June 16, 2025.',
        badge: 'Lead Investor ($11M)',
        url: 'https://a16zcrypto.com'
      }
    ]
  },
  {
    id: 'launch_partners',
    title: 'Day 1 Launch Partners',
    description: 'Founding web3 and AI organizations that battle-tested Verify Quality prior to public release',
    entities: [
      { name: 'Monad', description: 'High-performance L1 blockchain ecosystem partner.', badge: 'Launch Partner' },
      { name: 'Peaq', description: 'DePIN layer 1 blockchain for robotics & real-world assets.', badge: 'Launch Partner' },
      { name: 'Sentient', description: 'Open-source artificial general intelligence collective.', badge: 'Launch Partner' },
      { name: 'Virtuals Protocol', description: 'Co-ownership layer for AI agents & autonomous entities.', badge: 'Launch Partner' },
      { name: 'OpenMind', description: 'Open intelligence network & collaborative AI platform.', badge: 'Launch Partner' },
      { name: 'Perle Labs', description: 'Decentralized data infrastructure provider.', badge: 'Launch Partner' },
      { name: 'Stanford Blockchain Accelerator', description: 'University blockchain ecosystem accelerator.', badge: 'Launch Partner' },
      { name: 'XMAQUINA', description: 'DePIN network for autonomous robotics fleet ownership.', badge: 'Launch Partner' },
      { name: 'Zeno', description: 'Decentralized physical infrastructure network partner.', badge: 'Launch Partner' },
      { name: 'ChainGPT', description: 'AI infrastructure & decentralized model ecosystem.', badge: 'Launch Partner' },
      { name: 'Blockchain Builders Fund', description: 'Ecosystem venture builder & launch contributor.', badge: 'Launch Partner' }
    ]
  },
  {
    id: 'device_partners',
    title: 'Device & Hardware Partners',
    description: 'Official robot arm manufacturers with validated hardware listed in Robot Fleet',
    entities: [
      {
        name: 'Agilex Robotics',
        description: 'Manufacturer of Piper — Official Validated Robot Arm listed on Robot Fleet marketplace.',
        badge: 'Piper Model (Validated)'
      },
      {
        name: 'Airbot',
        description: 'Manufacturer of TOK2 — Official Validated Bimanual Robot Arm listed on Robot Fleet marketplace.',
        badge: 'TOK2 Model (Validated)'
      },
      {
        name: 'I2RT Robotics',
        description: 'Manufacturer of YAM — Official Validated Tactile Robot Arm listed on Robot Fleet marketplace.',
        badge: 'YAM Model (Validated)'
      },
      {
        name: 'Realman',
        description: 'Supported hardware manufacturer with direct registration support in PrismaX app.',
        badge: 'Registration Supported'
      }
    ]
  },
  {
    id: 'products',
    title: 'Platform Products & Engines',
    description: 'Core web portals, data engines, and marketplace applications',
    entities: [
      {
        name: 'Gateway (gateway.prismax.ai)',
        description: 'Web portal where operators connect to control physical robot arms remotely in real time.',
        badge: 'Live Portal',
        url: 'https://gateway.prismax.ai'
      },
      {
        name: 'App Platform (app.prismax.ai)',
        description: 'Central hub hosting Verify Quality, Robot Fleet, documentation, and user profile management.',
        badge: 'Live Hub',
        url: 'https://app.prismax.ai'
      },
      {
        name: 'Verify Quality',
        description: 'Decentralized data quality scoring program powered by community validators and consensus logic.',
        badge: 'Core Program'
      },
      {
        name: 'VLA Foundry',
        description: 'Closed-loop data factory converting raw teleop episodes into production-grade VLA training datasets.',
        badge: 'Data Engine'
      },
      {
        name: 'Robot Fleet Marketplace',
        description: 'Hardware marketplace for purchasing and registering validated physical robot arms with turnkey setup.',
        badge: 'Marketplace'
      }
    ]
  }
];
