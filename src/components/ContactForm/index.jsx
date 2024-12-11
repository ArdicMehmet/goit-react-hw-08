import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import { ContactShema } from "../../validations/contactValidations";
const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const resultAction = await dispatch(addContact(values));
      if (addContact.fulfilled.match(resultAction)) {
        toast.success("Kayıt başarıyla eklendi!");
      } else if (addContact.rejected.match(resultAction)) {
        toast.error("Kayıt ekleme sırasında bir hata oluştu!");
      }
    } catch (e) {
      if (e) {
        toast.error("Bir hata oluştu!", e);
      }
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-xl overflow-hidden mb-8">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Yeni Kişi Ekle
        </h2>
        <Formik
          initialValues={{ name: "", number: "" }}
          validationSchema={ContactShema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  İsim
                </label>
                <Field
                  name="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                             transition duration-150 ease-in-out"
                  placeholder="İsim Soyisim"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numara
                </label>
                <Field
                  name="number"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                             transition duration-150 ease-in-out"
                  placeholder="Telefon Numarası"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                           transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isSubmitting ? "Ekleniyor..." : "Kişi Ekle"}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
