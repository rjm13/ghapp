/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateGameSection = /* GraphQL */ `
  subscription OnCreateGameSection {
    onCreateGameSection {
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
export const onUpdateGameSection = /* GraphQL */ `
  subscription OnUpdateGameSection {
    onUpdateGameSection {
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
export const onDeleteGameSection = /* GraphQL */ `
  subscription OnDeleteGameSection {
    onDeleteGameSection {
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
