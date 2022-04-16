import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloContext } from '../context';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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

export type CreateProjectData = {
  accessibility: Accessibility;
  title: Scalars['String'];
};

export type CreateSectionData = {
  projectId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateTaskData = {
  sectionId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateUserData = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type FilterArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export type ListResponse = {
  total: Scalars['Int'];
};

export type LoginData = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: ProjectMutationResponse;
  createSection: SectionMutationResponse;
  createTask: TaskMutationResponse;
  deleteProject: ProjectMutationResponse;
  deleteSection: SectionMutationResponse;
  deleteTask: TaskMutationResponse;
  login: UserMutationResponse;
  registration: UserMutationResponse;
  updateProject: ProjectMutationResponse;
  updateSection: SectionMutationResponse;
  updateTask: TaskMutationResponse;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectData;
};


export type MutationCreateSectionArgs = {
  data: CreateSectionData;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskData;
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
  data: LoginData;
};


export type MutationRegistrationArgs = {
  data: CreateUserData;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectData;
  id: Scalars['ID'];
};


export type MutationUpdateSectionArgs = {
  data: UpdateSectionData;
  id: Scalars['ID'];
};


export type MutationUpdateTaskArgs = {
  data: UpdateTaskData;
  id: Scalars['ID'];
};

export type MutationResponse = {
  status: MutationStatus;
};

export enum MutationStatus {
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

export type PaginationArgs = {
  filter?: InputMaybe<Array<FilterArgs>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ProjectMutationResponse = MutationResponse & {
  __typename?: 'ProjectMutationResponse';
  project: Project;
  status: MutationStatus;
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
  fetchSections?: Maybe<SectionsResponse>;
  fetchTask?: Maybe<Task>;
  profile?: Maybe<User>;
};


export type QueryFetchProjectArgs = {
  id: Scalars['ID'];
};


export type QueryFetchProjectsArgs = {
  args?: InputMaybe<PaginationArgs>;
};


export type QueryFetchSectionsArgs = {
  projectId: Scalars['ID'];
};


export type QueryFetchTaskArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Moderator = 'MODERATOR'
}

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type SectionMutationResponse = MutationResponse & {
  __typename?: 'SectionMutationResponse';
  section: Section;
  status: MutationStatus;
};

export type SectionsResponse = ListResponse & {
  __typename?: 'SectionsResponse';
  sections: Array<Section>;
  total: Scalars['Int'];
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
  sectionId: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type TaskMutationResponse = MutationResponse & {
  __typename?: 'TaskMutationResponse';
  status: MutationStatus;
  task: Task;
};

export type UpdateProjectData = {
  accessibility?: InputMaybe<Accessibility>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateSectionData = {
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTaskData = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpires?: Maybe<Scalars['String']>;
  role: Role;
  updatedAt: Scalars['Date'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  status: MutationStatus;
  user?: Maybe<UserPayload>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Scalars['String'];
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
  CreateProjectData: CreateProjectData;
  CreateSectionData: CreateSectionData;
  CreateTaskData: CreateTaskData;
  CreateUserData: CreateUserData;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  FilterArgs: FilterArgs;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  ListResponse: ResolversTypes['ProjectsResponse'] | ResolversTypes['SectionsResponse'];
  LoginData: LoginData;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['ProjectMutationResponse'] | ResolversTypes['SectionMutationResponse'] | ResolversTypes['TaskMutationResponse'] | ResolversTypes['UserMutationResponse'];
  MutationStatus: MutationStatus;
  PaginationArgs: PaginationArgs;
  Project: ResolverTypeWrapper<Project>;
  ProjectMutationResponse: ResolverTypeWrapper<ProjectMutationResponse>;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  Section: ResolverTypeWrapper<Section>;
  SectionMutationResponse: ResolverTypeWrapper<SectionMutationResponse>;
  SectionsResponse: ResolverTypeWrapper<SectionsResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskMutationResponse: ResolverTypeWrapper<TaskMutationResponse>;
  UpdateProjectData: UpdateProjectData;
  UpdateSectionData: UpdateSectionData;
  UpdateTaskData: UpdateTaskData;
  User: ResolverTypeWrapper<User>;
  UserMutationResponse: ResolverTypeWrapper<UserMutationResponse>;
  UserPayload: ResolverTypeWrapper<UserPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateProjectData: CreateProjectData;
  CreateSectionData: CreateSectionData;
  CreateTaskData: CreateTaskData;
  CreateUserData: CreateUserData;
  Date: Scalars['Date'];
  FilterArgs: FilterArgs;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  ListResponse: ResolversParentTypes['ProjectsResponse'] | ResolversParentTypes['SectionsResponse'];
  LoginData: LoginData;
  Mutation: {};
  MutationResponse: ResolversParentTypes['ProjectMutationResponse'] | ResolversParentTypes['SectionMutationResponse'] | ResolversParentTypes['TaskMutationResponse'] | ResolversParentTypes['UserMutationResponse'];
  PaginationArgs: PaginationArgs;
  Project: Project;
  ProjectMutationResponse: ProjectMutationResponse;
  ProjectsResponse: ProjectsResponse;
  Query: {};
  Section: Section;
  SectionMutationResponse: SectionMutationResponse;
  SectionsResponse: SectionsResponse;
  String: Scalars['String'];
  Task: Task;
  TaskMutationResponse: TaskMutationResponse;
  UpdateProjectData: UpdateProjectData;
  UpdateSectionData: UpdateSectionData;
  UpdateTaskData: UpdateTaskData;
  User: User;
  UserMutationResponse: UserMutationResponse;
  UserPayload: UserPayload;
};

export type UpperDirectiveArgs = { };

export type UpperDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = UpperDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ListResponse'] = ResolversParentTypes['ListResponse']> = {
  __resolveType: TypeResolveFn<'ProjectsResponse' | 'SectionsResponse', ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<ResolversTypes['ProjectMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>;
  createSection?: Resolver<ResolversTypes['SectionMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateSectionArgs, 'data'>>;
  createTask?: Resolver<ResolversTypes['TaskMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'data'>>;
  deleteProject?: Resolver<ResolversTypes['ProjectMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteSection?: Resolver<ResolversTypes['SectionMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteSectionArgs, 'id'>>;
  deleteTask?: Resolver<ResolversTypes['TaskMutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  login?: Resolver<ResolversTypes['UserMutationResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'data'>>;
  registration?: Resolver<ResolversTypes['UserMutationResponse'], ParentType, ContextType, RequireFields<MutationRegistrationArgs, 'data'>>;
  updateProject?: Resolver<ResolversTypes['ProjectMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'data' | 'id'>>;
  updateSection?: Resolver<ResolversTypes['SectionMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateSectionArgs, 'data' | 'id'>>;
  updateTask?: Resolver<ResolversTypes['TaskMutationResponse'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'data' | 'id'>>;
};

export type MutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'ProjectMutationResponse' | 'SectionMutationResponse' | 'TaskMutationResponse' | 'UserMutationResponse', ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  accessibility?: Resolver<ResolversTypes['Accessibility'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProjectMutationResponse'] = ResolversParentTypes['ProjectMutationResponse']> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse']> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryFetchProjectArgs, 'id'>>;
  fetchProjects?: Resolver<Maybe<ResolversTypes['ProjectsResponse']>, ParentType, ContextType, Partial<QueryFetchProjectsArgs>>;
  fetchSections?: Resolver<Maybe<ResolversTypes['SectionsResponse']>, ParentType, ContextType, RequireFields<QueryFetchSectionsArgs, 'projectId'>>;
  fetchTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryFetchTaskArgs, 'id'>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SectionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionMutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['SectionMutationResponse'] = ResolversParentTypes['SectionMutationResponse']> = {
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionsResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['SectionsResponse'] = ResolversParentTypes['SectionsResponse']> = {
  sections?: Resolver<Array<ResolversTypes['Section']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sectionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskMutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['TaskMutationResponse'] = ResolversParentTypes['TaskMutationResponse']> = {
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resetTokenExpires?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['UserMutationResponse'] = ResolversParentTypes['UserMutationResponse']> = {
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPayloadResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
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
  SectionMutationResponse?: SectionMutationResponseResolvers<ContextType>;
  SectionsResponse?: SectionsResponseResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskMutationResponse?: TaskMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserMutationResponse?: UserMutationResponseResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = ApolloContext> = {
  upper?: UpperDirectiveResolver<any, any, ContextType>;
};
