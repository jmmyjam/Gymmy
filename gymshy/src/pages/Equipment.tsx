import { useEffect, useState } from "react";
import ListGroup from "../components/ListGroup";

interface Equipment {
  id: number;
  type: string;
  name: string;
  description: string;
}

function Equipment() {
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]);
  const [selected, setSelected] = useState<Equipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/allequipment")
      .then((res) => res.json())
      .then((data: Equipment[]) => setAllEquipment(data))
      .catch(() => setError("API Error 404"));
  }, []);

  const handleSelectItem = (name: string) => {
    const item =
      allEquipment.find((equipment) => equipment.name === name) || null;
    setSelected(item);
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipment;
