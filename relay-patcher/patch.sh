echo "Patching relay for react-native ..."
cp -f ./node_modules/fbjs/lib/fetch.js ./node_modules/fbjs/lib/fetch.js.backup
cp -f ./relay-patcher/contents/fbjs-fetch.js.replace ./node_modules/fbjs/lib/fetch.js

cp -f ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js ./node_modules/fbjs/lib/fetch.js.backup
cp -f ./relay-patcher/contents/fbjs-fetch.js.replace ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js

cp -f ./node_modules/asap/raw.js ./node_modules/asap/raw.js.backup
cp -f ./relay-patcher/contents/asap-raw.js.replace ./node_modules/asap/raw.js

cp -f ./relay-patcher/contents/react.js.put ./node_modules/react.ios.js
cp -f ./relay-patcher/contents/react.js.put ./node_modules/react.android.js

cp -f ./relay-patcher/contents/react.js.put ./node_modules/react-dom.ios.js
cp -f ./relay-patcher/contents/react.js.put ./node_modules/react-dom.android.js
