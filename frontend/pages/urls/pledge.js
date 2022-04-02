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

const startValues = {
	amount: 0,
	toAddr: "",
}

export default function Pledge() {
	// const { stakeSend } = interact()

	const [pledgeObj, setPledgeObj] = React.useState(startValues)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setPledgeObj(prevState => {
			return {
				...prevState,
				[name]: value,
			}
		})
		console.log(pledgeObj)
	}

	const handleStakeSubmit = () => {
		console.log("handleStakeSubmit")
		// const amountAsWei = utils.parseEther(pledgeObj.amount.toString())
		// return stakeSend(amountAsWei.toString(), pledgeObj.toAddr)
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
							value={pledgeObj.amount}
							onChange={handleInputChange}
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
							value={pledgeObj.toAddr}
							onChange={handleInputChange}
							style={{ width: '100%' }}
							id="outlined-basic"
							label="Address"
							variant="outlined"
						/>
					</Box>
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