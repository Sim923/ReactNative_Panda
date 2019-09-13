package app.successpanda.successpanda;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.uxcam.RNUxcamPackage;
import com.freshchat.consumer.sdk.react.RNFreshchatSdkPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import app.successpanda.successpanda.BuildConfig;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new FlurryAnalyticsPackage(),
            new NetInfoPackage(),
            new RNUxcamPackage(),
          new RNFreshchatSdkPackage(),
          new ReactNativeRestartPackage(),
          new SplashScreenReactPackage(),
          new FastImageViewPackage(),
          new AsyncStoragePackage(),
          new RNLocalizePackage(),
          new ImageResizerPackage(),
          new ImagePickerPackage(),
          new RNGestureHandlerPackage(),
          new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
