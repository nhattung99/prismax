export type TopicCategory = 'core' | 'teleop' | 'tokens' | 'hardware';

export interface OnboardingTopic {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: TopicCategory;
  definition: string;
  whyItMatters: string;
  source: string;
  unannouncedWarning?: string;
}

export type GlossaryCategory = 'general' | 'teleop' | 'token' | 'hardware' | 'roles';

export interface GlossaryTerm {
  term: string;
  shortDef: string;
  category: GlossaryCategory;
  topicId?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  source: string;
  badge?: string;
}

export type ProcessActor = 'Operator' | 'Validator' | 'PrismaX Engine' | 'AI Model';

export interface TeleopStep {
  step: number;
  title: string;
  description: string;
  actor: ProcessActor;
  iconName: string;
}

export interface EcosystemEntity {
  name: string;
  description: string;
  badge?: string;
  url?: string;
  category?: 'backer' | 'launch_partner' | 'device_partner' | 'product';
}

export interface EcosystemSector {
  id: 'backers' | 'launch_partners' | 'device_partners' | 'products';
  title: string;
  description: string;
  entities: EcosystemEntity[];
}

export type FaqCategory = 'account' | 'points' | 'teleop' | 'queue' | 'rewards' | 'troubleshooting';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  sourceNote?: string;
}
