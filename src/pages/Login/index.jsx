import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="This page is Login" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-2xl w-96"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-6 text-center text-gray-800"
          >
            Hoş Geldiniz
          </motion.h2>
          <LoginForm />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <NavLink
              to="/register"
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Üye Ol
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
