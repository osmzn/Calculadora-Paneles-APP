import { useNavigate } from "react-router-dom";
import { useCalculadoraStore } from "./useCalculadoraStore";

const datosLocalStorage = () => {
    return {
        panel_alto: localStorage.getItem('panel_alto') ?? '',
        panel_ancho: localStorage.getItem('panel_ancho') ?? '',
        techo_alto: localStorage.getItem('techo_alto') ?? '',
        techo_ancho: localStorage.getItem('techo_ancho') ?? '',
        vertical: localStorage.getItem('cantVerticalFirst') ?? '',
        horizontal: localStorage.getItem('cantHorizontalSecond') ?? '',
        cantidadMax: localStorage.getItem('maxPanel') ?? '',
    }
}

export const usePanel = () => {

    const navigate = useNavigate()

    const { panel_alto, panel_ancho, techo_alto, techo_ancho, vertical, horizontal, cantidadMax } = datosLocalStorage()
    const { panel: storePanel, techo: storeTecho, verticalFirst: storeVerticalFirst, maxPanel: storeMaxPanel } = useCalculadoraStore();

    const techo = storeTecho ?? { x: techo_ancho, y: techo_alto };
    const panel = storePanel ?? { a: panel_ancho, b: panel_alto };
    const verticalFirst = storeVerticalFirst ?? { cantVerticalFirst: vertical, cantHorizontalSecond: horizontal };
    const maxPanel = storeMaxPanel ?? cantidadMax;

    const { x, y } = techo;
    const { a: auxA, b: auxB } = panel;
    const [a, b] = auxA > auxB ? [auxB, auxA] : [auxA, auxB];

    const { cantVerticalFirst, cantHorizontalSecond } = verticalFirst;

    const maxWidth = 1350;
    const maxHeight = 350;

    const cellWidth = Math.min(maxWidth / x, 135);
    const cellHeight = Math.min(maxHeight / y, 135);

    return {
        a,
        b,
        x,
        y,
        cantVerticalFirst,
        cantHorizontalSecond,
        cellWidth,
        cellHeight,
        maxPanel,
        navigate,
    }
}
