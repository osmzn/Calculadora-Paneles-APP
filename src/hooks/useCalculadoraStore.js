import { useDispatch, useSelector } from "react-redux";
import { calcularPaneles } from "../store/calculadora/calculadoraSlice";
// import calculadoraApi from "../api/calculadoraApi"

import Swal from "sweetalert2";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    a: yup.number().required('El alto del panel es obligatorio y debe ser un número entero').integer('El alto del panel debe ser un número entero'),
    b: yup.number().required('El ancho del panel es obligatorio y debe ser un número entero').integer('El ancho del panel debe ser un número entero'),
    y: yup.number().required('El alto del techo es obligatorio y debe ser un número entero').integer('El alto del techo debe ser un número entero').min(1, 'El alto del techo debe ser al menos 1').max(10, 'El alto del techo debe ser como máximo 10'),
    x: yup.number().required('El ancho del techo es obligatorio y debe ser un número entero').integer('El ancho del techo debe ser un número entero').min(1, 'El ancho del techo debe ser al menos 1').max(26, 'El ancho del techo debe ser como máximo 26')
});

export const useCalculadoraStore = () => {

    const dispatch = useDispatch();
    const { panel, techo, verticalFirst, horizontalFirst, maxPanel } = useSelector(state => state.calculadora);

    const startCalcularPaneles = async (panel, techo) => {

        const { alto: a, ancho: b } = panel;
        const { alto: y, ancho: x } = techo;

        try {
            await validationSchema.validate({ a, b, x, y }, { abortEarly: false });

            const cantVerticalFirst = Math.floor(a < b ? y / b : y / a) * Math.floor(a < b ? x / a : x / b);
            const cantHorizontalSecond = Math.floor(a < b ? (y % b) / a : (y % a) / b) * Math.floor(a < b ? x / b : x / a);
            const verticalFirst = { cantVerticalFirst, cantHorizontalSecond };
            const maxPanel = cantVerticalFirst + cantHorizontalSecond;

            localStorage.setItem('panel_alto', a);
            localStorage.setItem('panel_ancho', b);
            localStorage.setItem('techo_alto', y);
            localStorage.setItem('techo_ancho', x);
            localStorage.setItem('cantVerticalFirst', cantVerticalFirst);
            localStorage.setItem('cantHorizontalSecond', cantHorizontalSecond);
            localStorage.setItem('maxPanel', maxPanel);

            dispatch(calcularPaneles({
                panel: { a, b },
                techo: { x, y },
                verticalFirst,
                maxPanel
            }));

            return true;

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errorMessage = error.errors.join(', ');
                Swal.fire('Error al calcular', errorMessage, 'error');
            } else {
                console.log(error);
                Swal.fire('Error de red', 'No se pudo establecer conexión con el servidor.', 'error');
            }
            return false;
        }

        // const startCalcularPaneles = async (panel, techo) => {

        //     try {

        //         const response = await calculadoraApi.post('/events/calcularPaneles', {
        //             a: panel.alto,
        //             b: panel.ancho,
        //             x: techo.ancho,
        //             y: techo.alto
        //         });

        //         const { verticalFirst, maxPanel } = response.data

        //         localStorage.setItem('panel_alto', panel.alto)
        //         localStorage.setItem('panel_ancho', panel.ancho)
        //         localStorage.setItem('techo_alto', techo.alto)
        //         localStorage.setItem('techo_ancho', techo.ancho)
        //         localStorage.setItem('cantVerticalFirst', verticalFirst.cantVerticalFirst)
        //         localStorage.setItem('cantHorizontalSecond', verticalFirst.cantHorizontalSecond)
        //         localStorage.setItem('maxPanel', maxPanel)

        //         dispatch(calcularPaneles({
        //             panel: { a: panel.alto, b: panel.ancho },
        //             techo: { x: techo.ancho, y: techo.alto },
        //             verticalFirst,
        //             maxPanel
        //         }))

        //         return response.data.ok

        //     } catch (error) {

        //         console.log(error)

        //         if (!error.response) {
        //             Swal.fire('Error de red', 'No se pudo establecer conexión con el servidor.', 'error');
        //         } else {
        //             const errorMessage = error.response.data?.msg || Object.values(error.response.data?.errors ?? {})[0]?.msg || 'Ocurrió un error desconocido.';
        //             Swal.fire('Error al calcular', errorMessage, 'error');
        //         }

        //         return false;

        //     }

    }

    return {
        //* Propiedades
        panel,
        techo,
        verticalFirst,
        horizontalFirst,
        maxPanel,

        //* Métodos
        startCalcularPaneles,
    }
}
