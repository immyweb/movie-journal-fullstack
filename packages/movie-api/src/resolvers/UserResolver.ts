import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';

import { User, UserWithToken } from '../types/User';
import { Context } from '../context';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getUserById(@Arg('id') id: string, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { id },
      include: {
        movies: true,
      },
    });

    if (!user) {
      throw new Error('No user found');
    }
    return user;
  }

  @Query(() => User)
  async getUserByEmail(@Arg('email') email: string, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { email },
      include: {
        movies: true,
      },
    });

    if (!user) {
      throw new Error('No user with that email');
    }
    console.log(user);
    return user;
  }

  @Mutation(() => String)
  async signUp(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ) {
    const user = await ctx.prisma.user.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);

    return token;
  }

  @Mutation(() => UserWithToken)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('No user found');
    }

    const valid = await comparePasswords(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    const token = createJWT(user);

    return {
      user,
      token,
    };
  }
}
