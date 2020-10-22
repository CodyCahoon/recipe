import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VolumeUnit } from '../enum/volume-unit';
import { WeightUnit } from '../enum/weight-unit';
import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';

@ObjectType()
@Entity()
export class RecipeIngredient {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe!: Recipe;

  @Field(() => Ingredient)
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredient, { cascade: true })
  ingredient!: Ingredient;

  @Field()
  @Column({ default: 0 })
  quantity!: number;

  @Field(() => VolumeUnit, { nullable: true })
  @Column({ type: 'enum', enum: VolumeUnit, nullable: true })
  volumeUnit?: VolumeUnit;

  @Field(() => WeightUnit, { nullable: true })
  @Column({ type: 'enum', enum: WeightUnit, default: WeightUnit.Gram, nullable: true })
  weightUnit?: WeightUnit;
}
