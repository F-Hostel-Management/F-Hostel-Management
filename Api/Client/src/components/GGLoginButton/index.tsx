import * as React from 'react';
import GoogleLogin from 'react-google-login';
import './styles.css'

interface IGGLoginButtonProps { }

const GoogleLoginButton: React.FunctionComponent<IGGLoginButtonProps> = (props) => {
    const clientId = "432355450773-ckj45ig0ndv23kitofglhgtq1425vbec.apps.googleusercontent.com";

    const onLoginSuccess = (res: any) => {
        console.log("Login success: ", res.profileObj);
    }

    const onLoginFailure = (res: any) => {
        console.log("Login Failure: ", res);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            // render={renderProps => (
            //     <button className='button' onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            //   )}
            buttonText="Login with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleLoginButton