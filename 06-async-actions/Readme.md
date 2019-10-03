# 06 Async actions

Action are synchronous, how can we manage asynchronous operations?

Let's explore _redux-thunk_ a simple approach.

## Steps to build it

- Copy the content of the `01-hello-redux` folder to an empty folder for the sample.

- Install the npm packages described in the [./package.json](./package.json) and verify that it works:

```bash
npm install
```

- Let's install _redux-thunk_

```bash
npm install redux-thunk --save
```

- Le'ts install a library to make ajax calls.

```bash
npm install axios --save
```

- Let's register Redux-thunk middleware in the main index file.

```diff

```

- Let's create a member entity.

```typescript
export interface MemberEntity {
  id: number;
  login: string;
  avatar_url: string;
}

export const createDefaultMemberEntity = () => ({
  id: -1,
  login: "",
  avatar_url: ""
});
```

- Let's create an api to get a list of members from Github:

```typescript
import { MemberEntity } from "../model/member";
import Axios, { AxiosResponse } from "axios";

const gitHubURL = "https://api.github.com";
const gitHubMembersUrl = `${gitHubURL}/orgs/lemoncode/members`;

export const getMembersCollection = (): Promise<MemberEntity[]> => {
  const promise = new Promise<MemberEntity[]>((resolve, reject) => {
    try {
      Axios.get<MemberEntity[]>(gitHubMembersUrl).then(response =>
        resolve(mapMemberListApiToModel(response))
      );
    } catch (ex) {
      reject(ex);
    }
  });

  return promise;
};

const mapMemberListApiToModel = ({
  data
}: AxiosResponse<any[]>): MemberEntity[] =>
  data.map(gitHubMember => ({
    id: gitHubMember.id,
    login: gitHubMember.login,
    avatar_url: gitHubMember.avatar_url
  }));
```

- Let's define a new action Id (ajax request completed):

_./common/actionIds.ts_

```typescript
export const actionsIds = {
  MEMBER_REQUEST_COMPLETED: "MEMBER_REQUEST_COMPLETED"
};
```

- Let's create an action that will inform the list of members
  to the reducer once the ajax call has been completed.

_./action_

```typescript
import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";

export const memberRequestCompleted = (members: MemberEntity[]) => {
  return {
    type: actionsEnums.MEMBER_REQUEST_COMPLETED,
    payload: members
  };
};
```

- Now le't s add the thunk action (request start):

```diff
import {actionsEnums} from '../common/actionsEnums';
import {MemberEntity} from '../model/member';
+ import {getMemberCollection} from '../api/member';

export const memberRequestCompleted = (members: MemberEntity[]) => {
    return {
        type: actionsEnums.MEMBER_REQUEST_COMPLETED,
        payload: members
    }
}

+ export const memberRequest = () => (dispatcher) =>{
+   const promise = memberAPI.getAllMembers();
+
+   promise.then(
+     (data) => dispatcher(memberRequestCompleted(data))
+   );
+
+   return promise;
+ }
```

- Let's add a new reducer that will hold members state ./src/reducers/member.reducer.ts.

_./src/reducer/member-reducer.ts_

```typescript
import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";

export type memberState = MemberEntity[];

export const memberReducer = (state: memberState = [], action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action.payload);
  }

  return state;
};

const handleMemberRequestCompletedAction = (state: memberState, members) => {
  return members;
};
```

- Let's register it:

_./src/reducer/index.js_

```diff
import { combineReducers } from "redux";
import { userProfileReducer, UserProfileState } from "./user-profile.reducer";
+ import { memberReducer, memberState } from './memberReducer';

export interface State {
  userProfileReducer: UserProfileState;
+  memberReducer : memberState;
}

export const reducers = combineReducers<State>({
  userProfileReducer,
+ memberReducer,
});
```

- Let's start by create a simple member component that will
  just display and li (later on we will go porting this to a table),
  and contain a button to trigger a member load.

- Now let's create a container that will tied up component and
  redux.

- Excercise port this li list to a table,break it down into table
  and row.
