
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


function Login () {
    return (
        <div style={{display: 'flex',flex:1, height: '100vh'}}>
            <div style={{
                display: 'flex',
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                minWidth: 300,
                margin: 'auto'
               
            }}>

              <button style={{
                backgroundColor:'grey',
                borderWidth:0,
                paddingTop:12,
                paddingBottom: 12,
                paddingLeft:24,
                paddingRight:24,
                color:'white',
                fontSize:18,
                fontWeight:'bold',
                margin: 'auto'
              }}
              onClick={async () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                const googleLogin = await firebase.auth().signInWithPopup(provider);
               
              }} >Login with Google </button>
            
            </div>
        </div>
    );
}
export default Login;
