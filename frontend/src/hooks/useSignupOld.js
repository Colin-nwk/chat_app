import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateFormData = (formData) => {
    const errors = {};

    if (!formData.fullName) {
      errors.fullName = "Full name is required";
    }

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    // if (errors.fullName || errors.username || errors.password) {
    //   toast.error("Please fill all fields");
    // }
    if (errors.confirmPassword) {
      toast.error("Passwords do not match");
    }
    // if (errors.password.length < 6) {
    //   toast.error("Password is must be greater than 6 characters");
    // }

    return errors;
  };

  const signup = useCallback(async (formData) => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess(false);
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      //   await axios.post("/api/signup", formData);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({ general: "An unexpected error occurred" });
      }
    }
  }, []);

  return { loading, errors, success, signup };
};

export default useSignup;
