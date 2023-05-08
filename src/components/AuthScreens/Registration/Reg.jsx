import React from 'react'
import Camera from '../camera/Camera'
import "./Reg.css"
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert,Typography} from '@mui/material';
import { useState ,useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSignUp_userMutation } from '../../../../API/rationApi';
import { storeToken ,getToken} from '../../../../API/localStorage';
import { setUsertoken } from "../../../../features/authSlice";


const Reg = () => {



  const [server_error,setServerError] = useState({});
  const [imageData, setImageData] = useState(null); // define state variable to hold captured image data
  const [isCameraReady, setIsCameraReady] = useState(false);
  const dispatch = useDispatch()
  const onCapturePhoto = (imageData) => {
    setImageData(imageData);
    setIsCameraReady(true); // update the state with the captured image data
  };
  // console.log(imageData);
                                                                     
  const navigate = useNavigate();
  const [registerUser, {isLoading}] = useSignUp_userMutation();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // data.append('face_image', imageData);
    const registationData = {
      email: data.get('email'),
      name:data.get('name'),
      rationId:data.get('rationId'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
      face_image: imageData,
    }
  const res = await registerUser(registationData);
  if(res.error){
    console.log(res.error.data.errors)
    setServerError(res.error.data.errors)
  }if(res.data){
    storeToken(res.data.token)
    let {access_token} = getToken()
    dispatch(setUsertoken({access_token:access_token}))
    navigate("/userkyc");
    
  }  
}

  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }))
  }, [access_token, dispatch])

  return (
    <>
    <section className="reg-section">
      <div className="reg-img_sec">
        
          <img className="reg-loginIMage" src="src/assets/auth-img-7.png" alt="" />
       
      </div>
      <div>
        <a href="/"><h3>
          <span className="reg-login_logo_text">Secure</span>-Ration
        </h3></a>
        <div>
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}</div>
        <form id='registration-form' onSubmit={handlesubmit}>
          <div className="reg-inputs_container">
            <input type="email" name="email" id='email' placeholder="Email" />
            {server_error.email ? <Typography style={{fontSize:12,color:'red'}}> {server_error.email[0]}</Typography> : " "}
            <input type="text" name="name" id='name'  placeholder="Name" />
            {server_error.name ? <Typography style={{fontSize:12,color:'red'}}> {server_error.name[0]}</Typography> : " "}
            <input type="text"  name="rationId" id='rationId'  placeholder="Ration ID" />
            {server_error.rationId ? <Typography style={{fontSize:12,color:'red'}}> {server_error.rationId[0]}</Typography> : " "}
            <input type="password" name="password"  id='password' placeholder="Password" />
            {server_error.password ? <Typography style={{fontSize:12,color:'red'}}> {server_error.password[0]}</Typography> : " "}
            <input type="password2" name="password2"  id='password2'  placeholder="confirm Password" />
            {server_error.password2 ? <Typography style={{fontSize:12,color:'red'}}> {server_error.password2[0]}</Typography> : " "}
            <div className='tc'><FormControlLabel  control={<Checkbox value="true" color="primary" name="tc" id="tc" />} label="I agree to term and condition." /> </div>
            {server_error.tc ? <span style={{fontSize:12,color:'red'}}> {server_error.tc[0]}</span> : " "}
          </div>
          <p className='already_register'>
            I have already register?{" "}
            <a href="/login" >
             login
            </a>{" "}
          </p>

          <input type="submit" value="Sign Up " className="login_button" />

        </form>
      </div>
      <div>
        <Camera onCapturePhoto={onCapturePhoto}/>
        {server_error.face_image ? <span style={{fontSize:12,color:'red'}}> {server_error.face_image[0]}</span> : " "}
      </div>
    </section>
  </>
  )
}

export default Reg