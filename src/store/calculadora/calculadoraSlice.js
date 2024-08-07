import { createSlice } from '@reduxjs/toolkit';

export const calculadoraSlice = createSlice({
    name: 'calculadora',
    initialState: {
        panel: null,
        techo: null,
        verticalFirst: null,
        maxPanel: null
    },
    reducers: {
        calcularPaneles: (state, {payload}) => {
            state.panel             = payload.panel
            state.techo             = payload.techo
            state.verticalFirst     = payload.verticalFirst
            state.maxPanel          = payload.maxPanel
        },
    }
});


// Action creators are generated for each case reducer function
export const { calcularPaneles } = calculadoraSlice.actions;