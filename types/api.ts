export interface Flow {
  id: string;
  name: string;
  description: string;
  return: string[];
  requirements: string[];
}

export interface RelatedFlow {
  id: string;
  name: string;
  description: string;
  return: string;
  requirements: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
  relatedFlows: RelatedFlow[];
} 