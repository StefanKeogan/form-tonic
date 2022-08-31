import React from "react";
import { observer } from "mobx-react-lite";
import { IFormProps } from "./Form.types";
import { useStores } from "../../models/RootStoreContext";
import { values } from "mobx";

const Form: React.FC<IFormProps> = props => {

  const { name, action, initialValues, renderField } = props;
  const { formTonicStore } = useStores();

  const handleSubmit = () => {
    formTonicStore.formStore.formByName(name)?.handleSubmit({action});
  }

  return (
    <>{values(formTonicStore.formStore.formByName(name)?.fields).map(renderField)}</>
  );
}

export default observer(Form);