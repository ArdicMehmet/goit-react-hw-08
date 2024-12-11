import React from "react";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { SignupSchema } from "../../validations/userValidations";
import { useNavigate } from "react-router";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const resultAction = await dispatch(register(values));
      if (register.fulfilled.match(resultAction)) {
        toast.success("Kayıt başarıyla yapıldı!");
        navigate("/home");
      } else if (login.rejected.match(resultAction)) {
        toast.error("Kayıt sırasında bir hata oluştu!");
      }
    } catch (e) {
      if (e) {
        toast.error("Bir hata oluştu!", e);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              İsim
            </label>
            <Field
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                   transition duration-150 ease-in-out"
              placeholder="Adınız Soyadınız"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-xs text-red-500"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta
            </label>
            <Field
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                   transition duration-150 ease-in-out"
              placeholder="ornek@email.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-xs text-red-500"
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <Field
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                   transition duration-150 ease-in-out"
              placeholder="********"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-xs text-red-500"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre Tekrarı
            </label>
            <Field
              type="password"
              name="passwordConfirmation"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                   transition duration-150 ease-in-out"
              placeholder="********"
            />
            <ErrorMessage
              name="passwordConfirmation"
              component="div"
              className="mt-1 text-xs text-red-500"
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
            {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
