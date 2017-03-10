RegisterEvents = new Mongo.Collection('register_events', {connection: null});
new PersistentMinimongo(RegisterEvents);

