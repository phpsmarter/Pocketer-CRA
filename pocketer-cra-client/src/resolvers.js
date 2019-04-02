import { gql } from "apollo-boost";

export const defaults = {
  likedPhotos: []
};

export const resolvers = {
  Image: {
    isLiked: () => false
  }
  
};
