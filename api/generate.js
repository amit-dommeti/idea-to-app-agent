import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const outputSchema = {
  name: "idea_to_app_plan",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "productSummary",
      "targetUser",
      "whyNow",
      "mvpFeatures",
      "techStack",
      "sevenDayBuildPlan",
      "landingPageHeadline",
      "callToAction"
    ],
    properties: {
      productSummary: {
        type: "string"
      },
      targetUser: {
        type: "string"
      },
      whyNow: {
        type: "string"
      },
      mvpFeatures: {
        type: "array",
        items: {
          type: "string"
        }
      },
      techStack: {
        type: "array",
        items: {
          type: "string"
        }
      },
      sevenDayBuildPlan: {
        type: "array",
        items: {
          type: "string"
        }
      },
      landingPageHeadline: {
        type: "string"
      },
      callToAction: {
        type: "string"
      }
    }
  }
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json({ error: "OPENAI_API_KEY is missing." });
    return;
  }

  const { idea } = request.body ?? {};

  if (!idea || typeof idea !== "string") {
    response.status(400).json({ error: "A product idea is required." });
    return;
  }

  try {
    const aiResponse = await client.responses.create({
      model: "gpt-5.2",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are a startup product strategist and technical founder coach. Return JSON only. Keep outputs concise, specific, and launch-oriented. Favor realistic MVP scope and practical implementation choices."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Turn this rough product idea into a focused app plan:\n\n${idea}`
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          ...outputSchema
        }
      }
    });

    const parsed = JSON.parse(aiResponse.output_text);
    response.status(200).json(parsed);
  } catch (error) {
    console.error("Idea generation failed", error);
    response.status(500).json({
      error: "The app plan could not be generated. Check your API key and try again."
    });
  }
}
