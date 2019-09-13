/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
@import Firebase;
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import "FreshchatSDK.h"

@implementation AppDelegate

#define SYSTEM_VERSION_GRATERTHAN_OR_EQUALTO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define gcmMessageIDKey = "gcm.message_id"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [FIRApp configure];
//  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
//  [RNFirebaseNotifications configure];
  
  /* Initialize Freshchat*/
  
//  FreshchatConfig *config = [[FreshchatConfig alloc]initWithAppID:@"<App ID>"  andAppKey:@"<App Key>"];
//
//  [[Freshchat sharedInstance] initWithConfig:config];
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Panda"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:109.0f/255.0f green:47.0f/255.0f blue:220.0f/255.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //Firebase
  [FIRApp configure];
  [FIRMessaging messaging].delegate = self;
  if(SYSTEM_VERSION_GRATERTHAN_OR_EQUALTO(@"10.0")){
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error){
      if(!error){
        [[UIApplication sharedApplication] registerForRemoteNotifications];
      }
    }];
  }
  else {
    // Code for old versions
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  
  /* Handle remote notifications */
  if ([[Freshchat sharedInstance]isFreshchatNotification:launchOptions]) {
    [[Freshchat sharedInstance]handleRemoteNotification:launchOptions
                                            andAppstate:application.applicationState];
  }
  
  [RNSplashScreen show];
//  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  if ([[Freshchat sharedInstance]isFreshchatNotification:userInfo]) {
    [[Freshchat sharedInstance]handleRemoteNotification:userInfo andAppstate:application.applicationState];
  }
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  
  [[RNFirebaseMessaging instance] didReceiveRemoteNotification:response.notification.request.content.userInfo];
  completionHandler();
}

@end
