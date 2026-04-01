import os
import json
from openai import OpenAI

from Gymmy.backend.database_models import Equipment

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

workout = list[tuple[Equipment, str]]

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
                    "Response in JSON format, responses should be separated by workout equipment "
                    "and workout routine, for example: "
                    '{"workout": [{"equipment": "barbell", "routine": "bench press 3x10"}, '
                    '{"equipment": "dumbbells", "routine": "bicep curls 4x12"}]}'
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ]
    )

    return response.choices[0].message.content

def get_workout(prompt):
    response = askChat(prompt)
    data = json.loads(response)
    return [
        (Equipment(name=item["equipment"]), item["routine"])
        for item in data["workout"]
    ]