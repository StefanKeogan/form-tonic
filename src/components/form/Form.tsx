import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { IFormProps } from "./Form.types";
import { useStores } from "../../models/RootStoreContext";
import { FieldType } from "../../models/Field";

const Form: React.FC<IFormProps> = props => {

  const [errors, setErrors] = useState();

  const { name, action, initialValues, renderField } = props;
  const { formTonicStore } = useStores();

  const handleSubmit = async () => {
    const result = await formTonicStore.formStore.formByName(name)?.handleSubmit({action});
  
    if (result?.errors) {
      setErrors(result.errors);
    }
  }

  const handleFieldChanged = (name: string, value: string | number) => {
    formTonicStore.formStore.formByName(name)?.setValue({name, value});
  }

  return (
    <form onSubmit={handleSubmit}>
      {formTonicStore.formStore.formByName(name)?.fields.map((field: FieldType) => {
        const value = (initialValues && initialValues[field.name]) ? initialValues[field.name] : '';
        return renderField({field: field.type.name, value});
      })}
    </form>
  );
}

export default observer(Form);