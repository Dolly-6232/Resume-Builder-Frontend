export const ValidationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\d{10}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, RegExp | ((value: any) => boolean)>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const rule = rules[field];

    if (rule instanceof RegExp) {
      if (!rule.test(value)) {
        errors[field] = `Invalid ${field}`;
      }
    } else if (typeof rule === 'function') {
      if (!rule(value)) {
        errors[field] = `Invalid ${field}`;
      }
    }
  });

  return errors;
};
