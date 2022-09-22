import React from "react";
import { observer } from "mobx-react-lite";
import { IFormProps } from "./Form.types";
import { useStores } from "../../models/RootStoreContext";
import { values } from "mobx";
import { FieldType } from "../../models/Field";

const Form: React.FC<IFormProps> = props => {

  const { name, action, initialValues, renderField } = props;
  const { formTonicStore } = useStores();

  const handleSubmit = () => {
    formTonicStore.formStore.formByName(name)?.handleSubmit({action});
  }

  console.log(formTonicStore.formStore.formByName(name)?.fields)

  return (
    <>
      {formTonicStore.formStore.formByName(name)?.fields.map((field: FieldType) => {
        const value = (initialValues && initialValues[field.name]) ? initialValues[field.name] : '';
        return <>{renderField(field, value)}</>
      })}
    </>
  )
}

export default observer(Form);