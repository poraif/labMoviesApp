import { useState } from "react";

interface Filter {
  name: string;
  value: string;
  condition: (item: any, value: string) => boolean;
  sort?: (a: any, b: any, order: string) => number;
}

const useFiltering = (filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    return filters.map(f => ({ name: f.name, value: f.value }));
  });

  const filteringConditions = filters.map(f => f.condition);
  const sortingCondition = filters.find(f => f.sort);

  const filterFunction = (collection: any[]) =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter(item => conditionFn(item, filterValues[index].value));
    }, collection);

  const sortingFunction = (collection: any[]) => {
    if (!sortingCondition || !sortingCondition.sort) return collection;
    const order = filterValues.find(f => f.name === "sortOrder")?.value || "desc";
    return [...collection].sort((a, b) => sortingCondition.sort!(a, b, order));
  };

  return {
    filterValues,
    setFilterValues,
    filterFunction,
    sortingFunction,
  };
};

export default useFiltering;
