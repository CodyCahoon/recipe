import { registerEnumType } from 'type-graphql';

export enum WeightUnit {
  Gram = 'Gram',
  Kilogram = 'Kilogram',
  Milligram = 'Milligram',
  Ounce = 'Ounce',
  Pound = 'pound',
}

registerEnumType(WeightUnit, {
  name: 'WeightUnit',
  description: 'Units of weight',
});
