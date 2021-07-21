/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      imageUri
      status
      isLiked
      variation {
        items {
          id
          title
          para
          userID
          gameID
          createdAt
          updatedAt
        }
        nextToken
      }
      liked {
        items {
          id
          name
          category
          players
          highlight
          teams
          likedID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        imageUri
        status
        isLiked
        variation {
          nextToken
        }
        liked {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      category
      players
      highlight
      teams
      likedID
      liked {
        items {
          id
          name
          email
          imageUri
          status
          isLiked
          createdAt
          updatedAt
        }
        nextToken
      }
      sections {
        items {
          id
          title
          data
          orderId
          gameID
          createdAt
          updatedAt
        }
        nextToken
      }
      variations {
        items {
          id
          title
          para
          userID
          gameID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        players
        highlight
        teams
        likedID
        liked {
          nextToken
        }
        sections {
          nextToken
        }
        variations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameSection = /* GraphQL */ `
  query GetGameSection($id: ID!) {
    getGameSection(id: $id) {
      id
      title
      data
      orderId
      gameID
      game {
        id
        name
        category
        players
        highlight
        teams
        likedID
        liked {
          nextToken
        }
        sections {
          nextToken
        }
        variations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGameSections = /* GraphQL */ `
  query ListGameSections(
    $filter: ModelGameSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        data
        orderId
        gameID
        game {
          id
          name
          category
          players
          highlight
          teams
          likedID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameVariation = /* GraphQL */ `
  query GetGameVariation($id: ID!) {
    getGameVariation(id: $id) {
      id
      title
      para
      userID
      user {
        id
        name
        email
        imageUri
        status
        isLiked
        variation {
          nextToken
        }
        liked {
          nextToken
        }
        createdAt
        updatedAt
      }
      gameID
      game {
        id
        name
        category
        players
        highlight
        teams
        likedID
        liked {
          nextToken
        }
        sections {
          nextToken
        }
        variations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGameVariations = /* GraphQL */ `
  query ListGameVariations(
    $filter: ModelGameVariationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameVariations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        para
        userID
        user {
          id
          name
          email
          imageUri
          status
          isLiked
          createdAt
          updatedAt
        }
        gameID
        game {
          id
          name
          category
          players
          highlight
          teams
          likedID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
