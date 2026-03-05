from pydantic import BaseModel

class Equipment(BaseModel):
    id: int
    type: str
    name: str
    description: str

equipment: Equipment = [
    Equipment(id = 1, type = "Cardio", name = "Treadmill", description = "Simulates walking, jogging, or running; targets legs, glutes, and cardiovascular system."),
    Equipment(id = 2, type = "Cardio", name = "Bicycle", description = "Cycling motion; strengthens quads, hamstrings, glutes, calves, and core."),
    Equipment(id = 3, type = "Cardio", name = "Rowing Machine", description = "Pulls and pushes with full-body movement; targets legs, back, shoulders, arms, and core."),
    Equipment(id = 4, type = "Cardio", name = "Stair Climber", description = "Simulates climbing stairs; emphasizes quads, glutes, hamstrings, and calves."),
    Equipment(id = 5, type = "Strength", name = "Leg Press", description = "Pushes weight away using legs; targets quads, glutes, and hamstrings."),
    Equipment(id = 6, type = "Strength", name = "Hack Squat", description = "Mimics squat pattern with additional support; works quads, glutes, hamstrings."),
    Equipment(id = 7, type = "Strength", name = "Chest Press", description = "Horizontal pressing motion; trains chest, shoulders, and triceps."),
    Equipment(id = 8, type = "Strength", name = "Lat Pulldown", description = "Pulls bar from overhead; focuses on latissimus dorsi, biceps, and upper back."),
    Equipment(id = 9, type = "Strength", name = "Shoulder Press", description = "Vertical push; isolates shoulders and triceps."),
    Equipment(id = 10, type = "Strength", name = "Bicep Curl Machine", description = "Elbow flexion in isolation; isolates biceps."),
    Equipment(id = 11, type = "Strength", name = "Triceps Extension Machine", description = "Elbow extension; targets triceps muscles."),
    Equipment(id = 12, type = "Strength", name = "Leg Extension", description = "Straightens knee against resistance; isolates quadriceps."),
    Equipment(id = 13, type = "Strength", name = "Leg Curl", description = "Flexes knee from prone or seated position; isolates hamstrings."),
    Equipment(id = 14, type = "Strength", name = "Inner/Outer Thigh Machines", description = "Hip adduction/abduction; strengthens adductor and abductor muscles."),
    Equipment(id = 15, type = "Strength", name = "Glute Bridge Machine", description = "Guided bridge thrust; targets glutes and hamstrings."),
    Equipment(id = 16, type = "Strength", name = "Smith Machine", description = "Multi-purpose, guided barbell; used for squats, bench presses, and more, engaging different muscle groups dependent on exercise."),
    Equipment(id = 17, type = "Cable", name = "Cable Crossover", description = "Versatile multi-plane pulling; targets chest, shoulders, arms, and core."),
    Equipment(id = 18, type = "Cable", name = "Ab Crunch Machine", description = "Seated crunch motion; isolates and strengthens abdominal muscles."),
    Equipment(id = 19, type = "Cable", name = "Lateral Raise Machine", description = "Raises arms sideways; isolates deltoids (especially lateral head)."),
]

user_equipment: list[Equipment] = []