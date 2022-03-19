import create from 'zustand';
import { devtools } from 'zustand/middleware';

export type Category = {
  id: string;
  name: string;
  selected?: boolean;
};

export type Section = {
  id: string;
  name: string;
  options: Category[];
};

export type CoursesState = {
  filters: Section[];
  toggleOptionSelect: (filterId: string, optionId: string) => void;
  addOption: (filterId: string, option: Category) => void;
  setOneOptionSelected: (filterId: string, optionId: string) => void;
};

export const useCoursesStore = create<CoursesState>(
  devtools(
    (set, get) => ({
      filters: [
        {
          id: 'category',
          name: 'Category',
          options: [],
        },
      ],
      // if the option is present don't add it again
      addOption: (filterId: string, option: Category) => {
        const filter = get().filters.find((f) => f.id === filterId);
        if (!filter) {
          return;
        }
        if (filter.options.find((o) => o.id === option.id)) {
          return;
        }
        set(
          (state) => ({
            ...state,
            filters: state.filters.map((filter) => {
              if (filter.id === filterId) {
                return {
                  ...filter,
                  options: [...filter.options, option],
                };
              }
              return filter;
            }),
          }),
          false,
          'addOption',
        );
      },
      toggleOptionSelect: (filterId, optionId) => {
        const newFilters = get().filters.map((filter) => {
          if (filter.id === filterId) {
            return {
              ...filter,
              options: filter.options.map((option) => {
                if (option.id === optionId) {
                  return {
                    ...option,
                    selected: !option.selected,
                  };
                }
                return option;
              }),
            };
          }
          return filter;
        });
        set({ filters: newFilters }, false, 'toggleOptionSelect');
      },
      setOneOptionSelected: (filterId, optionId) => {
        const newFilters = get().filters.map((filter) => {
          if (filter.id === filterId) {
            return {
              ...filter,
              options: filter.options.map((option) => {
                if (option.id === optionId) {
                  return {
                    ...option,
                    selected: true,
                  };
                } else {
                  return {
                    ...option,
                    selected: false,
                  };
                }
              }),
            };
          }
          return filter;
        });
        set({ filters: newFilters }, false, 'setOptionSelected');
      },
    }),
    { name: 'CoursesStore' },
  ),
);
