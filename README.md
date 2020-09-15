## :octocat: Detox + Jest + Ejected Expo application

This is an example of ejected Expo application integrated with Detox + Jest, using jest-circus runner.

The tests run on the app's production version, which must be built with `yarn detox-build:release` before running the tests with `yarn detox-test:release`

## Setup

### Mac OS

#### Java

On MacOS, to install OpenJDK 8, run the following:

```
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk8
java -version
```

A window will pop-up saying that java is asking for file access permissions. Allow it and you should be ready to go!

#### Android SDK

After installing, you must add it to path, like so:

```
printf '\nexport ANDROID_HOME=/Users/"$USER"/Library/Android/sdk\nexport ANDROID_SDK_ROOT=$ANDROID_HOME\n' >> ~/.bash_profile
```

## Issues I had when setting up Detox environment

### OpenJDK 8

Detox + Expo currently depende on Java 1.8 or OpenJDK 8

On MacOS, to install OpenJDK 8, run the following:

```
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk8
java -version
```

A window will pop-up saying that java is asking for file access permissions. Allow it and you should be ready to go!

### Use an open source emulator

Follow the instructions for installing as per [Detox documentation](https://github.com/wix/Detox/blob/master/docs/Introduction.AndroidDevEnv.md#android-aosp-emulators)

### Error while dexing

Solved by limiting gradlew tasks to the app project, by adding `app` prefix to `build` command on `.detoxrc.json`:

```diff
- "build": "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
+ "build": "cd android && ./gradlew app:assembleRelease app:assembleAndroidTest -DtestBuildType=release && cd ..",
```

[Source on StackOverflow](https://stackoverflow.com/questions/57723138/detox-build-fails-on-android-error-while-dexing)

### App has not responded to the network requests below: (id = -1000) isReady: {}

To solve this issue, I had to build and run the tests on the production version of the app. To do this, just change `binaryPath` and `DtestBuildType` on `.detoxrc.json`:

```diff
- "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
- "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
+ "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
+ "build": "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
```

[Source on StackOverflow](https://stackoverflow.com/questions/59329559/detox-jest-app-has-not-responded-to-the-network-requests-below)

### Kotlin gradle Could not initialize class class org.jetbrains.kotlin.gradle.internal.KotlinSourceSetProviderImplKt

For this one I just had to change my Kotlin version:

```diff
buildscript {
    ext {
-       kotlinVersion = '1.3.0'
+       kotlinVersion = '1.3.72'
    }
}
```

[Source on StackOverflow](https://stackoverflow.com/questions/60833542/kotlin-gradle-could-not-initialize-class-class-org-jetbrains-kotlin-gradle-inter)

### Expiring Daemon because JVM heap space is exhausted

To solve this I needed to change `gradle.properties` and `app/build.gradle` to allow for more memory usage by JVM:

**gradle.properties**
```diff
  android.useAndroidX=true
  android.enableJetifier=true
+ org.gradle.jvmargs=-Xmx4g -XX:MaxPermSize=2048m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

**app/build.gradle**
```diff
android {

+ dexOptions {
+   javaMaxHeapSize "4g"
+ }

}
```

[Source on StackOverflow](https://stackoverflow.com/questions/59044161/react-native-expiring-daemon-because-jvm-heap-space-is-exhausted?noredirect=1&lq=1)

### App Crashing

If you get an invariant error in iOS talking about "Safe Area" or an Android error like the one below:

```
09-14 12:38:26.343  5648  5672 E AndroidRuntime: FATAL EXCEPTION: mqt_native_modules
09-14 12:38:26.343  5648  5672 E AndroidRuntime: Process: com.vagners.expoapp, PID: 5648
09-14 12:38:26.343  5648  5672 E AndroidRuntime: com.facebook.react.common.JavascriptException: Invariant Violation: requireNativeComponent: "RNCSafeAreaProvider" was not found in the UIManager.
```

That means that you should verify the `react-native-safe-area-context` library version. Run:

`yarn why react-native-safe-area-context`

It should show a single installed package. If expo is using a different version, update the package.json version to match it (in the case of this prototype, we had to set it to @3.0.7). Having this dep duplicated will result in errors and different behavior between iOS and Android, so always check on both if/when you update this package's version.
