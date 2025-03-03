import { TabColumn } from "type/superCrudTypes";

export  const fakeColumnsWithOneColumnEmailEditable: TabColumn[] = [
    { name: 'email', type: 'text', constraints: {required: true}, isVisible: true, isEditable: true }
];

export  const fakeColumnsWithOneColumnEmailNotEditable: TabColumn[] = [
    { name: 'email', type: 'text', constraints: {required: true}, isVisible: true, isEditable: false }
];

export const fakeThreeColumns: TabColumn[] = [
    { name: 'email', type: 'email', constraints: {required: true}, isVisible: true, isEditable: true },
    { name: 'firstName', type: 'text', constraints: {min: 2, max: 10}, isVisible: true, isEditable: true },
    { name: 'lastName', type: 'text', isVisible: true, isEditable: false }
];
