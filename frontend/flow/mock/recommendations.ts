import { Recommendation } from '../types/api'

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "1",
    title: "Kirchensteuer Optimierung",
    description: "Durch Anpassung Ihrer Kirchenzugehörigkeit können Sie potenziell Steuern sparen.",
    priority: 1,
    potentialSavings: 1200,
    relatedFlows: [
      {
        id: "flow1",
        name: "Kirchensteuer Analyse",
        description: "Analysieren Sie Ihre Kirchensteuer-Situation",
        steps: ["Dokumentenprüfung", "Berechnung", "Empfehlung"],
        requirements: ["Steuerbescheid", "Personaldokumente"]
      }
    ]
  },
  {
    id: "2",
    title: "Steuerklassen Optimierung",
    description: "Eine Änderung der Steuerklasse könnte zu einer besseren monatlichen Liquidität führen.",
    priority: 2,
    potentialSavings: 2400,
    relatedFlows: [
      {
        id: "flow2",
        name: "Steuerklassen Check",
        description: "Überprüfen Sie die optimale Steuerklasse",
        steps: ["Einkommensanalyse", "Vergleichsrechnung", "Empfehlung"],
        requirements: ["Gehaltsnachweis", "Familienstand"]
      }
    ]
  },
  {
    id: "3",
    title: "Wohnsitz Optimierung",
    description: "Durch geschickte Wahl Ihres Hauptwohnsitzes können Sie Steuern optimieren.",
    priority: 3,
    potentialSavings: 3600,
    relatedFlows: [
      {
        id: "flow3",
        name: "Wohnsitz Analyse",
        description: "Analysieren Sie Ihre Wohnsitzsituation",
        steps: ["Standortanalyse", "Kostenvergleich", "Empfehlung"],
        requirements: ["Mietvertrag", "Arbeitgeberbescheinigung"]
      }
    ]
  }
]; 