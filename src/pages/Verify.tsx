import { sendEmailVerification } from 'firebase/auth';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../contexts/FirebaseContext';
import { auth } from '../services/firebase';
import '../styles/verify.scss';

//https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type


export function Verify(){

    const {currentUser} = useAuthValue();
    const [time, setTime] = useState(60);
    const {timeActive, setTimeActive} = useAuthValue();
    const navigate = useNavigate();
  
    //Taking the user to their profile page after they have verified their email.
    useEffect(() => {
        const interval = setInterval(() => {
        auth.currentUser?.reload()
        .then(() => {
            if(auth.currentUser?.emailVerified){
            clearInterval(interval)
            navigate('/')
            }
        })
        .catch((err) => {
            alert(err.message)
        })
        }, 1000)
    }, [navigate, currentUser])

    //Setting time because Firebase have a limit of 60s
    useEffect(() => {
        let interval
        if(timeActive && time !== 0 ){
        interval = setInterval(() => {
            setTime((time) => time - 1)
        }, 1000)
        }else if(time === 0){
        setTimeActive(false)
        setTime(60)
        clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeActive, time, setTimeActive])

    const resendEmailVerification = () => {
        sendEmailVerification(auth.currentUser as any)
        .then(() => {
            setTimeActive(true)
          }).catch((err) => {
            alert(err.message)
          })
        }

     return(
        <div className='center'>
            <div className='verifyEmail'>
                <h1>Verify your Email Address</h1>
                <p>
                    <strong>A Verification email has been sent to:</strong><br/>
                    <span>{currentUser?.email}</span>
                </p>
                <span>Follow the instruction in the email to verify your account</span>       
                <button 
                    onClick={resendEmailVerification}
                    disabled={timeActive}
                >Resend Email {timeActive && time}</button>
            </div>
      </div>
     )
}
