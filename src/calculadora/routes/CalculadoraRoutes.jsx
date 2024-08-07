import { Navigate, Route, Routes } from "react-router-dom"
import { CalculadoraPage } from "../pages/CalculadoraPage"
import { GraficoPage } from "../pages/GraficoPage"

export const CalculadoraRoutes = () => {
    return (
        <Routes>
            <Route path="/calculadora" element={<CalculadoraPage />} />
            <Route path="/grafico" element={<GraficoPage />} />

            <Route path="/*" element={<Navigate to="/calculadora" />} />
        </Routes>
    )
}
