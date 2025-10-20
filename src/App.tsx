import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Gen from './pages/Gen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generator" element={<Gen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
