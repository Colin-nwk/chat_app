export const validateLogin = (userData) => {
  const errors = {};

  if (!userData.username) errors.username = "Username is required";
  if (!userData.password) errors.password = "Password is required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
