import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Home Page
      </motion.div>
    </div>
  );
};

export default Home;
