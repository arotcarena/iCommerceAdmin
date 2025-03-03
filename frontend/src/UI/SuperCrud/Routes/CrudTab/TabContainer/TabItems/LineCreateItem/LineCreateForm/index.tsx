import { TabColumn } from "type/superCrudTypes"
import { LineCreateFormField } from "./LineCreateFormField"
import { useSuperCrud } from "Components/Contexts/SuperCrudContext"

type Props = {
  columns: TabColumn[],
  validation: any,
}

export const LineCreateForm = ({
  columns,
  validation,
}: Props) => {
  const {parentPropertyName} = useSuperCrud();
  
  return (
      columns.map((column, index) => (
        column.isVisible && column.type !== 'relation' && column.name !== parentPropertyName && (
            <LineCreateFormField
              key={index}
              validation={validation}
              field={column.name}
              column={column}
            />
        )
      ))
  )
}

