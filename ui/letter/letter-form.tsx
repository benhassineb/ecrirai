'use client'

import React, { useState } from "react";
import "./letter-form.css";

export interface FormFields {
    senderAddress: string;
    recipientAddress: string;
    subject: string;
    message: string;
}

interface FormLabels {
    senderAddress: string;
    recipientAddress: string;
    subject: string;
    message: string;
}

interface FormPlaceholders {
    senderAddress: string;
    recipientAddress: string;
    subject: string;
    message: string;
}
function generateEmailContent(data: FormFields): string {
    const { senderAddress, recipientAddress, subject, message } = data;

    const content = `Voici les informations nécessaires pour rédiger la lettre :
    
  Expéditeur :
  ${senderAddress}
  
  Destinataire :
  ${recipientAddress}
  
  Sujet : ${subject}
  
  Corps du message :
  ${message}
  
  
  S'il manque des informations, veuillez les indiquer entre crochets, par exemple : [Date de naissance].`;



    return content;
}
export interface LetterFormProps {
    initialForm: FormFields
}

function LetterForm({ initialForm }: LetterFormProps) {
    const [formFields, setFormFields] = useState<FormFields>(initialForm);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormFields(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const formLabels: FormLabels = {
        senderAddress: "Expéditeur :",
        recipientAddress: "Destinataire :",
        subject: "Objet* :",
        message: "Quel est le sujet de votre lettre ?"
    };


    const formPlaceholders: FormPlaceholders = {
        senderAddress: "Sasha Grey\n11 Rue François 1er\n75008 Paris, France\ntéléphone: +33 06 69696969\ne-mail: sacha.grey@gmail.com",
        recipientAddress: "Préfecture de Police de Paris\n12 Boulevard du Palais\n75004 Paris, France",
        subject: "Demande de congé",
        message: "Cher Monsieur/Madame, Je vous écris pour vous informer de ma demande de congé pour la période du 1er au 10 juillet..."
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailContent = generateEmailContent(formFields);

        const url = '/api/chat'; // Replace with the actual API route URL


        // Prepare the request body
        const requestBody = {
            messages: [
                // Ajoutez vos messages ici
                {
                    content: 'En tant qu\'assistant virtuel spécialisé dans la rédaction de lettres formelles, votre rôle sera de m\'aider à composer une lettre en utilisant les informations que je vous fournirai. Assurez-vous d\'utiliser des espaces réservés pour les informations manquantes afin que je puisse les compléter ultérieurement.',
                    role: 'system'
                },
                {
                    content: `${emailContent}`,
                    role: 'user'
                },
            ]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            // const streamingTextResponse = await response.text();
            const result = await response.json();

            const args = JSON.parse(result.choices[0].message.function_call.arguments);
            console.log(args);
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error('Error:', error);
        }



    };

    return (
        <div className="form-container">
            <h2>Je veux écrire une lettre :</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="senderAddress" className="text-gray-700">
                        {formLabels.senderAddress}
                    </label>
                    <textarea
                        id="senderAddress"
                        className="form-input"
                        rows={5}
                        placeholder={formPlaceholders.senderAddress}
                        required
                        value={formFields.senderAddress}
                        onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="recipientAddress" className="text-gray-700">
                        {formLabels.recipientAddress}
                    </label>
                    <textarea
                        id="recipientAddress"
                        className="form-input"
                        rows={3}
                        placeholder={formPlaceholders.recipientAddress}
                        required
                        value={formFields.recipientAddress}
                        onChange={handleChange} />
                </div>
                {/* <div className="mb-4">
                <label htmlFor="subject" className="text-gray-700">
                    {formLabels.subject}
                </label>
                <input
                    type="text"
                    id="subject"
                    className="form-input"
                    placeholder={formPlaceholders.subject}
                    required
                    value={formFields.subject}
                    onChange={handleChange}
                />
            </div> */}
                <div className="mb-4">
                    <label htmlFor="message" className="text-gray-700">
                        {formLabels.message}
                    </label>
                    <span className="text-gray-500 text-sm">
                        Détaillez ci-dessous les objectifs de votre lettre en indiquant un maximum d'informations (numéro de contrat, dates, noms, etc.).
                    </span>
                    <textarea
                        id="message"
                        className="form-input"
                        rows={5}
                        placeholder={formPlaceholders.message}
                        required
                        value={formFields.message}
                        onChange={handleChange} />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
        </div>
        
    );
}

export default LetterForm;
