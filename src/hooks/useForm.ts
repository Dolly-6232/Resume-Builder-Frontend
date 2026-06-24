import { useCallback, useState } from 'react';

interface UseFormState {
  [key: string]: any;
}

interface UseFormErrors {
  [key: string]: string;
}

export const useForm = <T extends UseFormState>(
  initialState: T,
  onSubmit: (values: T) => Promise<void> | void
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<UseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e?: any) => {
      e?.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error: any) {
        if (error.validationErrors) {
          setErrors(error.validationErrors);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};
