import React from "react";
import ContactList from "../../components/ContactList";
import SearchBox from "../../components/SearchBox";
import ContactForm from "../../components/ContactForm";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const Contacts = () => {
  const contactError = useSelector((state) => state.contacts.contacts.error);

  return (
    <>
      <Helmet>
        <title>Contacts</title>
        <meta
          name="description"
          content="This page is Contact save for Users"
        />
      </Helmet>
      <div className="pt-24 max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Phonebook</h1>
        <div className="space-y-6">
          <ContactForm />
          <SearchBox />
          {!contactError ? (
            <ContactList />
          ) : (
            <div className="text-red-500">{contactError}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
