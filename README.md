# Simple Expo todo app

Simple Expo app including sync with MongoDB Realm using realm-js. Based on template and its instruction from [Expo Realm JS template read.me](https://github.com/realm/realm-js/tree/master/templates/expo-template-js#readme) where I added the sync functionality from the [Realm-js example](https://github.com/realm/realm-js/tree/master/example). 


## 🚀 How to use
- Create the Realm Todo app following [this instruction](https://github.com/realm/realm-js/blob/master/templates/docs/sync-setup.md). When it comes to the sync, I chose to set it up manually rather than using the development mode. First I created in Atlas the database `todolist` with collection `Task` and next back in Realm added a new Schema to the Task collection (the used JSON specification is stored in app/models/Task.json). Next, the Sync is enabled with Partition Key `userId` and Users can only read and write their own data permission. 
- Define the App Id in sync.config-.js (folder root) and next save this file as sync.config.js. 
- Run `yarn install`.
- Run `expo run:ios -d`.


## 📝 Notes

- [Setting up Sync](https://docs.mongodb.com/realm/sdk/react-native/quick-start/)
- [Realm JS Documentation](https://docs.mongodb.com/realm/sdk/react-native/)
- [Development Client docs](https://docs.expo.dev/clients/introduction/)
- [Building with EAS](https://docs.expo.dev/eas/)
