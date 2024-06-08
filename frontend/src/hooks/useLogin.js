import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = useCallback(
    async (formData) => {
      const success = validateFormData(formData);

      if (!success) {
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api/auth/login", {
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
          localStorage.setItem("chatter-app-user", JSON.stringify(data.user));
          toast.success(data.message);
          setAuthUser(data.user);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [setAuthUser]
  );

  return { loading, login };
};

const validateFormData = (formData) => {
  if (!formData.username || !formData.password) {
    toast.error("Please fill all fields");
    return false;
  }

  return true;
};

export default useLogin;
