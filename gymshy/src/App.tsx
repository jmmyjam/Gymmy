import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import VisitPlanner from "./pages/VisitPlanner";
import Progress from "./pages/Progress";
import AnxietyToolkit from "./pages/AnxietyToolkit";
import ListGroup from "./components/ListGroup";

export default function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  return (
    <div>
      <ListGroup items={items} heading="Cities" />
    </div>
  );
}
