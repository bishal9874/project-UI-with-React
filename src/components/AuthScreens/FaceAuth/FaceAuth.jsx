import React from "react";
import "./FaceAuth.css";
import { useState ,useEffect } from "react";
import LoginCamera from "../login_camera/LoginCamera";
import { useFaceVerify_userMutation } from "../../../../API/rationApi";
import { CircularProgress, Typography ,Alert} from '@mui/material';
import { getToken, storeToken, getverify } from "../../../../API/localStorage";
import { useDispatch } from "react-redux";
import { setUsertoken, unSetUsertoken } from "../../../../features/authSlice";
import { useNavigate } from 'react-router-dom';

const FaceAuth = () => {
  const [imageData, setImageData] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [server_error, setServerError] = useState({});
  const [conditionalserver_error, setconditionalServerError] = useState({});
  const [faceVerifyUser, { isLoading }] = useFaceVerify_userMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCapturePhoto = (imageData) => {
    setImageData(imageData);
    setIsCameraReady(true);
    console.log(imageData); // update the state with the captured image data
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const loginFaceVerifyData = {
      face_image: imageData,
    };
    const res = await faceVerifyUser(loginFaceVerifyData);
    console.log(res)
    if (res.error) {
      setServerError(res.error.data);
    } else if (res.data) {
      storeToken(res.data.token);
      console.log(res.data.isfaceVerify)
      getverify({ isverify: res.data.isfaceVerify }); 
      
      let { access_token } = getToken();
      dispatch(setUsertoken({ access_token: access_token }));
      navigate('/dashboard');
      
    }
  };
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }))
  }, [access_token, dispatch])
  return (
    <section className="container">
      <div>
        <a href="/">
        <img
          src="src/assets/auth-img-7.png"
          alt="logo"
          width={150}
        />
        </a>
        {server_error.errors && server_error.errors.non_field_errors ? (
          <Alert severity='error'>{server_error.errors.non_field_errors[0]}</Alert>
        ) : (
          ''
        )}
        {server_error.detail ? (
          <Alert severity='error'>{server_error.detail}</Alert>
        ) : (
          ''
        )}
        <img
          className="reg-loginIMage"
          src="src/assets/auth-img-7.png"
          alt=""
        />
        <form onSubmit={handlesubmit}>
          {/* your form elements here */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button type="submit" className="face_check_from_DB">
              Verify
            </button>
          )}
        </form>
      </div>

      <div>
        <LoginCamera onCapturePhoto={onCapturePhoto} />
        {server_error.errors && server_error.errors.face_image ? (
          <Typography style={{ fontSize: 12, color: 'red' }}>
            {' '}
            {server_error.errors.face_image[0]}
          </Typography>
        ) : (
          ' '
        )}
      </div>
    </section>
  );
};

export default FaceAuth;
