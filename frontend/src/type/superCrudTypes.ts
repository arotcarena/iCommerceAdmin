import { ReactNode } from "react";
import { ChoicesType } from "./formTypes";
import { FiltersType, Item } from "./searchTypes";

/**
 * Return undefined if you want to let the default render
 */
export type Renderer = (item: Item) => any;

export type CustomFilterRenderer = (
  filters: FiltersType,
  setFilterValue: (key: string, value: string | number) => void,
  resetFilter: (key: string) => void,
  column: TabColumn,
) => ReactNode;

export type ValidationConstraints = {
  required?: boolean,
  min?: number,
  max?: number,
  acceptedFormats?: string[],
  minSize?: number,
  maxSize?: number,
  maxCount?: number,
  maxDecimals?: number,
  [key: string]: any
};

export type TabColumnType = 'text'|'textarea'|'text_link'|'email'|'password'|'int'|'float'|'decimal'|'price'|'date'|'datetime'|'bool'|'choice'|'relation'|'image'|'html'|'address';

export type TabColumn = {
  name: string,
  type: TabColumnType,
  choices?: ChoicesType,
  endpoint?: string,
  targetClass?: string,
  labelProperty?: string,
  complementLabelProperty?: string,
  showFullChoiceList?: boolean,
  constraints?: ValidationConstraints,
  multiple?: boolean,
  isVisible: boolean,
  isEditable?: boolean,
  default?: any,
  entityAttachmentType?: string,
  toolsConfig?: string,
  maxSuggestedItems?: number,
  relationProperty?: string,
  isSortable?: boolean,
  isFiltrable?: boolean,
};

export type GlobalContext = {
  isDeletable: boolean,
  isEditable: boolean,
  labelProperty: string,
};

export type EntityContext = {
  columns: TabColumn[],
  globalContext: GlobalContext,
};

export type RenderForm = (
  validation: any, 
  columns: TabColumn[],
  disabled: boolean, 
  isPending?: boolean,
  onClose?: () => void,
  isCreateForm?: boolean, 
  id?: number
) => ReactNode;

export type TabItemType = {
  id: number,
  [key: string]: any
};

export type EditingCell = {
  item: TabItemType,
  field: string
};

export type ColumnsSelection = {
  name: string,
  isVisible: boolean
}[];

export type LineInfo = {
  isActive: (item: Item) => boolean,
  renderMessage?: (item: Item) => ReactNode,
};
