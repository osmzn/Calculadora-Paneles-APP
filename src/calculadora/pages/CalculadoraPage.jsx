import { Button, Grid, TextField, Typography } from "@mui/material";
import { CalculadoraLayout } from "../layout/CalculadoraLayout";
import CalculateIcon from '@mui/icons-material/Calculate';
import { useCalculadoraStore, useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";

const cargaDatos = () => {
    return {
        panel_alto: localStorage.getItem('panel_alto') ?? '',
        panel_ancho: localStorage.getItem('panel_ancho') ?? '',
        techo_alto: localStorage.getItem('techo_alto') ?? '',
        techo_ancho: localStorage.getItem('techo_ancho') ?? '',
    }
}

export const CalculadoraPage = () => {

    const { startCalcularPaneles } = useCalculadoraStore()

    const { panel_alto, panel_ancho, techo_ancho, techo_alto, onInputChange } = useForm(cargaDatos)

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()

        const panel = { alto: panel_alto, ancho: panel_ancho };
        const techo = { alto: techo_alto, ancho: techo_ancho };

        const result = await startCalcularPaneles(panel, techo)

        if (result) {
            navigate('/grafico');
        }

    }

    return (
        <CalculadoraLayout title="Calculadora de Paneles">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">

                <Typography variant='h6' sx={{ mb: 1 }} letterSpacing={2} >Paneles Solares</Typography>

                <Grid container alignItems="center" justifyContent="center" spacing={2} >

                    <Grid item xs>
                        <TextField
                            label='Alto'
                            type='number'
                            placeholder='Alto Panel'
                            fullWidth
                            name='panel_alto'
                            value={panel_alto}
                            onChange={onInputChange}
                        />

                    </Grid>

                    <Grid item>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>x</Typography>
                    </Grid>

                    <Grid item xs>
                        <TextField
                            label='Ancho'
                            type='number'
                            placeholder='Ancho Panel'
                            fullWidth
                            name='panel_ancho'
                            value={panel_ancho}
                            onChange={onInputChange}
                        />

                    </Grid>
                </Grid>

                <Typography variant='h6' sx={{ mb: 1, mt: 3 }} letterSpacing={2} >Techo (Contenedor)</Typography>

                <Grid container alignItems="center" justifyContent="center" spacing={2} >

                    <Grid item xs>
                        <TextField
                            label='Alto'
                            type='number'
                            placeholder='Alto Techo'
                            fullWidth
                            name='techo_alto'
                            value={techo_alto}
                            onChange={onInputChange}
                        />

                    </Grid>

                    <Grid item>
                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>x</Typography>
                    </Grid>

                    <Grid item xs>
                        <TextField
                            label='Ancho'
                            type='number'
                            placeholder='Ancho Techo'
                            fullWidth
                            name='techo_ancho'
                            value={techo_ancho}
                            onChange={onInputChange}
                        />

                    </Grid>
                </Grid>

                <Grid container sx={{ mt: 5, justifyContent: 'center' }}>
                    <Button variant="outlined" type='submit' startIcon={<CalculateIcon />} >Calcular</Button>
                </Grid>

            </form>
        </CalculadoraLayout>
    );
};