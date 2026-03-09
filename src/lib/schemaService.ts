import schemaData from '../../golden_schema_v9.json';

// Create a map for quick lookup of schema fields by field_id
export const schemaMap = (schemaData as any).fields.reduce((acc: any, field: any) => {
  acc[field.field_id] = field;
  return acc;
}, {} as Record<string, any>);

// Function to get a schema field by its ID
export const getSchemaField = (fieldId: string) => {
  return schemaMap[fieldId];
};
