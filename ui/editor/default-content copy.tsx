interface SenderData {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string; // Added postalCode field
  email: string;
  phone: string;
}

interface RecipientData {
  name: string;
  position: string;
  address: string;
  city: string;
  country: string;
  postalCode: string; // Added postalCode field
}

interface LetterData {
  sender: SenderData;
  date: string;
  recipient: RecipientData;
  subject: string;
  salutation: string;
  content: string[];
  signature: string;
}

interface FormattedParagraph {
  type: string;
  content: FormattedText[];
}

interface FormattedText {
  type: string;
  text: string;
  marks?: { type: string }[];
}



const DEFAULT_EDITOR_CONTENT: LetterData = {
  sender: {
    name: "Sasha Grey",
    address: "27 Rue Jules Verne",
    city: "Paris",
    country: "France",
    postalCode: "75015",
    email: "Sasha@live.fr",
    phone: "0771998877",
  },
  date: "20 juin 2023",
  recipient: {
    name: "Emmanuel Macron",
    position: "Président de la République Française",
    address: "Palais de l'Élysée\n55 Rue du Faubourg Saint-Honoré",
    city: "Paris",
    country: "France",
    postalCode: "75008",
  },
  subject: "Demande d'intervention urgente pour mettre fin à la guerre en Ukraine",
  salutation: "Monsieur le Président Macron,",
  content: [
    "Je vous adresse cette lettre avec une profonde préoccupation concernant la guerre en cours en Ukraine et son impact dévastateur sur la vie des civils innocents. En tant que citoyen engagé, je me permets de vous exhorter à intervenir et à prendre des mesures immédiates pour contribuer à mettre fin à ce conflit.",
    "La guerre en Ukraine a engendré d'immenses souffrances, des pertes en vies humaines et des destructions généralisées. Il est de notre devoir moral de nous opposer à cette violence et de plaider en faveur de la paix. La France a toujours été à l'avant-garde de la promotion de solutions diplomatiques et de la coopération internationale, et je suis convaincu que votre leadership peut faire une différence significative dans la résolution de cette crise.",
    "Je me permets donc de vous exhorter à utiliser votre influence et à vous engager auprès des instances internationales pertinentes, telles que les Nations Unies et l'Union européenne, afin de faciliter les négociations et de promouvoir une résolution pacifique. De plus, je vous encourage à travailler avec d'autres dirigeants mondiaux pour exercer une pression diplomatique sur les parties impliquées dans le conflit, les incitant à venir à la table des négociations et à rechercher un cessez-le-feu.",
    "En adoptant une position ferme contre la guerre en Ukraine, la France peut témoigner de son engagement à défendre les droits de l'homme, à favoriser la stabilité mondiale et à protéger la vie des civils innocents. Votre implication apportera non seulement de l'espoir aux personnes touchées par cette crise, mais contribuera également à la sécurité et à la prospérité de la région dans son ensemble.",
    "J'apprécie sincèrement votre attention portée à cette question urgente et votre engagement en faveur de la promotion de la paix et de la stabilité dans le monde. Je suis convaincu qu'avec votre leadership et les efforts collectifs de la communauté internationale, nous pouvons travailler ensemble pour mettre fin à la guerre en Ukraine et construire un avenir plus paisible pour tous.",
    "Je vous remercie de votre temps et de votre considération.",
  ],
  signature: "Sasha Grey",
};


function generateFormalLetter(letterData: LetterData) {
  const {
    sender,
    date,
    recipient,
    subject,
    content,
  } = letterData;

  const formattedSenderAddress = `${sender.address}\n${sender.city}, ${sender.country} ${sender.postalCode}`; // Added postalCode
  const formattedRecipientAddress = `${recipient.address}\n${recipient.city}, ${recipient.country} ${recipient.postalCode}`; // Added postalCode

  const formattedContent: FormattedParagraph[] = content.map((paragraph) => ({
    type: "paragraph",
    content: [{ type: "text", text: paragraph }]
  }));


  const generatedLetter = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: sender.name,
            marks: [{ type: "bold" }],
            style: { fontSize: "12pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `${sender.address}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `${sender.postalCode} ${sender.city}, ${sender.country}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          },

          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `Courriel : ${sender.email}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `Tel : ${sender.phone}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          },
        ],
      },


      {
        type: "paragraph",
        attrs: {
          textAlign: "right",
        },
        content: [
          {
            type: "text",
            text: `${recipient.name}`,
            marks: [{ type: "bold" }],
            style: { fontSize: "12pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `${recipient.position}`,
            marks: [{ type: "bold" }],
            style: { fontSize: "12pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `${recipient.address}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          },
          {
            type: "hardBreak"
          },
          {
            type: "text",
            text: `${recipient.postalCode} ${recipient.city}, ${recipient.country}`,
            style: { fontSize: "11pt", fontFamily: "Arial, sans-serif" },
          }
        ],
      },


      {
        type: "paragraph",
        attrs: {
          textAlign: "right",
        },
        content: [
          {
            type: "text",
            text: `${sender.city}, le ${date}`,
            style: {
              fontSize: "11pt",
              fontFamily: "Arial, sans-serif"

            },
          },
        ],
      },

      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Objet : ${subject}`,
            marks: [{ type: "bold" }],
            style: { fontSize: "14pt", fontFamily: "Arial, sans-serif" },
          },
        ],
      },


      ...formattedContent,
      {
        type: "paragraph",
        attrs: {
          textAlign: "right",
        },
        content: [
          {
            type: "text",
            text: sender.name,
            marks: [{ type: "bold" }],
          },
        ],
      },
    ],
  };


  return generatedLetter;
}
const generatedLetter = generateFormalLetter(DEFAULT_EDITOR_CONTENT);

export default generatedLetter;

