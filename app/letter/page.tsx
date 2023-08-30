import LetterForm, { FormFields } from "@/ui/letter/letter-form";

export default function Home() {
    const initialForm: FormFields = {
        senderAddress: "Jean Dupont\n123 Rue du Commerce, 75001 Paris\nTéléphone : +33 6 12 34 56 78\nE-mail : jean.dupont@example.com",
        recipientAddress: "Préfecture de Nanterre\n456 Avenue de la République, 69002 Lyon",
        subject: "Demande de rendez-vous pour renouveler ma carte de séjour",
        message: "Je suis Tunisien et mon titre de séjour a expiré. Je n'arrive pas à trouver un rendez-vous pour le renouveler. J'ai besoin d'une solution."
    };
    return (

        <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
            <LetterForm initialForm={initialForm} />
        </div>
    )
}
