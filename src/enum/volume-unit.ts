import { registerEnumType } from 'type-graphql';

export enum VolumeUnit {
  Cup = 'Cup',
  Deciliter = 'Deciliter',
  Gallon = 'Gallon',
  Gill = 'Gill',
  Liter = 'Liter',
  Milliliter = 'Milliliter',
  Ounce = 'Ounce',
  Pint = 'Pint',
  Quart = 'Quart',
  Tablespoon = 'Tablespoon',
  Teaspoon = 'Teaspoon',
}

registerEnumType(VolumeUnit, {
  name: 'VolumeUnit',
  description: 'Units of volume',
});
