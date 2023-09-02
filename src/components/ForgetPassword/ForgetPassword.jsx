import { Link } from "react-router-dom";
import "./forgetPassword.css"
import React, { useState } from 'react'
import { userService } from "../../services/API/user";

function ForgetPassword() {

  const [email, setEmail] = useState("")
  const changeEmail = (email) => {
    setEmail(email)
  }
  const handleSubmit = () => {
    userService.ForgetPassword()
  }
  return (
    <div className="forget-password-container">
      <h3 className="title">Forget Password <span>*</span> </h3>
      <form action="">
        <label htmlFor="forget-input">Email</label>
        <input
          className="form-control"
          type="text"
          name="forget-input"
          id="forget-input"
          placeholder="your password"
          onChange={(e)=> changeEmail(e.target.value)
          }
          value={email}
        />
        <button onClick={handleSubmit} className="btn btn-warning">Forget Password</button>
      </form>

    </div>
  )
}

export default ForgetPassword

