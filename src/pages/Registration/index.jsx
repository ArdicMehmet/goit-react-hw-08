import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import RegisterForm from "../../components/RegisterForm";

export default function RegistrationForm() {
  return (
    <>
      <Helmet>
        <title>Registration</title>
        <meta name="description" content="This page is Registiration" />
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
            Kayıt Ol
          </motion.h2>
          <RegisterForm />
        </motion.div>
      </div>
    </>
  );
}
