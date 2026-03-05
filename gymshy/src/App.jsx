import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Equipment from './pages/Equipment'
import VisitPlanner from './pages/VisitPlanner'
import Progress from './pages/Progress'
import AnxietyToolkit from './pages/AnxietyToolkit'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="planner" element={<VisitPlanner />} />
          <Route path="progress" element={<Progress />} />
          <Route path="toolkit" element={<AnxietyToolkit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}