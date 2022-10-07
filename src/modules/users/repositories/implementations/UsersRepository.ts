import { getRepository, IsNull, Not, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOneOrFail({
      relations: ['games'],
      where: {
        id: user_id,
      }
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const allUsers = await this.repository.query(`SELECT * FROM users ORDER BY first_name`);
    return allUsers // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(`select * from users where first_name ILIKE '${first_name}' and last_name ILIKE '${last_name}'`); // Complete usando raw createQueryBuilder
    return users;
  }
}
