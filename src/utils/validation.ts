export const validateName = (name: string): string | null => {
  if (!name.trim()) return "Full name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (!/^[a-zA-Z\s'\-]+$/.test(name.trim()))
    return "Name contains invalid characters";
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email address is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return "Please enter a valid email address";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "Contact number is required";
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  if (!/^\d{7,15}$/.test(cleaned)) return "Please enter a valid phone number";
  return null;
};

export const validateWhyHireYou = (text: string): string | null => {
  if (!text.trim()) return "This field is required";
  if (text.trim().length < 50)
    return `Please write at least 50 characters (${text.trim().length}/50)`;
  return null;
};
