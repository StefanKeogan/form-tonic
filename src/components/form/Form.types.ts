
export interface IFormProps {
  name: string
  action: () => Promise<any>
  initialValues: any
}