import React from "react";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginSchema } from "../../validations/userValidations";
import { login } from "../../redux/auth/operations";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(login(values));
      if (login.fulfilled.match(resultAction)) {
        toast.success("Giriş başarıyla yapıldı!");
        navigate("/home");
      } else if (login.rejected.match(resultAction)) {
        toast.error("Kullanıcı adı veya şifre yanlış!");
      }
    } catch (e) {
      toast.error("Bir hata oluştu!");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-posta
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                 transition duration-150 ease-in-out"
                placeholder="ornek@email.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Şifre
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                 transition duration-150 ease-in-out"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
               transition duration-150 ease-in-out disabled:opacity-50"
            >
              Giriş Yap
            </motion.button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
