echo "Patching relay for react-native ..."
cp -f ./node_modules/fbjs/lib/fetch.js ./node_modules/fbjs/lib/fetch.js.backup
cp -f ./node_modules/asap/raw.js ./node_modules/asap/raw.js.backup
cp -f ./node_modules/react-relay/node_modules/fbjs/lib/fetchWithRetries.js ./node_modules/react-relay/node_modules/fbjs/lib/fetchWithRetries.js.backup
cp -f ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js.backup
cp -f ./node_modules/react-relay/lib/RelayContainer.js ./node_modules/react-relay/lib/RelayContainer.js.backup
cp -f ./node_modules/react-relay/lib/RelayPropTypes.js ./node_modules/react-relay/lib/RelayPropTypes.js.backup
cp -f ./node_modules/react-relay/lib/RelayRootContainer.js ./node_modules/react-relay/lib/RelayRootContainer.js.backup
cp -f ./node_modules/react-relay/lib/RelayRenderer.js ./node_modules/react-relay/lib/RelayRenderer.js.backup
cp -f ./node_modules/react-static-container/lib/StaticContainer.react.js ./node_modules/react-static-container/lib/StaticContainer.react.js.backup
rm ./node_modules/react-relay/node_modules/fbjs/lib/fetchWithRetries.js
rm ./node_modules/react-relay/lib/RelayContainer.js
rm ./node_modules/react-relay/lib/RelayPropTypes.js
rm ./node_modules/react-relay/lib/RelayRootContainer.js
rm ./node_modules/react-relay/lib/RelayRenderer.js
rm ./node_modules/react-static-container/lib/StaticContainer.react.js

cp -f ./relay-patcher/contents/fbjs-fetch.js.replace ./node_modules/fbjs/lib/fetch.js
cp -f ./relay-patcher/contents/asap-raw.js.replace ./node_modules/asap/raw.js
cp -f ./relay-patcher/contents/fbjs-fetch.js.replace ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayContainer.js.backup | sed "s/'react-dom'/'react-native'/g" > ./node_modules/react-relay/lib/RelayContainer.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayPropTypes.js.backup > ./node_modules/react-relay/lib/RelayPropTypes.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayRootContainer.js.backup > ./node_modules/react-relay/lib/RelayRootContainer.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayRenderer.js.backup > ./node_modules/react-relay/lib/RelayRenderer.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-static-container/lib/StaticContainer.react.js.backup > ./node_modules/react-static-container/lib/StaticContainer.react.js
sed "s/ fetch(/ fetch.fetch(/g" < ./node_modules/react-relay/node_modules/fbjs/lib/fetchWithRetries.js.backup > ./node_modules/react-relay/node_modules/fbjs/lib/fetchWithRetries.js
