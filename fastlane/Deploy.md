FastLane Documentation
================

## Installation
```
sudo gem install fastlane
```


## Adding Credentials

- **Appfile:** Update values for `app_identifier`, `apple_id` and `team_id`
- **Deliverfile:** Update values for `app_identifier` and `username`
- **Matchfile:** Update values for `git_url` and `type`. Add the *type* value in Fastfile's **certificate** lane
- **Fastfile:** Update values for `SLACK_URL`
- **JSON Key:** Generate [`key.json`](https://docs.fastlane.tools/getting-started/android/setup/#setting-up-supply) from your Google Developers Service Account
- **Generate-apk:** Update `keytool` command with your credentials
- **Metadata:** Contains app detials required to publish on App stores
- **Screenshots:** Contains screenshots of App required to publish on App stores


## Available Actions


### iOS
#### ios certificate
```
fastlane ios certificate
```
Download and Import required Certificates to the App

#### ios testflight
```
fastlane ios testflight
```
Submit a new Beta Build to Apple TestFlight

#### ios release
```
fastlane ios release
```
Deploy a new version to the App Store

----


### Android
#### android release
```
fastlane android release
```
Deploy a new version to the Google Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.

More information about fastlane can be found on [https://fastlane.tools](https://fastlane.tools).

The documentation of fastlane can be found on [https://docs.fastlane.tools](https://docs.fastlane.tools).