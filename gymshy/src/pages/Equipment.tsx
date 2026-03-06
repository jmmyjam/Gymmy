import { useEffect, useState } from "react";
import ListGroup from "../components/ListGroup";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";

interface Equipment {
  id: number;
  type: string;
  name: string;
  description: string;
}

function Equipment() {
  const user = useAuth();
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]);
  const [userEquipmentIds, setUserEquipmentIds] = useState<Set<number>>(
    new Set(),
  );
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("allequipment")
      .select("*")
      .then(({ data, error }) => {
        if (error) setError("Failed to load equipment");
        else setAllEquipment(data as Equipment[]);
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

  const handleSelectItem = (name: string) => {
    const item =
      allEquipment.find((equipment) => equipment.name === name) || null;
    setSelected(item);
  };

  const toggleUserEquipment = async (equipment: Equipment) => {
    if (!user) return;
    if (userEquipmentIds.has(equipment.id)) {
      await supabase
        .from("user_equipment")
        .delete()
        .eq("user_id", user.id)
        .eq("equipment_id", equipment.id);
      setUserEquipmentIds((prev) => {
        const next = new Set(prev);
        next.delete(equipment.id);
        return next;
      });
    } else {
      await supabase
        .from("user_equipment")
        .insert({ user_id: user.id, equipment_id: equipment.id });
      setUserEquipmentIds((prev) => new Set(prev).add(equipment.id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="fs-4 fw-bold">Equipment Library</h1>

      <ListGroup
        items={allEquipment.map((equipment) => equipment.name)}
        heading="All Equipment"
        onSelectItem={handleSelectItem}
      />

      {error && <p className="text-danger">{error}</p>}

      {selected && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-dialog"
            onClick={(equipment) => equipment.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.name}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelected(null)}
                />
              </div>
              <div className="modal-body">
                <p className="text-muted mb-1">{selected.type}</p>
                <p>{selected.description}</p>
                {user && (
                  <button
                    className={`btn btn-sm ${userEquipmentIds.has(selected.id) ? "btn-danger" : "btn-success"}`}
                    onClick={() => toggleUserEquipment(selected)}
                  >
                    {userEquipmentIds.has(selected.id)
                      ? "Remove from My Gym"
                      : "Add to My Gym"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipment;
