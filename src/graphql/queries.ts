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
      sections {
        items {
          id
          title
          data
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
        sections {
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
      gameID
      game {
        id
        name
        category
        players
        highlight
        sections {
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
        gameID
        game {
          id
          name
          category
          players
          highlight
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
