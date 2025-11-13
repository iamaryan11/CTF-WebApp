import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearPasswordMessages } from "../authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ResetPasswordPage = () => {
  const location = useLocation();
  const initialEmail = location.state?.email_id || "";

  const [formData, setFormData] = useState({
    email_id: initialEmail,
    otp: "",
    newPassword: "",
  });

  const { loading, error, resetPasswordMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearPasswordMessages());
  }, [dispatch]);

  useEffect(() => {
    if (resetPasswordMessage && !error) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [resetPasswordMessage, error, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email_id && formData.otp && formData.newPassword && !loading) {
      dispatch(clearPasswordMessages());
      try {
        await dispatch(
          resetPassword({
            email_id: formData.email_id,
            otp: formData.otp,
            newPassword: formData.newPassword,
          })
        ).unwrap();
      } catch (err) {
        console.error("Password reset failed:", err);
      }
    }
  };

  const getAlert = () => {
    if (resetPasswordMessage && !error) {
      return (
        <motion.div
          role="alert"
          className="alert alert-success text-sm mb-6 bg-green-900/40 border-green-700 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{resetPasswordMessage}</span>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          role="alert"
          className="alert alert-error text-sm mb-6 bg-red-900/40 border-red-700 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="min-h-screen w-screen grid place-items-center p-6 bg-linear-to-b from-black via-zinc-900 to-red-950 text-white overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
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

      <motion.div
        className="card w-full max-w-lg shadow-2xl bg-gray-900/70 backdrop-blur-md 
                   border border-red-700/50 relative z-10 transition-all duration-500 
                   hover:shadow-red-500/50"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form className="card-body p-6 sm:p-10" onSubmit={handleSubmit}>
          <motion.h2
            className="text-xl sm:text-3xl font-extrabold text-red-700 mb-2 text-center italic tracking-widest font-glitch"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SYSTEM_RESET
          </motion.h2>
          <p className="text-center text-sm mb-8 text-red-500 opacity-80 font-mono">
            // ENTER_CREDENTIALS_AND_OTP
          </p>

          {getAlert()}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              className="form-control mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
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
                value={formData.email_id}
                onChange={handleChange}
                required
                readOnly={!!initialEmail}
              />
            </motion.div>

            <motion.div
              className="form-control mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="label">
                <span className="label-text text-red-400 font-mono">
                  OTP_CODE (6 Digits):
                </span>
              </label>
              <input
                type="text"
                name="otp"
                placeholder="000000"
                maxLength="6"
                className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono tracking-widest text-center"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              className="form-control mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="label">
                <span className="label-text text-red-400 font-mono">
                  NEW_PASSWORD:
                </span>
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="********"
                className="input input-bordered w-full bg-gray-900 text-white placeholder-gray-500 border-red-600 focus:border-red-400 focus:ring-1 focus:ring-red-400 font-mono"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="form-control mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <button
              type="submit"
              className={`btn btn-lg ${loading ? "btn-disabled" : "btn-error"} 
                         w-full bg-red-800 hover:bg-red-700 text-white 
                         shadow-lg shadow-red-700/40 transition-all duration-300 
                         border-none font-orbi tracking-widest`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner text-red-800"></span>
                  AUTHENTICATING...
                </>
              ) : (
                "RESET_PASSWORD"
              )}
            </button>
          </motion.div>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/login"
              className="text-sm link link-hover text-red-400 hover:text-red-300 font-mono"
            >
              [ RESET_SUCCESS ] LOGIN_NOW
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ResetPasswordPage;