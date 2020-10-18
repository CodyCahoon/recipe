import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredient)
  ingredient!: Ingredient;
}
