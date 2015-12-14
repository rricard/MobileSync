package com.mobilesync.react.modules;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.mobilesync.MainActivity;


public class NetworkAndroidModule extends ReactContextBaseJavaModule {

  public NetworkAndroidModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "NetworkAndroid";
  }

  @ReactMethod
  public void isWifiOn(Callback successCallback) {
    ConnectivityManager connManager = (ConnectivityManager)  getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo mWifi = connManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);

    if (mWifi.isConnected()) {
      successCallback.invoke(true);
    } else {
      successCallback.invoke(false);
    }
  }
}
