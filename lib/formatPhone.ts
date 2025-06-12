export const isPhoneValid = (phone: string): boolean => {
  const pattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return pattern.test(phone);
};
