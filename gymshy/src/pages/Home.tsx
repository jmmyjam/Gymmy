import Alert from "../components/Alert";
import Button from "../components/Button";
import { useState } from "react";

function Home() {
  const name = "User";
  const [alertVisible, setAlertVisibility] = useState(
    () => localStorage.getItem("alertDismissed") !== "true",
  );
  return (
    <div className="p-4">
      {alertVisible && (
        <Alert
          onClose={() => {
            setAlertVisibility(false);
            localStorage.setItem("alertDismissed", "true");
          }}
        >
          Hi, thank you for visiting Gymmy, for the pursuit of fitness!
        </Alert>
      )}
      <h1 className="fs-4 fw-bold">Home</h1>
      <h1>{name ? `Hello, ${name}!` : "Welcome, Guest!"}</h1>
    </div>
  );
}

export default Home;
