import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {  Button, Paper, TextField, Typography  } from '@mui/material'
import { Stack } from '@mui/system'
import { grey, blue } from '@mui/material/colors';

import CrateLogo from "../../assets/crate.png";

const Login = () => {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        user: "",
        password: ""
    })

    const handleSubmit = () => {
        if (loginData.user === "admin" && loginData.password == "admin") {
            navigate("/products");            
        } else {
            setLoginData({
                ...loginData,
                password: ""
            });
        }
    }

	return (
		<Stack 
            height="100vh" 
            justifyContent="center" 
            alignItems="center" 
            sx={{ 
                backgroundColor: grey[300]
            }}
        >
            <Paper sx={{width: "100%", maxWidth: "500px", p: 5}}>
                <Stack justifyContent="center" alignItems="center">

                    <img src={CrateLogo} style={{ width: "80px"}}/>
                    <Typography variant="h3">Mini Stock</Typography>

                    <TextField 
                        label="Usuário" 
                        variant="outlined" 
                        value={loginData.user}
                        onChange={event => {
                            setLoginData({
                                ...loginData,
                                user:event.target.value
                            })
                        }}
                        sx={{ 
                            width:"100%",
                            mt: 4
                        }}
                    />
                    <TextField 
                        label="Senha" 
                        type="password" 
                        variant="outlined" 
                        value={loginData.password}
                        onChange={event => {
                            setLoginData({
                                ...loginData,
                                password: event.target.value
                            })
                        }}
                        sx={{ 
                            width:"100%",
                            mt: 2  
                        }}
                    />
                        
                    <Link to="/password-recovery" style={{ color: blue[500], marginTop: "10px" }}>
						<Typography color="primary.main">
							Esqueci a minha senha
						</Typography>
					</Link>

                    <Button variant="contained" onClick={handleSubmit} sx={{ mt:3, width:"100%" }}>LOGIN</Button>
                </Stack>
            </Paper>
		</Stack>
	);
}

export default Login