import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function Pledge() {
	return (
		<>
			<Container maxWidth="sm" >

				<Grid>
					<h1>Pledge ETH</h1>
				</Grid>

				<Stack spacing={2}>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							label="ETH to pledge"
							variant="outlined"
						/>
					</Box>
					<Box
						component="form"
						sx={{
							'& > :not(style)': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							style={{ width: '100%' }}
							id="outlined-basic"
							label="Address"
							variant="outlined"
						/>
					</Box>
					<Button
						variant="contained"
						size="large"
					>
						Pledge
					</Button>
				</Stack>
			</Container>
		</>
	)
}