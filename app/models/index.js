import {createRealmContext} from '@realm/react';
import {Task} from './Task';

// export const TaskRealmContext = createRealmContext({
//   schema: [Task],
//   deleteRealmIfMigrationNeeded: true,
// });

export default createRealmContext({
  schema: [Task.schema],
  // deleteRealmIfMigrationNeeded: true,  // Cannot set 'deleteRealmIfMigrationNeeded' when sync is enabled ('sync.partitionValue' is set).
});