import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import { PreviewSite } from './components/gen/PreviewSite'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/preview" element={<PreviewSite />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
