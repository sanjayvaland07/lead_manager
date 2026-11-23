import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [notice, setNotice] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password")
        })
      })

      const data = await response.json()
      console.log("data ",data)
      setNotice(data?.message)

      if (!response.ok) {
        throw new Error(data?.message)
      }else{
        navigate('/')
      }

    } catch (err) {
      console.log("hello world",err.message)
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
              <p className="login-eyebrow">WELCOME BACK</p>
              <h1>Sign in</h1>
              <p>Enter your details to access your workspace.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              <label className="login-remember">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </label>

              <button className="login-submit" type="submit">Sign in</button>
              {notice && <p className="login-notice" role="status">{notice}</p>}
            </form>

            <p className="login-form-foot">Your team workspace is just a sign in away.</p>
            <p className="login-switch">
              New to Lead Manager? <Link to="/register">Create an account</Link>
            </p>
          </div>

          <aside className="login-aside">
            <p className="login-aside-label">LEAD MANAGER</p>
            <h2>Every lead.<br />One clear view.</h2>
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

export default Login
