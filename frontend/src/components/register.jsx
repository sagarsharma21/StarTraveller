import "./register.css";
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export default function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };

        try {
           await axios.post("/users/register", newUser);
         setError(false);
         setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon style={{fontSize:25}}/>
                <span style={{fontSize:20}}> Hey Star Traveller</span>
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" ref={nameRef}></input>
                    <input type="email" placeholder="Email ID" ref={emailRef}></input>
                    <input type="password" placeholder="Password" ref={passwordRef}></input>
                    <button className="registerBtn">Register</button>

                    {success && (
                        <span className="success">Successful login!</span>
                            )}
                            {error && (
                        <span className="failure">Something went wrong!</span>
                            )}
                </form>
                <button>
                <CancelIcon className="registerCancel" onClick={() => setShowRegister(false)} />
                </button>
            </div>     
    );
}