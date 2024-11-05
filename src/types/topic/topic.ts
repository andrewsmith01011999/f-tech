import { Category } from "../category/category";

export type Topic = {
  topicId: string;
  name: string;
  category?: Category
}