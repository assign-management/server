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

export type CreateSectionArgs = {
  projectId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateTaskArgs = {
  sectionId: Scalars['ID'];
  title: Scalars['String'];
};

export type ListResponse = {
  total: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<ProjectMutationResponse>;
  createSection?: Maybe<SectionMutationResponse>;
  createTask?: Maybe<TaskMutationResponse>;
  deleteProject?: Maybe<ProjectMutationResponse>;
  deleteSection?: Maybe<SectionMutationResponse>;
  deleteTask?: Maybe<TaskMutationResponse>;
  login?: Maybe<User>;
  registration?: Maybe<User>;
  updateProject?: Maybe<ProjectMutationResponse>;
  updateSection?: Maybe<SectionMutationResponse>;
  updateTask?: Maybe<TaskMutationResponse>;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectArgs;
};


export type MutationCreateSectionArgs = {
  args: CreateSectionArgs;
};


export type MutationCreateTaskArgs = {
  args: CreateTaskArgs;
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


export type MutationUpdateProjectArgs = {
  args: UpdateProjectArgs;
};


export type MutationUpdateSectionArgs = {
  args: UpdateSectionArgs;
};


export type MutationUpdateTaskArgs = {
  args: UpdateTaskArgs;
};

export type MutationResponse = {
  status: MutationStatus;
};

export enum MutationStatus {
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

export type PaginationArgs = {
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
  project?: Maybe<Project>;
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
  profile?: Maybe<User>;
  task?: Maybe<Task>;
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


export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type SectionMutationResponse = MutationResponse & {
  __typename?: 'SectionMutationResponse';
  section?: Maybe<Section>;
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
  task?: Maybe<Task>;
};

export type UpdateProjectArgs = {
  accessibility?: InputMaybe<Accessibility>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateSectionArgs = {
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateTaskArgs = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  id: Scalars['ID'];
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
  CreateSectionArgs: CreateSectionArgs;
  CreateTaskArgs: CreateTaskArgs;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  ListResponse: ResolversTypes['ProjectsResponse'] | ResolversTypes['SectionsResponse'];
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['ProjectMutationResponse'] | ResolversTypes['SectionMutationResponse'] | ResolversTypes['TaskMutationResponse'];
  MutationStatus: MutationStatus;
  PaginationArgs: PaginationArgs;
  Project: ResolverTypeWrapper<Project>;
  ProjectMutationResponse: ResolverTypeWrapper<ProjectMutationResponse>;
  ProjectsResponse: ResolverTypeWrapper<ProjectsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Section: ResolverTypeWrapper<Section>;
  SectionMutationResponse: ResolverTypeWrapper<SectionMutationResponse>;
  SectionsResponse: ResolverTypeWrapper<SectionsResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskMutationResponse: ResolverTypeWrapper<TaskMutationResponse>;
  UpdateProjectArgs: UpdateProjectArgs;
  UpdateSectionArgs: UpdateSectionArgs;
  UpdateTaskArgs: UpdateTaskArgs;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateProjectArgs: CreateProjectArgs;
  CreateSectionArgs: CreateSectionArgs;
  CreateTaskArgs: CreateTaskArgs;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  ListResponse: ResolversParentTypes['ProjectsResponse'] | ResolversParentTypes['SectionsResponse'];
  Mutation: {};
  MutationResponse: ResolversParentTypes['ProjectMutationResponse'] | ResolversParentTypes['SectionMutationResponse'] | ResolversParentTypes['TaskMutationResponse'];
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
  UpdateProjectArgs: UpdateProjectArgs;
  UpdateSectionArgs: UpdateSectionArgs;
  UpdateTaskArgs: UpdateTaskArgs;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListResponse'] = ResolversParentTypes['ListResponse']> = {
  __resolveType: TypeResolveFn<'ProjectsResponse' | 'SectionsResponse', ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>;
  createSection?: Resolver<Maybe<ResolversTypes['SectionMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateSectionArgs, 'args'>>;
  createTask?: Resolver<Maybe<ResolversTypes['TaskMutationResponse']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'args'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  deleteSection?: Resolver<Maybe<ResolversTypes['SectionMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteSectionArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['TaskMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationLoginArgs>>;
  registration?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationRegistrationArgs>>;
  updateProject?: Resolver<Maybe<ResolversTypes['ProjectMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'args'>>;
  updateSection?: Resolver<Maybe<ResolversTypes['SectionMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateSectionArgs, 'args'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['TaskMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'args'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'ProjectMutationResponse' | 'SectionMutationResponse' | 'TaskMutationResponse', ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  accessibility?: Resolver<ResolversTypes['Accessibility'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectMutationResponse'] = ResolversParentTypes['ProjectMutationResponse']> = {
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsResponse'] = ResolversParentTypes['ProjectsResponse']> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryFetchProjectArgs, 'id'>>;
  fetchProjects?: Resolver<Maybe<ResolversTypes['ProjectsResponse']>, ParentType, ContextType, Partial<QueryFetchProjectsArgs>>;
  fetchSections?: Resolver<Maybe<ResolversTypes['SectionsResponse']>, ParentType, ContextType, RequireFields<QueryFetchSectionsArgs, 'projectId'>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionMutationResponse'] = ResolversParentTypes['SectionMutationResponse']> = {
  section?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionsResponse'] = ResolversParentTypes['SectionsResponse']> = {
  sections?: Resolver<Array<ResolversTypes['Section']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
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

export type TaskMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskMutationResponse'] = ResolversParentTypes['TaskMutationResponse']> = {
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
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
  SectionMutationResponse?: SectionMutationResponseResolvers<ContextType>;
  SectionsResponse?: SectionsResponseResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskMutationResponse?: TaskMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

