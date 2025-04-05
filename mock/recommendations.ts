import { Recommendation } from '../types/api'

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "1",
    title: "Signal to Noise Ratio Analysis",
    description: "Analyze the quality of your financial data by measuring the relationship between meaningful market signals and random price movements.",
    priority: 1,
    relatedFlows: [
      {
        id: "flow1",
        name: "SNR Financial Analysis",
        description: "Evaluate the strength of market signals in your portfolio",
        return: "Identify reliable trading opportunities by distinguishing between genuine market signals and random noise in price movements",
        requirements: ["Historical price data", "Trading volume data"]
      }
    ]
  },
]; 