import React from "react";
import { IFieldProps, IRenderFieldProps } from "./field.types";


const renderTextField = (props: IFieldProps) => (
  <input value={props.value ? props.value : ''}></input>
);

const RenderField: React.FC<IRenderFieldProps> = ({ field, value, values }) => {
  switch (field) {
    case 'text':
      return renderTextField({value});
    default:
      return renderTextField({value});
  }
}

export default RenderField;