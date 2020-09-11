## :octocat: Detox + Jest + Ejected Expo application

This is an example of ejected Expo application integrated with Detox + Jest, using jest-circus runner.

The tests run on the app's production version, which must be built with `yarn detox-build:release` before running the tests with `yarn detox-test:release`


## Issues I had when setting up Detox environment

### OpenJDK 8

Detox + Expo currently depende on Java 1.8 or OpenJDK 8

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
