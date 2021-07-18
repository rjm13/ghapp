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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateGameVariation = /* GraphQL */ `
  subscription OnCreateGameVariation {
    onCreateGameVariation {
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
export const onUpdateGameVariation = /* GraphQL */ `
  subscription OnUpdateGameVariation {
    onUpdateGameVariation {
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
export const onDeleteGameVariation = /* GraphQL */ `
  subscription OnDeleteGameVariation {
    onDeleteGameVariation {
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
