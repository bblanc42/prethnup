import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Break() {
	return (
		<>
			<Container maxWidth="sm" >
				<h1>Break up</h1>
				<Stack spacing={2}>
					<div>You are tied to 0x... and the pledge lasted for 42 days</div>
					<Button
						variant="contained"
						size="large"
					>
						Break up
					</Button>
				</Stack>
			</Container>
		</>
	)
}