# Install

```
npm install && node_modules/bower/bin/bower install
cd static_server/
git submodule init
git submodule update
```

# Run

Edit the path to the index.html file in the static server submodule to point to this index.html file. It should be relative to static_server.js which ends up being `../index.html`

```
npm start
```