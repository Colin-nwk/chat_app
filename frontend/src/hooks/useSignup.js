import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = useCallback(async (formData) => {
    const success = validateFormData(formData);

    if (!success) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }
      if (response.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, signup };
};

const validateFormData = (formData) => {
  if (
    !formData.fullName ||
    !formData.username ||
    !formData.password ||
    !formData.gender ||
    !formData.confirmPassword
  ) {
    toast.error("Please fill all fields");
    return false;
  }

  if (formData.password.length < 6) {
    toast.error("Password must be greater than 6 characters");
    return false;
  }

  if (formData.confirmPassword !== formData.password) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
};

export default useSignup;
