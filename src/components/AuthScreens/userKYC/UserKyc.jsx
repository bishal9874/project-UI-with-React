import React from 'react'
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import "./userKyc.css"
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken , storeToken} from '../../../../API/localStorage';
import { useUser_kycMutation } from '../../../../API/rationApi';
import { useDispatch } from 'react-redux';
import { setUsertoken } from '../../../../features/authSlice';
const UserKyc = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const {access_token} = getToken()
  const dispatch = useDispatch()
  const [kycuser, { isLoading }] = useUser_kycMutation(access_token)
  const handlekycuser = async (e) => {
    e.preventDefault();
    
    const data = new FormData(e.currentTarget);
    const kycData = {
      village: data.get('village'),
      houseNo: data.get('houseNo'),
      post_office: data.get('post_office'),
      pin: data.get('pin'),
      Annual_income: data.get('Annual_income'),

    } 
    const res = await kycuser(kycData)
    console.log(res)
    if(res.error){
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)

    }if(res.data){
      console.log(res.data)
      storeToken(res.data.token)
      let {access_token} = getToken()
      dispatch(setUsertoken({access_token:access_token}))
      navigate('/dashboard')
    }
  }

  return (
    <>        <a href="/"><h3>
    <span className="reg-login_logo_text">Secure</span>-Ration
  </h3></a>
    <section className='kyc_section'>
      
    <img className="kyc" src="src/assets/photo.jpg" alt="" />
        <div className='userkyc_form'>
          <p>Users should be required to provide their own KYC verification in order to register on this application</p>
        <Box component='form' noValidate  sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }} id='userkyc-form' onSubmit={handlekycuser} >
          <TextField margin='normal'  fullWidth id='village' name='village' label='village' />
          {server_error.village ? <Typography style={{fontSize:12,color:'red',textAlign:'center'}}> {server_error.village[0]}</Typography> : " "}
          <TextField margin='normal'  fullWidth id='houseNo' name='houseNo' label='houseNo' />
          {server_error.houseNo ? <Typography style={{fontSize:12,color:'red',textAlign:'center'}}> {server_error.houseNo[0]}</Typography> : " "}
          <TextField margin='normal'  fullWidth id='post_office' name='post_office' label='post_office' />
          {server_error.post_office ? <Typography style={{fontSize:12,color:'red',textAlign:'center'}}> {server_error.post_office[0]}</Typography> : " "}
          <TextField margin='normal'  fullWidth id='pin' name='pin' label='pin'/>
          {server_error.pin ? <Typography style={{fontSize:12,color:'red',textAlign:'center'}}> {server_error.pin[0]}</Typography> : " "}
          <TextField margin='normal'  fullWidth id='Annual_income' name='Annual_income' label='Annual_income'/>
          {server_error.Annual_income ? <Typography style={{fontSize:12,color:'red',textAlign:'center'}}> {server_error.Annual_income[0]}</Typography> : " "}
          {/* <TextField margin='normal' disabled fullWidth id='pin' name='pin' label='pin'/> */}
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
          </Box>

          {server_error[0] ? <Alert severity='error'>{server_error[0]}</Alert> : ''}

        </Box>
        </div>
    </section>
    
    </>

  )
}

export default UserKyc