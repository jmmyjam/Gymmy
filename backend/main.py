from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Equipment
from database import supabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def greet():
    return {"message": "Welcome to Gymmy"}

@app.get("/allequipment")
async def get_all_equipment():
    result = supabase.from_("allequipment").select("*").execute()
    return result.data

@app.get("/equipment/{name}")
async def get_equipment(name: str):
    result = supabase.from_("allequipment").select("*").ilike("name", name).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Not found")
    return result.data[0]

@app.get("/myequipment")
async def get_user_equipment(user_id: str):
    list = supabase.from_("user_equipment").select("equipment_id").eq("user_id", user_id).execute()
    equipment_ids = [existing["equipment_id"] for existing in list.data]
    if not equipment_ids:
        return []
    result = supabase.from_("allequipment").select("*").in_("id", equipment_ids).execute()
    return result.data

@app.post("/myequipment/{name}")
async def add_item(name: str, user_id: str):
    item_result = supabase.from_("allequipment").select("*").ilike("name", name).execute()
    if not item_result.data:
        raise HTTPException(status_code=404, detail="Not found")
    item = item_result.data[0]

    existing = supabase.from_("user_equipment").select("id").eq("user_id", user_id).eq("equipment_id", item["id"]).execute()
    if not existing.data:
        supabase.from_("user_equipment").insert({"user_id": user_id, "equipment_id": item["id"]}).execute()

    list = supabase.from_("user_equipment").select("equipment_id").eq("user_id", user_id).execute()
    equipment_ids = [existing["equipment_id"] for existing in list.data]
    result = supabase.from_("allequipment").select("*").in_("id", equipment_ids).execute()
    return result.data

@app.put("/allequipment")
async def update(name: str, item: Equipment):
    existing = supabase.from_("allequipment").select("id").ilike("name", name).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Not found")
    item_id = existing.data[0]["id"]

    result = supabase.from_("allequipment").update({
        "type": item.type,
        "name": item.name,
        "description": item.description,
    }).eq("id", item_id).execute()
    return {"message": "Item updated successfully", "update": result.data[0]}

@app.delete("/myequipment")
async def delete(name: str, user_id: str):
    item_result = supabase.from_("allequipment").select("id").ilike("name", name).execute()
    if not item_result.data:
        raise HTTPException(status_code=404, detail="Not found")
    item_id = item_result.data[0]["id"]

    existing = supabase.from_("user_equipment").select("id").eq("user_id", user_id).eq("equipment_id", item_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Not found in your equipment")

    supabase.from_("user_equipment").delete().eq("user_id", user_id).eq("equipment_id", item_id).execute()
    return {"message": "Item deleted successfully"}
