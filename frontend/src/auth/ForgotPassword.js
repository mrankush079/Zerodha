import React, { useState } from "react";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //  Add backend API call here
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <p>Enter your registered email to receive a password reset link.</p>

      {submitted ? (
        <div className="confirmation">
          <p> Reset link sent to <strong>{email}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="forgot-form">
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;