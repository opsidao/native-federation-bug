# Native federation plugin bug example

This repository demonstrates that when using the [native-federation-typescript plugin](https://github.com/module-federation/universe/tree/main/packages/native-federation-typescript), the types are only generated for the first three federated modules configured in the host webpack configuration.

To reproduce the problem, in each of the folders in this repository you need to start the webpack dev server (and leave it running in all of them, of course) with:

```shell
cd app1
npm install
npm start

# Switch to another terminal

cd app2
npm install
npm start

# Switch to another terminal

cd app3
npm install
npm start

# Switch to another terminal

cd app4
npm install
npm start

# Switch to another terminal

cd host
npm install
npm start
```

At this point you should get a web browser opened with the four scaffolded apps one after another in order.

Checking the [host/@mf-types](host/@mf-types) folder, you can see that the types are generated for `app1`,`app2` and `app3`, but not for `app4`

If at this point you modify the [host/webpack.config.js](host/webpack.config.js) file and change the order of the remotes to put, for example, `app4` first in the list (which should have no effect at all) and restart the host's dev server, you will see that at this point the [host/@mf-types](host/@mf-types) folder contents change and the `app4` types show up while whichever is the app listed in the fourth position now will have it types disappear from that folder.
