package com.mobilesync;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;
import com.mobilesync.react.modules.NetworkAndroidModule;
import java.util.List;
import java.util.ArrayList;

class AndroidModulesPackage implements ReactPackage {
  @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
     List<NativeModule> modules = new ArrayList<>();
     modules.add(new NetworkAndroidModule(reactContext));
     return modules;
   }

   @Override
   public List<Class<? extends JavaScriptModule>> createJSModules() {
     return new ArrayList<Class<? extends JavaScriptModule>>();
   }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return new ArrayList<ViewManager>();
    }
 }
