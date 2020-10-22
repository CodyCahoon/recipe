import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
//import { Ingredient } from '../entity/Ingredient';
import { Recipe } from '../entity/Recipe';
import { VolumeUnit } from '../enum/volume-unit';
//import { RecipeIngredient } from '../entity/RecipeIngredient';
import { WeightUnit } from '../enum/weight-unit';
@InputType()
export class AddRecipeIngredientInput {
  @Field()
  quantity!: number;

  @Field(() => WeightUnit, { nullable: true })
  weightUnit?: WeightUnit;

  @Field(() => VolumeUnit, { nullable: true })
  volumeUnit?: VolumeUnit;

  @Field()
  ingredientName!: string;
}

@InputType()
export class AddRecipeInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [AddRecipeIngredientInput])
  recipeIngredients!: AddRecipeIngredientInput[];
}

@Resolver(Recipe)
export class RecipeResolver {
  @Query(() => Recipe, { nullable: true })
  async getRecipe(@Arg('id') id: string): Promise<Recipe | null> {
    const recipe = await getRepository(Recipe).findOne({ where: { id } });
    return recipe || null;
  }

  @Query(() => [Recipe])
  async getRecipes(): Promise<Recipe[]> {
    return await getRepository(Recipe).find({
      relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
    });
  }

  @Mutation(() => Boolean)
  async addRecipe(@Arg('options') options: AddRecipeInput): Promise<boolean> {
    const repository = getRepository(Recipe);

    try {
      const { name, description, recipeIngredients } = options;
      const recipe = repository.create({
        name,
        description,
        recipeIngredients: recipeIngredients.map(ri => {
          return {
            ingredient: { name: ri.ingredientName },
            weightUnit: ri.weightUnit,
            volumeUnit: ri.volumeUnit,
            quantity: ri.quantity,
          };
        }),
      });
      await repository.save(recipe);
      return true;
    } catch {
      return false;
    }
  }
}
