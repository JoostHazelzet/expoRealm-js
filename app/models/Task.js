import { Realm, createRealmContext } from '@realm/react';

export class Task {
  constructor({description, userId}) {
    this._id = new Realm.BSON.ObjectId();
    this.userId = userId;
    this.description = description;
    this.isComplete = false;
    this.createdAt = new Date();
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      userId: 'string',
      description: 'string',
      isComplete: {type: 'bool', default: false},
      createdAt: 'date'
    },
  };
}
