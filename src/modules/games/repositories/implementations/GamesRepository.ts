import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const titles = await
      this.repository
        .createQueryBuilder("games")
        .where("title ilike :title", { title: `%${param}%` })
        .getMany();

    return titles;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const countAll = await this.repository.query(`select count(*) from games`);
    return countAll
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder("games")
      .relation(Game, "users")
      .of(id)
      .loadMany();

    return users;

  }
}
