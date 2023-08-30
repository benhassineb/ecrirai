// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'



const functions = [
  {
    "name": "write_formal_letter",
    "description": "Écrire une lettre formelle parfaite et complète",
    "parameters": {
      "type": "object",
      "properties": {
        "recipient": {
          "type": "object",
          "required": [
            "name",
            "address",
            "postalCode",
            "city",
            "country"
          ],
          "properties": {
            "name": {
              "type": "string",
              "description": "Nom complet du destinataire (par exemple, M. Jean Dupont)"
            },
            "position": {
              "type": "string",
              "description": "Position ou titre du destinataire (par exemple, Directeur des Ressources Humaines)"
            },
            "address": {
              "type": "string",
              "description": "Adresse postale du destinataire (par exemple, 12 Rue de la Paix)"
            },
            "postalCode": {
              "type": "string",
              "description": "Code postal du lieu du destinataire (par exemple, 75001)"
            },
            "city": {
              "type": "string",
              "description": "Ville du lieu du destinataire (par exemple, Paris)"
            },
            "country": {
              "type": "string",
              "description": "Pays du lieu du destinataire (par exemple, France)"
            }
          }
        },
        "sender": {
          "type": "object",
          "required": [
            "name",
            "address",
            "postalCode",
            "city",
            "telephone",
            "email",
            "country"
          ],
          "properties": {
            "name": {
              "type": "string",
              "description": "Nom complet de l'expéditeur (par exemple, Dr. Anne Martin)"
            },
            "address": {
              "type": "string",
              "description": "Adresse postale de l'expéditeur (par exemple, 8 Avenue des Roses)"
            },
            "postalCode": {
              "type": "string",
              "description": "Code postal du lieu de l'expéditeur (par exemple, 69002)"
            },
            "city": {
              "type": "string",
              "description": "Ville du lieu de l'expéditeur (par exemple, Lyon)"
            },
            "telephone": {
              "type": "string",
              "description": "Numéro de téléphone de l'expéditeur (par exemple, +33 6 12 34 56 78)"
            },
            "email": {
              "type": "string",
              "description": "Adresse e-mail de l'expéditeur (par exemple, anne.martin@example.com)"
            },
            "country": {
              "type": "string",
              "description": "Pays du lieu de l'expéditeur (par exemple, France)"
            }
          }
        },
        "date": {
          "type": "string",
          "description": "Date de la lettre au format formel (par exemple, 20 juin 2023)"
        },
        "subject": {
          "type": "string",
          "description": "Sujet de la lettre, exprimant son objet de manière concise (par exemple, Réf. Candidature à un emploi)"
        },
        "body": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Un tableau de chaînes de caractères, où chaque élément du tableau correspond à un paragraphe de la lettre"
        }
      },
      "required": [
        "recipient",
        "sender",
        "date",
        "subject",
        "body"
      ]
    }
  }
  
];


// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model : 'gpt-3.5-turbo-0613',
    stream: false,
    functions: functions,
    messages: messages
  });



return response;
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}