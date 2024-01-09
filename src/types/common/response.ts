import { Repository } from ".";
import { Board } from "../home";

export interface GetRepositoryApiResponse extends Repository {
  items: Board;
}

export interface GetDetailApiResponse extends Array<Board> {}
