import { Navigate, Route, Routes } from "react-router-dom"
import { CalculadoraRoutes } from "../calculadora/routes/CalculadoraRoutes"


export const AppRouter = () => {

    return (
        <Routes>

            <Route path="/*" element={ <CalculadoraRoutes /> } />
            <Route path="/*" element={ <Navigate to='/*' /> } />

        </Routes>
    )

}
