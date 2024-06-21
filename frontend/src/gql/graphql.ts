/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  members?: Maybe<Array<Member>>;
  name?: Maybe<Scalars['String']['output']>;
  type: ChannelType;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** Defines the type of channel */
export enum ChannelType {
  Audio = 'AUDIO',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type CreateProfileDto = {
  email: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServerDto = {
  name: Scalars['String']['input'];
  profileId: Scalars['Float']['input'];
};

export type Member = {
  __typename?: 'Member';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profileId: Scalars['Float']['output'];
  role: MemberRole;
  server?: Maybe<Server>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** Defines the role of a member on a server */
export enum MemberRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Moderator = 'MODERATOR'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProfile: Profile;
  createServer: Server;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileDto;
};


export type MutationCreateServerArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateServerDto;
};

export type Profile = {
  __typename?: 'Profile';
  channels?: Maybe<Array<Maybe<Channel>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  imageUrl: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  servers?: Maybe<Array<Maybe<Server>>>;
};

export type Query = {
  __typename?: 'Query';
  getProfileById: Profile;
  getServers: Array<Server>;
  hello: Scalars['String']['output'];
};


export type QueryGetProfileByIdArgs = {
  profileId: Scalars['Float']['input'];
};

export type Server = {
  __typename?: 'Server';
  channels: Array<Channel>;
  id: Scalars['Float']['output'];
  imageUrl: Scalars['String']['output'];
  inviteCode?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Member>>;
  name: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  profileId: Scalars['Float']['output'];
};

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileDto;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id: number, imageUrl: string, name?: string | null, email?: string | null } };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerDto;
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: number, name: string, imageUrl: string, members?: Array<{ __typename?: 'Member', id: number }> | null } };


export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProfileDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServerDto"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServerMutation, CreateServerMutationVariables>;