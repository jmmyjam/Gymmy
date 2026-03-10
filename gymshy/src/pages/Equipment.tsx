import { useEffect, useState } from "react";
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
  const [allOpen, setAllOpen] = useState(true);
  const [myOpen, setMyOpen] = useState(true);

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

  const userEquipment = allEquipment.filter((e) => userEquipmentIds.has(e.id));

  return (
    <div className="p-4">
      <h1 className="fs-4 fw-bold mb-3">Equipment Library</h1>

      {error && <p className="text-danger">{error}</p>}

      {/* All Equipment */}
      <div className="mb-3">
        <button
          className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
          onClick={() => setAllOpen((prev) => !prev)}
        >
          <span className="fw-semibold">
            All Equipment ({allEquipment.length})
          </span>
          <span>{allOpen ? "▲" : "▼"}</span>
        </button>
        {allOpen && (
          <ul className="list-group mt-1">
            {allEquipment.map((equipment) => (
              <li
                key={equipment.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(equipment)}
              >
                <span>{equipment.name}</span>
                <span className="badge bg-secondary">{equipment.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* My Gym */}
      {user && (
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
            onClick={() => setMyOpen((prev) => !prev)}
          >
            <span className="fw-semibold">My Gym ({userEquipment.length})</span>
            <span>{myOpen ? "▲" : "▼"}</span>
          </button>
          {myOpen && (
            <ul className="list-group mt-1">
              {userEquipment.length === 0 ? (
                <li className="list-group-item text-muted">
                  No equipment added yet
                </li>
              ) : (
                userEquipment.map((equipment) => (
                  <li
                    key={equipment.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelected(equipment)}
                  >
                    <span>{equipment.name}</span>
                    <span className="badge bg-secondary">{equipment.type}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
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
