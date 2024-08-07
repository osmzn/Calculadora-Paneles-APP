import { Grid, Typography } from "@mui/material"

export const CalculadoraLayout = ({ children, title = '' }) => {

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}

        >
            <Grid item
                xs={12}
                sx={{
                    width: 'auto',
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 3,
                    color: 'black',
                    boxShadow: '10px 10px 10px rgba(0,0,0,0.7), 10px 10px 10px rgba(0,0,0,0.7)',
                }}
            >
                <Typography
                    className="animate__animated animate__fadeIn animate__faster"
                    variant='h4'
                    sx={{
                        mb: 3,
                        textAlign: 'center'
                    }}
                    letterSpacing={3}
                >
                    {title}
                </Typography>

                {children}

            </Grid>

        </Grid>
    )
}
