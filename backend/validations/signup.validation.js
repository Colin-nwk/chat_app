export const validateSignup = (userData) => {
  const errors = {};

  if (!userData.fullName) errors.fullName = "Full name is required";
  if (!userData.username) errors.username = "Username is required";
  if (!userData.password) errors.password = "Password is required";
  else if (userData.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  if (!userData.confirmPassword)
    errors.confirmPassword = "Confirm password is required";
  else if (userData.password !== userData.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!userData.gender) errors.gender = "Gender is required";
  else if (!["male", "female"].includes(userData.gender))
    errors.gender = "Gender must be 'male' or 'female'";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
