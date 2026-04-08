import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";

interface Equipment {
  id: number;
  type: string;
  name: string;
  description: string;
}

interface WorkoutItem {
  equipment: string;
  routine: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function VisitPlanner() {
  const user = useAuth();

  const [userEquipment, setUserEquipment] = useState<Equipment[]>([]);
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<WorkoutItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_equipment")
      .select("equipment_id, allequipment(*)")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) return;
        const equipment = data
          .map((row: { allequipment: Equipment[] }) => row.allequipment[0])
          .filter(Boolean);
        setUserEquipment(equipment);
      });
  }, [user]);

  async function generatePlan() {
    if (!goal.trim()) return;
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const res = await fetch(`${API_URL}/planner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: goal.trim(),
          equipment: userEquipment.map((e) => e.name),
        }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const parsed = JSON.parse(data.plan);
      setPlan(parsed.workout ?? []);
    } catch (e) {
      setError("Failed to generate plan. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="fs-4 fw-bold mb-1">Plan My Visit</h1>

      {!user && (
        <p className="text-muted small mb-3">Log in to use your saved equipment in the plan.</p>
      )}

      {user && userEquipment.length > 0 && (
        <p className="text-muted small mb-3">
          Using your {userEquipment.length} saved equipment item{userEquipment.length !== 1 ? "s" : ""}.
        </p>
      )}

      {user && userEquipment.length === 0 && (
        <p className="text-muted small mb-3">
          No equipment saved yet. Add equipment on the Equipment page to personalise your plan.
        </p>
      )}

      <div className="mb-3" style={{ maxWidth: 500 }}>
        <label className="form-label fw-medium">What's your goal?</label>
        <input
          className="form-control"
          placeholder="e.g. build upper body strength, lose weight, improve cardio..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generatePlan()}
        />
      </div>

      <button
        className="btn btn-success"
        onClick={generatePlan}
        disabled={loading || !goal.trim()}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Generating...
          </>
        ) : (
          "Generate Plan"
        )}
      </button>

      {error && (
        <div className="alert alert-danger mt-3" style={{ maxWidth: 500 }}>
          {error}
        </div>
      )}

      {plan && plan.length > 0 && (
        <div className="mt-4" style={{ maxWidth: 600 }}>
          <h2 className="fs-5 fw-semibold mb-3">Your Workout Plan</h2>
          <div className="list-group">
            {plan.map((item, i) => (
              <div key={i} className="list-group-item">
                <div className="fw-medium">{item.equipment}</div>
                <div className="text-muted small">{item.routine}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {plan && plan.length === 0 && (
        <p className="text-muted mt-3">No plan was generated. Try a different goal.</p>
      )}
    </div>
  );
}

export default VisitPlanner;
