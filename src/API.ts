/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  imageUri?: string | null,
  status?: string | null,
  isLiked?: Array< string | null > | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  isLiked?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email: string,
  imageUri?: string | null,
  status?: string | null,
  isLiked?: Array< string | null > | null,
  variation?: ModelGameVariationConnection | null,
  liked?: ModelGameConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGameVariationConnection = {
  __typename: "ModelGameVariationConnection",
  items?:  Array<GameVariation | null > | null,
  nextToken?: string | null,
};

export type GameVariation = {
  __typename: "GameVariation",
  id: string,
  title: string,
  para: string,
  userID?: string | null,
  user?: User | null,
  gameID: string,
  game?: Game | null,
  createdAt: string,
  updatedAt: string,
};

export type Game = {
  __typename: "Game",
  id: string,
  name: string,
  category: string,
  players: string,
  highlight: string,
  teams?: boolean | null,
  likeBy?: Array< string | null > | null,
  likedID?: string | null,
  liked?: ModelUserConnection | null,
  sections?: ModelGameSectionConnection | null,
  variations?: ModelGameVariationConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelGameSectionConnection = {
  __typename: "ModelGameSectionConnection",
  items?:  Array<GameSection | null > | null,
  nextToken?: string | null,
};

export type GameSection = {
  __typename: "GameSection",
  id: string,
  title: string,
  data?: Array< string | null > | null,
  orderId?: number | null,
  gameID: string,
  game?: Game | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGameConnection = {
  __typename: "ModelGameConnection",
  items?:  Array<Game | null > | null,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  imageUri?: string | null,
  status?: string | null,
  isLiked?: Array< string | null > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateGameInput = {
  id?: string | null,
  name: string,
  category: string,
  players: string,
  highlight: string,
  teams?: boolean | null,
  likeBy?: Array< string | null > | null,
  likedID?: string | null,
};

export type ModelGameConditionInput = {
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  players?: ModelStringInput | null,
  highlight?: ModelStringInput | null,
  teams?: ModelBooleanInput | null,
  likeBy?: ModelIDInput | null,
  likedID?: ModelIDInput | null,
  and?: Array< ModelGameConditionInput | null > | null,
  or?: Array< ModelGameConditionInput | null > | null,
  not?: ModelGameConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGameInput = {
  id: string,
  name?: string | null,
  category?: string | null,
  players?: string | null,
  highlight?: string | null,
  teams?: boolean | null,
  likeBy?: Array< string | null > | null,
  likedID?: string | null,
};

export type DeleteGameInput = {
  id: string,
};

export type CreateGameSectionInput = {
  id?: string | null,
  title: string,
  data?: Array< string | null > | null,
  orderId?: number | null,
  gameID: string,
};

export type ModelGameSectionConditionInput = {
  title?: ModelStringInput | null,
  data?: ModelStringInput | null,
  orderId?: ModelIntInput | null,
  gameID?: ModelIDInput | null,
  and?: Array< ModelGameSectionConditionInput | null > | null,
  or?: Array< ModelGameSectionConditionInput | null > | null,
  not?: ModelGameSectionConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGameSectionInput = {
  title?: string | null,
  data?: Array< string | null > | null,
  orderId?: number | null,
  gameID?: string | null,
};

export type DeleteGameSectionInput = {
  id: string,
};

export type CreateGameVariationInput = {
  id?: string | null,
  title: string,
  para: string,
  userID?: string | null,
  gameID: string,
};

export type ModelGameVariationConditionInput = {
  title?: ModelStringInput | null,
  para?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  and?: Array< ModelGameVariationConditionInput | null > | null,
  or?: Array< ModelGameVariationConditionInput | null > | null,
  not?: ModelGameVariationConditionInput | null,
};

export type UpdateGameVariationInput = {
  title?: string | null,
  para?: string | null,
  userID?: string | null,
  gameID?: string | null,
};

export type DeleteGameVariationInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  isLiked?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  players?: ModelStringInput | null,
  highlight?: ModelStringInput | null,
  teams?: ModelBooleanInput | null,
  likeBy?: ModelIDInput | null,
  likedID?: ModelIDInput | null,
  and?: Array< ModelGameFilterInput | null > | null,
  or?: Array< ModelGameFilterInput | null > | null,
  not?: ModelGameFilterInput | null,
};

export type ModelGameSectionFilterInput = {
  title?: ModelStringInput | null,
  data?: ModelStringInput | null,
  orderId?: ModelIntInput | null,
  gameID?: ModelIDInput | null,
  and?: Array< ModelGameSectionFilterInput | null > | null,
  or?: Array< ModelGameSectionFilterInput | null > | null,
  not?: ModelGameSectionFilterInput | null,
};

export type ModelGameVariationFilterInput = {
  title?: ModelStringInput | null,
  para?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  and?: Array< ModelGameVariationFilterInput | null > | null,
  or?: Array< ModelGameVariationFilterInput | null > | null,
  not?: ModelGameVariationFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGameMutationVariables = {
  input: CreateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput,
  condition?: ModelGameConditionInput | null,
};

export type DeleteGameMutation = {
  deleteGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGameSectionMutationVariables = {
  input: CreateGameSectionInput,
  condition?: ModelGameSectionConditionInput | null,
};

export type CreateGameSectionMutation = {
  createGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameSectionMutationVariables = {
  input: UpdateGameSectionInput,
  condition?: ModelGameSectionConditionInput | null,
};

export type UpdateGameSectionMutation = {
  updateGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameSectionMutationVariables = {
  input: DeleteGameSectionInput,
  condition?: ModelGameSectionConditionInput | null,
};

export type DeleteGameSectionMutation = {
  deleteGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGameVariationMutationVariables = {
  input: CreateGameVariationInput,
  condition?: ModelGameVariationConditionInput | null,
};

export type CreateGameVariationMutation = {
  createGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameVariationMutationVariables = {
  input: UpdateGameVariationInput,
  condition?: ModelGameVariationConditionInput | null,
};

export type UpdateGameVariationMutation = {
  updateGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameVariationMutationVariables = {
  input: DeleteGameVariationInput,
  condition?: ModelGameVariationConditionInput | null,
};

export type DeleteGameVariationMutation = {
  deleteGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGameConnection",
    items?:  Array< {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGameSectionQueryVariables = {
  id: string,
};

export type GetGameSectionQuery = {
  getGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGameSectionsQueryVariables = {
  filter?: ModelGameSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameSectionsQuery = {
  listGameSections?:  {
    __typename: "ModelGameSectionConnection",
    items?:  Array< {
      __typename: "GameSection",
      id: string,
      title: string,
      data?: Array< string | null > | null,
      orderId?: number | null,
      gameID: string,
      game?:  {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGameVariationQueryVariables = {
  id: string,
};

export type GetGameVariationQuery = {
  getGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGameVariationsQueryVariables = {
  filter?: ModelGameVariationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameVariationsQuery = {
  listGameVariations?:  {
    __typename: "ModelGameVariationConnection",
    items?:  Array< {
      __typename: "GameVariation",
      id: string,
      title: string,
      para: string,
      userID?: string | null,
      user?:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      gameID: string,
      game?:  {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    imageUri?: string | null,
    status?: string | null,
    isLiked?: Array< string | null > | null,
    variation?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    liked?:  {
      __typename: "ModelGameConnection",
      items?:  Array< {
        __typename: "Game",
        id: string,
        name: string,
        category: string,
        players: string,
        highlight: string,
        teams?: boolean | null,
        likeBy?: Array< string | null > | null,
        likedID?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    category: string,
    players: string,
    highlight: string,
    teams?: boolean | null,
    likeBy?: Array< string | null > | null,
    likedID?: string | null,
    liked?:  {
      __typename: "ModelUserConnection",
      items?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        imageUri?: string | null,
        status?: string | null,
        isLiked?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    sections?:  {
      __typename: "ModelGameSectionConnection",
      items?:  Array< {
        __typename: "GameSection",
        id: string,
        title: string,
        data?: Array< string | null > | null,
        orderId?: number | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    variations?:  {
      __typename: "ModelGameVariationConnection",
      items?:  Array< {
        __typename: "GameVariation",
        id: string,
        title: string,
        para: string,
        userID?: string | null,
        gameID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSectionSubscription = {
  onCreateGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSectionSubscription = {
  onUpdateGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSectionSubscription = {
  onDeleteGameSection?:  {
    __typename: "GameSection",
    id: string,
    title: string,
    data?: Array< string | null > | null,
    orderId?: number | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameVariationSubscription = {
  onCreateGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameVariationSubscription = {
  onUpdateGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameVariationSubscription = {
  onDeleteGameVariation?:  {
    __typename: "GameVariation",
    id: string,
    title: string,
    para: string,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      imageUri?: string | null,
      status?: string | null,
      isLiked?: Array< string | null > | null,
      variation?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      liked?:  {
        __typename: "ModelGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    gameID: string,
    game?:  {
      __typename: "Game",
      id: string,
      name: string,
      category: string,
      players: string,
      highlight: string,
      teams?: boolean | null,
      likeBy?: Array< string | null > | null,
      likedID?: string | null,
      liked?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      sections?:  {
        __typename: "ModelGameSectionConnection",
        nextToken?: string | null,
      } | null,
      variations?:  {
        __typename: "ModelGameVariationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
