import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { interact } from "../../hooks/"
import { utils } from "ethers"

export default function Pledge() {
	const { stakeSend, stakeState } = interact()

	const [amount, setAmount] = React.useState(0)
	const handleInputChange = (event) => {
		const newAmount = event.target.value === "" ? "" : Number(event.target.value)
		setAmount(newAmount)
		console.log(newAmount)
	}

	const handleStakeSubmit = () => {
		const amountAsWei = utils.parseEther(amount.toString())
		return stakeSend(amountAsWei.toString())
	}

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
					<Input onChange={handleInputChange} />
					<Button
						variant="contained"
						size="large"
						onClick={handleStakeSubmit}
					>
						Pledge
					</Button>
				</Stack>
			</Container>
		</>
	)
}