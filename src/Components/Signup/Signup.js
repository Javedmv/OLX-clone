import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate, Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

export default function Signup() {
  const [loading,setLoading] = useState(false);
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if(!userName.trim()){
      alert('Username cannot be empty or contain only whitespaces.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone should contain only numbers.');
      return;
    }
    if (password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }
    setLoading(true);

    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: userName }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          userName: userName,
          phone: phone
        }).then(() => {
          setLoading(false)
          navigate("/login");
        })
      })
    }).catch((error) => {
      setLoading(false);
      console.error('Signup error:', error.message);
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='OLX Logo' />
        {
          loading? 
            <ScaleLoader
              size={150}
              color={'#36D7B7'}
              loading={loading}
            />
         : (
            <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              id="fname"
              name="userName"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="ename"
              name="email"
              defaultValue="John"
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              id="pname"
              name="phone"
              defaultValue="Doe"
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="passname"
              name="password"
              defaultValue="Doe"
            />
            <br />
            <br />
            <button>Signup</button>
            </form>
          )}
        <a onClick={()=> navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
