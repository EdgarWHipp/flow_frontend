# Vivid API Documentation

## Overview
The Vivid API provides endpoints for uploading financial documents and receiving optimization recommendations.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Upload Document
Upload a PDF or text document for analysis.

```http
POST /documents
Content-Type: application/json

{
  "type": "pdf",
  "content": "base64_encoded_content",
  "metadata": {
    "filename": "document.pdf",
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "mimeType": "application/pdf"
  }
}
```

#### Response
```json
{
  "message": "Document processed successfully",
  "documentId": "uuid",
  "documentType": "tax_return",
  "classification": {
    "confidence": 0.85,
    "details": {
      "matchedKeywords": ["steuererklärung", "finanzamt"],
      "matchedPatterns": ["steuer-?id:\\s*\\d+"]
    }
  },
  "extractedInformation": {
    "amounts": [
      {
        "value": 1234.56,
        "currency": "EUR",
        "context": "..."
      }
    ],
    "dates": [...],
    "entities": [...],
    "keywords": [...]
  }
}
```

### Get Recommendations
Retrieve recommendations for a processed document.

```http
GET /recommendations?documentId=uuid
```

#### Response
```json
[
  {
    "id": "uuid",
    "title": "Consider Church Tax Exit",
    "description": "You are currently paying 100€ in church tax. Consider exiting to save money.",
    "priority": 1,
    "potentialSavings": 1200,
    "relatedFlows": [
      {
        "id": "kirchenaustritt",
        "name": "Church Tax Exit",
        "description": "Process to exit from church tax payments",
        "steps": [
          "Visit local registry office",
          "Fill out declaration form",
          "Pay administrative fee"
        ],
        "requirements": [
          "Personal ID",
          "Proof of residence"
        ]
      }
    ]
  }
]
```

### Get Recommendation Summary
Get a concise summary of all recommendations.

```http
GET /recommendations/summary?documentId=uuid
```

#### Response
```json
{
  "totalPotentialSavings": 1200,
  "topRecommendations": [
    {
      "title": "Consider Church Tax Exit",
      "description": "You are currently paying 100€ in church tax. Consider exiting to save money.",
      "potentialSavings": 1200
    }
  ]
}
```

## Error Responses
All endpoints may return the following error responses:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- 201: Resource created successfully
- 200: Request successful
- 400: Bad request (invalid input)
- 500: Server error 