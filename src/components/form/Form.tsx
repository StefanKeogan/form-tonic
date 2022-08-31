import React from "react";
import { observer } from "mobx-react-lite";
import { IFormProps } from "./Form.types";
import { useStores } from "../../models/RootStoreContext";
import { FieldType } from "../../models/Field";
import { values } from "mobx";


const Form: React.FC<IFormProps> = props => {

  const { name, action, initialValues } = props;
  const { formTonicStore } = useStores();

  const handleSubmit = () => {
    formTonicStore.formStore.formByName(name)?.handleSubmit({action});
  }

  const renderField = (field: FieldType, i: number) => {
    // switch (field.type.name) {
    //   case 'text':
    //     return <></>
    //   case 'select':
    //     return <></>
    // }
  }

  return (
    <>{values(formTonicStore.formStore.formByName(name)?.fields).map(renderField)}</>
  );
}

export default observer(Form);