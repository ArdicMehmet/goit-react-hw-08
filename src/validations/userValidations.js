import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi giriniz")
      .required("E-posta adresi gereklidir"),
    password: Yup.string().required("Şifre gereklidir"),
  });

  export const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "İsim çok kısa")
      .max(50, "İsim çok uzun")
      .required("İsim gerekli"),
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin")
      .required("E-posta gerekli"),
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalı")
      .required("Şifre gerekli"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
      .required("Şifre tekrarı gerekli"),
  });