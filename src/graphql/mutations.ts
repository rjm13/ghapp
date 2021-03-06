/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          likeBy
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          likeBy
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          likeBy
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      name
      category
      players
      highlight
      teams
      likeBy
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      name
      category
      players
      highlight
      teams
      likeBy
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      name
      category
      players
      highlight
      teams
      likeBy
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
export const createGameSection = /* GraphQL */ `
  mutation CreateGameSection(
    $input: CreateGameSectionInput!
    $condition: ModelGameSectionConditionInput
  ) {
    createGameSection(input: $input, condition: $condition) {
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
        likeBy
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
export const updateGameSection = /* GraphQL */ `
  mutation UpdateGameSection(
    $input: UpdateGameSectionInput!
    $condition: ModelGameSectionConditionInput
  ) {
    updateGameSection(input: $input, condition: $condition) {
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
        likeBy
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
export const deleteGameSection = /* GraphQL */ `
  mutation DeleteGameSection(
    $input: DeleteGameSectionInput!
    $condition: ModelGameSectionConditionInput
  ) {
    deleteGameSection(input: $input, condition: $condition) {
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
        likeBy
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
export const createGameVariation = /* GraphQL */ `
  mutation CreateGameVariation(
    $input: CreateGameVariationInput!
    $condition: ModelGameVariationConditionInput
  ) {
    createGameVariation(input: $input, condition: $condition) {
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
        likeBy
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
export const updateGameVariation = /* GraphQL */ `
  mutation UpdateGameVariation(
    $input: UpdateGameVariationInput!
    $condition: ModelGameVariationConditionInput
  ) {
    updateGameVariation(input: $input, condition: $condition) {
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
        likeBy
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
export const deleteGameVariation = /* GraphQL */ `
  mutation DeleteGameVariation(
    $input: DeleteGameVariationInput!
    $condition: ModelGameVariationConditionInput
  ) {
    deleteGameVariation(input: $input, condition: $condition) {
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
        likeBy
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
