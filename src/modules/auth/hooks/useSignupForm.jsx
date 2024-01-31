import { useFormik } from "formik";

const useSignupForm = (handleSignup) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSignup(values),
  });

  return formik;
};

export default useSignupForm;
