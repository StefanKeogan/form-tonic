import React from "react";
import { observer } from "mobx-react-lite";
import { IFormProps } from "./form.types";
import { useStores } from "../../models/RootStoreContext";
import { FieldType } from "../../models/Field";
import { values } from "mobx";


const Form: React.FC<IFormProps> = props => {

  const { name, action, initialValues } = props;
  const { formStore } = useStores();

  const handleSubmit = () => {
    formStore.formByName(name)?.handleSubmit({action});
  }

  const renderField = (field: FieldType, i: number) => {
    switch (field.type.name) {
      case 'text':
        return <></>
      case 'select':
        return <></>
    }
  }

  return (
    <>{values(formStore.formByName(name)?.fields).map(renderField)}</>
  );
}

export default observer(Form);