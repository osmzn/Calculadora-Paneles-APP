import { configureStore } from '@reduxjs/toolkit'
import { calculadoraSlice } from './calculadora/calculadoraSlice'

export const store = configureStore({
    reducer: {
        calculadora: calculadoraSlice.reducer,
    },
})