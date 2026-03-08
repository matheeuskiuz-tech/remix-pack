import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateWhatsAppScreenshots() {
  const prompts = [
    {
      name: "Carlos Silva",
      text: "Bom dia! Só passando pra agradecer. O Pack de Ouro do Marceneiro é muito bom! Já fiz dois projetos daqui e consegui vender um armário essa semana.",
      response: "Que bom saber disso, Carlos! Fico feliz que esteja gostando. Qual projeto você fez?"
    },
    {
      name: "João Ferreira",
      text: "Valeu muito a pena, os projetos são bem explicados. Consegui montar minha primeira estante seguindo o passo a passo.",
      response: "Show de bola, João! Qualquer dúvida pode me chamar aqui."
    },
    {
      name: "Marcos Santos",
      text: "O material é excelente. A lista de materiais me economizou muito tempo na madeireira.",
      response: "Essa é a ideia, Marcos! Facilitar o dia a dia na oficina."
    }
  ];

  const results = [];

  for (const p of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: `A realistic smartphone screenshot of a WhatsApp conversation. 
            At the top, the contact name is "${p.name}". 
            The interface is the standard WhatsApp UI in Portuguese. 
            There is a white message bubble from the customer saying: "${p.text}". 
            There is a green message bubble from the seller responding: "${p.response}". 
            Include timestamps, double blue check marks on the green bubble, and the typical WhatsApp header and footer. 
            The background is the classic WhatsApp chat wallpaper. 
            The image should look like a real photo of a phone screen or a high-quality digital screenshot.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
          imageSize: "1K"
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        results.push(`data:image/png;base64,${part.inlineData.data}`);
      }
    }
  }

  return results;
}

// This is a helper script to be run or integrated. 
// Since I need to update the UI, I will perform the generation and then edit App.tsx.
