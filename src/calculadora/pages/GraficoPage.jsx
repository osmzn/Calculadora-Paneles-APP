import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { CalculadoraLayout } from '../layout/CalculadoraLayout';
import { usePanel } from '../../hooks';

export const GraficoPage = () => {

    const {
        a,
        b,
        x,
        y,
        cantVerticalFirst,
        cantHorizontalSecond,
        maxPanel,
        cellWidth,
        cellHeight,
        navigate
    } = usePanel()

    return (
        <CalculadoraLayout title="Gráfico">

            <Box
                className="animate__animated animate__fadeIn animate__faster"
                sx={{
                    width: `${x * cellWidth}px`,
                    height: `${y * cellHeight}px`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${x}, 1fr)`,
                    gridTemplateRows: `repeat(${y}, 1fr)`,
                    position: 'relative',
                    m: 'auto',
                    border: '1px solid',
                }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 2,
                        pointerEvents: 'none',
                        backgroundImage: `
                            linear-gradient(to right, lightgray 1px, transparent 1px),
                            linear-gradient(to bottom, lightgray 1px, transparent 1px)`,
                        backgroundSize: `${cellWidth}px ${cellHeight}px`,
                    }}
                />
                {
                    Array.from({ length: cantVerticalFirst }).map((_, index) => (
                        <Box key={index} sx={{ bgcolor: 'white', border: '2px solid red', gridRow: `span ${b}`, gridColumn: `span ${a}` }} />
                    ))
                }

                {
                    Array.from({ length: cantHorizontalSecond }).map((_, index) => (
                        <Box key={`h-${index}`} sx={{ bgcolor: 'white', border: '2px solid red', gridRow: `span ${a}`, gridColumn: `span ${b}` }} />
                    ))
                }
                <Typography sx={{
                    position: 'absolute',
                    top: '-30px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'text.primary'
                }}>
                    {x} ancho
                </Typography>
                <Typography sx={{
                    position: 'absolute',
                    left: '-30px',
                    top: 0,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    color: 'text.primary'
                }}>
                    {y} alto
                </Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    mt: 2
                }}
            >
                <Typography
                    variant='h5'
                    sx={{
                        color: 'text.primary',
                        mr: 2,
                    }}
                >
                    Cantidad de Paneles:
                </Typography>
                <Typography
                    variant='h4'
                >
                    {maxPanel}
                </Typography>
            </Box>

            <Grid container sx={{ mt: 3, justifyContent: 'center' }}>
                <Button variant="contained" onClick={() => navigate('/')} startIcon={<ArrowBackIosIcon />} >Volver</Button>
            </Grid>
        </CalculadoraLayout>
    );
};
