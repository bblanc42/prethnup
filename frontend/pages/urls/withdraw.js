import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Withdraw() {
	return (
		<>
			<Container maxWidth="sm" >
				<h1>Withdraw</h1>
				<Stack spacing={2}>
					<div>Sad to see you two go</div>
					<div>Your partner has not confirmed</div>
					<Button
						variant="contained"
						size="large"
					>
						Withdraw
					</Button>
				</Stack>
			</Container>
		</>
	)
}