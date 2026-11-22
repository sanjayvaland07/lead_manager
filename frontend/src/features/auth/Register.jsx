import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [notice, setNotice] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setNotice('Passwords do not match. Please check and try again.')
      return
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password")
        })
      })

      const data = await response.json()
      console.log(data)
      setNotice(data?.message)
      if(!response.ok){
        throw new Error(data?.message)
      }else{
        alert("register successfully")
      }

    }catch(err){
      console.log(err)
      setNotice(err.message)
    }

  }

  return (
    <div className="login-page">
      <header className="login-nav">
        <a className="login-brand" href="/login">
          <span className="login-brand-mark" aria-hidden="true">LM</span>
          <span>Lead Manager</span>
        </a>
        <span className="login-nav-caption">Lead management, made simple</span>
      </header>

      <main className="login-main">
        <section className="login-card">
          <div className="login-form-panel">
            <div className="login-heading">
              <p className="login-eyebrow">GET STARTED</p>
              <h1>Create your account</h1>
              <p>Set up your account to start managing leads.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} onChange={() => setNotice('')}>
              <label className="login-field">
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="login-field">
                <span>Password</span>
                <span className="login-password-wrap">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    className="login-password-toggle"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? 'Hide' : 'Show'}
                  </button>
                </span>
              </label>

              <label className="login-field">
                <span>Confirm password</span>
                <span className="login-password-wrap">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    className="login-password-toggle"
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </span>
              </label>

              <button className="login-submit" type="submit">Create account</button>
              {notice && <p className="login-notice" role="status">{notice}</p>}
            </form>

            <p className="login-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>

          <aside className="login-aside">
            <p className="login-aside-label">LEAD MANAGER</p>
            <h2>Start with a clear view of every lead.</h2>
            <p className="login-aside-copy">
              Keep your contacts organized, track follow-ups, and help your team focus on the next step.
            </p>
            <div className="login-pipeline" aria-label="Lead pipeline stages">
              <div><span className="pipeline-number">01</span><span>New leads</span></div>
              <div><span className="pipeline-number">02</span><span>In progress</span></div>
              <div><span className="pipeline-number">03</span><span>Closed</span></div>
            </div>
          </aside>
        </section>
        <footer className="login-footer">Lead Manager</footer>
      </main>
    </div>
  )
}

export default Register
