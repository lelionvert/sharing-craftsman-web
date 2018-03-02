import { Knowledge } from "./knowledge.model";

export interface Category {
  id: string;
  name: string;
  knowledges: Knowledge[];
}