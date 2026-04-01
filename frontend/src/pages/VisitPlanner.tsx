import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";

interface Equipment {
  id: number;
  type: string;
  name: string;
  description: string;
}

function VisitPlanner() {
  const user = useAuth();

  const [userEquipment, setUserEquipment] = useState<Equipment[]>([]);
  const [userEquipmentIds, setUserEquipmentIds] = useState<Set<number>>(
    new Set(),
  );
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allOpen, setAllOpen] = useState(true);
  const [myOpen, setMyOpen] = useState(true);

  useEffect(() => {
    supabase
      .from("user_equipment")
      .select("*")
      .then(({ data, error }) => {
        if (error) setError("Failed to load equipment");
        else setUserEquipment(data as Equipment[]);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("user_equipment")
      .select("equipment_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) return;
        setUserEquipmentIds(
          new Set(
            data.map((row: { equipment_id: number }) => row.equipment_id),
          ),
        );
      });
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="fs-4 fw-bold">Plan My Visit</h1>
    </div>
  );
}

export default VisitPlanner;
