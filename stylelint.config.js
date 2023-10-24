import { map } from 'stylelint-config-recess-order/groups';

export const rules = {
  'order/properties-order': map(group => ({
    ...group,
    emptyLineBefore: 'always',
    noEmptyLineBetween: true,
  })),
};
