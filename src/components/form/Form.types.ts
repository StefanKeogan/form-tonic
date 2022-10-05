import React from "react"
import { IRenderFieldProps } from "../field/field.types"

export interface IFormProps {
  /**
   * The name of the form, this is used for retrieving the form from the stores.
   */
  name: string

  /**
   * The action that is called on form submit.
   */
  action: () => Promise<any>
  
  /**
   * Any inital values we want to populate our form with.
   */
  initialValues?: any

  /**
   * Dictates what component is rendered for each field type.
   */
  renderField: React.FC<IRenderFieldProps>
}