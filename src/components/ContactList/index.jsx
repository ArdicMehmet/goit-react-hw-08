import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import Contact from "../Contact";

const ContactList = () => {
  const dispatch = useDispatch();
  const filterItem = useSelector((state) => state.filters.filters.name);
  const contactLoading = useSelector(
    (state) => state.contacts.contacts.loading
  );
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kişi Listesi</h2>
        {contactLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-32"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </motion.div>
        ) : filteredContacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            {!filterItem ? (
              <>
                <p className="text-xl text-gray-600 font-semibold">
                  Şu an kişi listesi boş
                </p>
                <p className="text-gray-500 mt-2">
                  Yeni kişiler ekleyerek başlayın
                </p>
              </>
            ) : (
              <p className="text-xl text-gray-600 font-semibold">
                Filtreye Uygun Kişi bulunamadı
              </p>
            )}
          </motion.div>
        ) : (
          <AnimatePresence>
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-3"
              >
                <Contact
                  id={contact.id}
                  name={contact.name}
                  number={contact.number}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ContactList;
