import { ChangeEvent, useEffect, useMemo, useState } from 'react';

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string];
};

export const useForm = <T extends Record<string, any>>(
  initialForm: T,
  formValidations: FormValidations<T> = {}
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<Record<string, any>>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
        if( formValidation[formValue] !== null ) return false;
    }
    return true;
  }, [ formValidation ])



  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations) as Array<string>) {
      const [fn, errorMessage] = formValidations[formField]!;

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation, 
    isFormValid
  } as T & Record<`${keyof T & string}Valid`, string | null> & {
    formState: T;
    onInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
    isFormValid: boolean;
  };
};
