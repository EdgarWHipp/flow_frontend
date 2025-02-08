export interface Flow {
  id: string;
  name: string;
  description: string;
  steps: string[];
  requirements: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: number;
  potentialSavings: number;
  relatedFlows: Flow[];
} 