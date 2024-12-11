import * as Yup from "yup";

export const ContactShema = Yup.object().shape({
    name: Yup.string()
      .min(3, "En az 3 karakter olmalı")
      .max(50, "En fazla 50 karakter olmalı")
      .required("İsim gerekli"),
    number: Yup.string()
      .min(3, "En az 3 karakter olmalı")
      .max(50, "En fazla 50 karakter olmalı")
      .required("Numara gerekli"),
  })