import Button from "./Button";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";

function Login() {
  const user = useAuth();
  const [loginVisible, setLoginVisibility] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setLoginVisibility(false);
    }
  }

  async function handleSignUp() {
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account.");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setLoginVisibility(false);
  }

  return (
    <>
      <Button color="success" onClick={() => setLoginVisibility(true)}>
        {user?.email?.split("@")[0] ?? "Login"}
      </Button>

      {loginVisible && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setLoginVisibility(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {user ? "Account" : isSignUp ? "Sign Up" : "Login"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setLoginVisibility(false)}
                />
              </div>

              {user ? (
                <>
                  <div className="modal-body">
                    <p className="mb-0">
                      Signed in as <strong>{user.email}</strong>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setLoginVisibility(false)}
                    >
                      Close
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && (
                      <div className="alert alert-success">{message}</div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <small>
                        {isSignUp
                          ? "Already have an account? "
                          : "Don't have an account? "}
                        <button
                          className="btn btn-link btn-sm p-0"
                          onClick={() => {
                            setIsSignUp(!isSignUp);
                            setError("");
                            setMessage("");
                          }}
                        >
                          {isSignUp ? "Login" : "Sign Up"}
                        </button>
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setLoginVisibility(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={isSignUp ? handleSignUp : handleLogin}
                      disabled={loading}
                    >
                      {loading
                        ? "Please wait..."
                        : isSignUp
                          ? "Sign Up"
                          : "Login"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
