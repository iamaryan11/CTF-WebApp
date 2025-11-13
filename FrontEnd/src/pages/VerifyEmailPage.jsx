import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // 1. IMPORT REDUX HOOKS
import { useNavigate, useLocation } from "react-router-dom"; // 2. IMPORT useLocation
import { verifyOtp, clearVerificationState } from "../authSlice"; // 3. IMPORT THE THUNK AND CLEAR REDUCER
import Loader from "../components/Loader";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get location state

  // Get email_id passed from RegisterPage, if available
  const initialEmail = location.state?.email_id || "";

  // 4. USE REDUX STATE for loading, error, and messages
  const {
    isVerificationPending: loading, // Use the specific loading state
    error,
    verificationMessage,
    verificationSuccess,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email_id: initialEmail,
    otp: "",
  });

  const { email_id, otp } = formData;

  // 5. useEffect to clear state on mount and handle success/redirect
  useEffect(() => {
    // Clear any previous verification messages/errors when mounting
    dispatch(clearVerificationState());
  }, [dispatch]);

  useEffect(() => {
    if (verificationSuccess && isAuthenticated) {
        // Verification was successful and user is logged in (as per backend response)
        setTimeout(() => {
            navigate("/dashboard"); // Redirect to the main authenticated area
        }, 1500);
    }
    // If the error property is set by the thunk, the UI will display it automatically.
    // Ensure that if the user somehow navigates here while already authenticated
    if (isAuthenticated && !verificationSuccess) {
      // Small defensive check
      // navigate("/dashboard"); 
    }
  }, [verificationSuccess, isAuthenticated, navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email_id || !otp || loading) return;

    // Clear previous error messages before dispatching
    dispatch(clearVerificationState()); 

    try {
        // 6. USE REDUX THUNK INSTEAD OF fetch()
        await dispatch(verifyOtp(formData)).unwrap();
        // Success handled by the useEffect watching verificationSuccess
    } catch (err) {
        // Errors handled by the Redux state ('error')
        console.error("OTP verification failed:", err);
    }
  };

  // 7. Update the Alert logic to use Redux state
  const getAlert = () => {
    if (verificationMessage && verificationSuccess) {
      return (
        <div
          role="alert"
          className="alert alert-success text-sm mb-6 bg-green-900/40 border-green-700 text-white"
        >
          {verificationMessage}
        </div>
      );
    }

    if (error) {
      return (
        <div
          role="alert"
          className="alert alert-error text-sm mb-6 bg-red-900/40 border-red-700 text-white"
        >
          {error}
        </div>
      );
    }
    return null;
  };


  return (
    <div className="min-h-screen w-screen grid place-items-center p-6 bg-linear-to-b from-black via-zinc-900 to-red-950 text-white overflow-auto">
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(
              at 50% 50%, 
              rgba(185, 28, 28, 0.5) 0%, 
              transparent 70%
            )
          `,
        }}
      ></div>

      <div
        className="card w-full max-w-md shadow-2xl bg-gray-900/70 backdrop-blur-md 
                   border border-red-700/50 relative z-10 transition-all duration-500 
                   hover:shadow-red-500/50"
      >
        <form className="card-body p-6 sm:p-10" onSubmit={handleVerify}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-red-700 mb-2 text-center italic tracking-widest font-glitch">
            EMAIL_VERIFICATION
          </h2>
          <p className="text-center text-sm mb-8 text-red-500 opacity-80 font-mono">
            // ENTER_OTP_FROM_EMAIL
          </p>

          {getAlert()} 
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                EMAIL_ID:
              </span>
            </label>
            <input
              type="email"
              name="email_id"
              placeholder="secure@mail.net"
              className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
              value={email_id}
              onChange={handleChange} // Use handleChange here
              required
              readOnly={!!initialEmail} // Make it read-only if passed from register
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-red-400 font-mono">
                ENTER_OTP:
              </span>
            </label>
            <input
              type="text"
              name="otp"
              placeholder="******"
              className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono tracking-widest text-center"
              value={otp}
              onChange={handleChange} // Use handleChange here
              maxLength="6"
              required
            />
          </div>

          <div className="form-control mt-4">
            <button
              type="submit"
              className={`btn btn-lg ${loading ? "btn-disabled" : "btn-error"} 
                         w-full bg-red-800 hover:bg-red-700 text-white 
                         shadow-lg shadow-red-700/40 transition-all duration-300 
                         border-none font-orbi tracking-widest`}
              disabled={loading}
            >
              {loading ? <Loader /> : "VERIFY_EMAIL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;