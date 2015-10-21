echo "Patching relay for react-native ..."
cp -f ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js.backup
cp -f ./node_modules/react-relay/lib/RelayContainer.js ./node_modules/react-relay/lib/RelayContainer.js.backup
cp -f ./node_modules/react-relay/lib/RelayPropTypes.js ./node_modules/react-relay/lib/RelayPropTypes.js.backup
cp -f ./node_modules/react-relay/lib/RelayRootContainer.js ./node_modules/react-relay/lib/RelayRootContainer.js.backup
rm ./node_modules/react-relay/lib/RelayContainer.js
rm ./node_modules/react-relay/lib/RelayPropTypes.js
rm ./node_modules/react-relay/lib/RelayRootContainer.js

cp -f ./relay-patcher/contents/fbjs-fetch.js.replace ./node_modules/react-relay/node_modules/fbjs/lib/fetch.js
sed "s/'react(-dom)?'/'react-native'/g" < ./node_modules/react-relay/lib/RelayContainer.js.backup > ./node_modules/react-relay/lib/RelayContainer.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayPropTypes.js.backup > ./node_modules/react-relay/lib/RelayPropTypes.js
sed "s/'react'/'react-native'/g" < ./node_modules/react-relay/lib/RelayRootContainer.js.backup > ./node_modules/react-relay/lib/RelayRootContainer.js
