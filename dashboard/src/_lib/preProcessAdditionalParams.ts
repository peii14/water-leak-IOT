import { FilterParams } from '@/_types/api/additionalParams';

export const preprocessAdditionalParam = (
  params: FilterParams
): FilterParams => {
  const {
    filter_key,
    filter_operator,
    filter_value,
    related_tables,
    keywords_id,
    students_id,
  } = params;

  const cleanArray = <T>(array: (T | null)[]): T[] => {
    return array.filter((item): item is T => item !== null && item !== '');
  };

  const cleanKeys = cleanArray(filter_key);
  const cleanOperators = cleanArray(filter_operator);
  const cleanValues = cleanArray(filter_value);
  const cleanRelatedTables = cleanArray(related_tables);
  const cleanKeywordsId = cleanArray(keywords_id);

  const minLength = Math.min(
    cleanKeys.length,
    cleanOperators.length,
    cleanValues.length
  );

  return {
    students_id: students_id,
    keywords_id: cleanKeywordsId,
    filter_key: cleanKeys.slice(0, minLength),
    filter_operator: cleanOperators.slice(0, minLength),
    filter_value: cleanValues.slice(0, minLength),
    related_tables: cleanRelatedTables,
  };
};
