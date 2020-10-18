import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Recipe } from '../entity/Recipe';

@InputType()
export class AddRecipeInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;
}

@Resolver(Recipe)
export class RecipeResolver {
  @Query(() => Recipe, { nullable: true })
  async getRecipe(@Arg('id') id: string): Promise<Recipe | null> {
    const recipe = await getRepository(Recipe).findOne({ where: { id } });
    return recipe || null;
  }

  @Mutation(() => Boolean)
  async addRecipe(@Arg('options') options: AddRecipeInput): Promise<boolean> {
    const repository = getRepository(Recipe);
    const { name, description } = options;
    try {
      const recipe = repository.create({
        name,
        description,
      });

      await repository.save(recipe);
      return true;
    } catch {
      return false;
    }
  }
}
