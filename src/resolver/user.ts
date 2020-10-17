import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: number): Promise<User | null> {
    return (await getRepository(User).findOne({ where: { id: id } })) || null;
  }

  @Mutation(() => Boolean)
  async addUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('age') age: number,
  ) {
    try {
      const user = getRepository(User).create({
        firstName,
        lastName,
        age,
      });

      await getRepository(User).save(user);

      return true;
    } catch (error) {
      return false;
    }
  }
}
