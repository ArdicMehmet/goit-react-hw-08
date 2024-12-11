import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { deleteContact } from "../../redux/contacts/operations";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteContact(id));
      if (deleteContact.fulfilled.match(resultAction)) {
        toast.success("Kayıt başarıyla silindi!");
      } else if (deleteContact.rejected.match(resultAction)) {
        toast.error("Kayıt silme sırasında bir hata oluştu!");
      }
    } catch (e) {
      if (e) {
        toast.error("Bir hata oluştu!", e);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
    >
      <div className="flex-grow">
        <motion.h3
          className="text-lg font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {number}
        </motion.p>
      </div>
      <motion.button
        onClick={() => handleDelete(id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2"
      >
        <Trash2 size={20} />
      </motion.button>
    </motion.div>
  );
};

export default Contact;
