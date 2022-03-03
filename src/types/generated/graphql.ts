import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

/** This enum stand for who can see the Project: */
export enum Accessibility {
  /** Only the current User. */
  Private = 'PRIVATE',
  /** Everyone can see the project */
  Public = 'PUBLIC',
  /** Only the team members of the project and the current user. */
  Team = 'TEAM'
}

export type CreateProjectArgs = {
  accessibility: Accessibility;
  title: Scalars['String'];
};

export type ListResponse = {
  total: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<ProjectMutationResponse>;
  createSection?: Maybe<Section>;
  createTask?: Maybe<Task>;
  deleteProject?: Maybe<ProjectMutationResponse>;
  deleteSection?: Maybe<Section>;
  deleteTask?: Maybe<Task>;
  login?: Maybe<User>;
  registration?: Maybe<User>;
  renameSection?: Maybe<Section>;
  renameTask?: Maybe<Task>;
  setTaskDueDate?: Maybe<Task>;
  updateProject?: Maybe<ProjectMutationResponse>;
  updateSection?: Maybe<Section>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectArgs;
};


export type MutationCreateSectionArgs = {
  projectId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  sectionId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationRegistrationArgs = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationRenameSectionArgs = {
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationRenameTaskArgs = {
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationSetTaskDueDateArgs = {
  dueDate?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectArgs;
  id: Scalars['ID'];
};


export type MutationUpdateSectionArgs = {
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTaskArgs = {
  title?: InputMaybe<Scalars['String']>;
};

/**
 * The convention is to include in the response object each fields of the objects it modified.
 * read in greater details topic on the apollo documentation [apollo documentation](https://www.apollographql.com/docs/apollo-server/schema/schema/#structuring-mutation-responses).
 *
 * Following this pattern provides a client with helpful, detailed information about the result of each requested operation. Equipped with this information, developers can better react to operation failures in their client code.
 */
export type MutationResponse = {
  /** represents the status of the data transfer, (HTTP status) */
  code: Scalars['Int'];
  /** string that describes the result of the mutation. It is intended to be used in the UI of the product. */
  message: Scalars['String'];
  /** indicates whether the mutation was successful. This allows a coarse check by the client to know if there were failures. */
  success: Scalars['Boolean'];
};

export type PaginationArgs = {
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  accessibility: Accessibility;
  createdAt: Scalars['Date'];
  /**
   * support markdown language
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  id: Scalars['ID'];
  /** fail on creation because not exit yet */
  sections?: Maybe<Array<Maybe<Section>>>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ProjectMutationResponse = MutationResponse & {
  __typename?: 'ProjectMutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  project?: Maybe<Project>;
  success: Scalars['Boolean'];
};

export type ProjectsResponse = ListResponse & {
  __typename?: 'ProjectsResponse';
  projects: Array<Project>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  fetchProject?: Maybe<Project>;
  fetchProjects?: Maybe<ProjectsResponse>;
  profile?: Maybe<User>;
  /** @deprecated will be included in getting a single project query */
  sections?: Maybe<Array<Maybe<Section>>>;
  task?: Maybe<Task>;
};


export type QueryFetchProjectArgs = {
  id: Scalars['ID'];
};


export type QueryFetchProjectsArgs = {
  args: PaginationArgs;
};


export type QuerySectionsArgs = {
  projectId: Scalars['ID'];
};


export type QueryTaskArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Section = {
  __typename?: 'Section';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sectionId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpdateProjectArgs = {
  accessibility?: InputMaybe<Accessibility>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Accessibility: Accessibility;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateProjectArgs: CreateProjectArgs;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  ListResponse: ResolversTypes['ProjectsResponse'];
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['ProjectMutationResponse'];
  PaginationArgs: PaginationArgs;
  Project: ResolverTypeWrapper<Project>;
  ProjectMutationResponse: ResolverTypeWrapper<ProjectMutationResponse>;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Section: ResolverTypeWrapper<Section>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  UpdateProjectArgs: UpdateProjectArgs;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateProjectArgs: CreateProjectArgs;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  ListResponse: ResolversParentTypes['ProjectsResponse'];
  Mutation: {};
  MutationResponse: ResolversParentTypes['ProjectMutationResponse'];
  PaginationArgs: PaginationArgs;
  Project: Project;
  ProjectMutationResponse: ProjectMutationResponse;
  ProjectsResponse: ProjectsResponse;
  Query: {};
  Section: Section;
  String: Scalars['String'];
  Task: Task;
  UpdateProjectArgs: UpdateProjectArgs;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListResponse'] = ResolversParentTypes['ListResponse']> = {
  __resolveType: TypeResolveFn<'ProjectsResponse', ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>;
  createSection?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<MutationCreateSectionArgs, 'projectId' | 'title'>>;
  createTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'sectionId' | 'title'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteSection?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<MutationDeleteSectionArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationLoginArgs>>;
  registration?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationRegistrationArgs>>;
  renameSection?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<MutationRenameSectionArgs, 'id'>>;
  renameTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationRenameTaskArgs, 'id'>>;
  setTaskDueDate?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationSetTaskDueDateArgs, 'id'>>;
  updateProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'data' | 'id'>>;
  updateSection?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<MutationUpdateSectionArgs, 'id'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, Partial<MutationUpdateTaskArgs>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'ProjectMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  accessibility?: Resolver<ResolversTypes['Accessibility'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMutationResponse'] = ResolversParentTypes['ProjectMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse']> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryFetchProjectArgs, 'id'>>;
  fetchProjects?: Resolver<Maybe<ResolversTypes['ProjectsResponse']>, ParentType, ContextType, RequireFields<QueryFetchProjectsArgs, 'args'>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType, RequireFields<QuerySectionsArgs, 'projectId'>>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, Partial<QueryTaskArgs>>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sectionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  ListResponse?: ListResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectMutationResponse?: ProjectMutationResponseResolvers<ContextType>;
  ProjectsResponse?: ProjectsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

