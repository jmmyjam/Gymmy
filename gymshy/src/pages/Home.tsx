import Alert from "../components/Alert";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { useState } from "react";
import { useAuth } from "../AuthContext";

function Home() {
  const user = useAuth();
  const name = user?.email?.split("@")[0];
  const [alertVisible, setAlertVisibility] = useState(true);
  const [toastVisible, setToastVisible] = useState(true);
  return (
    <div className="p-4">
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Hi, thank you for visiting Gymmy, for the pursuit of fitness!
        </Alert>
      )}
      <h1 className="fs-4 fw-bold">Home</h1>
      <h1 className="text-body-secondary">
        {name ? `Hello, ${name}!` : "Welcome, Guest!"}
      </h1>
      {toastVisible && (
        <Toast
          image="/logo.png"
          title="Gymmy"
          size={[30, 30]}
          message="HI THERE"
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
}

export default Home;
