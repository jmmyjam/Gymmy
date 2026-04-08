import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def askChat(prompt):
    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        max_tokens = 500,
        temperature = 0.7,
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a gym assistant. Help users plan workouts, suggest exercises, "
                    "and give fitness advice based on their goals and available equipment. "
                    "Respond in JSON format only, with no extra text. Responses should be separated by workout equipment "
                    "and workout routine, for example: "
                    '{"workout": [{"equipment": "barbell", "routine": "bench press 3x10"}, '
                    '{"equipment": "dumbbells", "routine": "bicep curls 4x12"}]}'
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        response_format={"type": "json_object"},
    )

    return response.choices[0].message.content