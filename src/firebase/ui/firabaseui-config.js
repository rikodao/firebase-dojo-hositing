import * as firebase from "firebase";
import firebaseui from "firebaseui-ja";
import "firebaseui-ja/dist/firebaseui.css";
import firebaseAuth from "@/firebase/auth/firebase-auth";
const UIConfig = {
  signInSuccessWithAuthResult: (authResult, redirectUrl) => {
    console.log("signInSuccessWithAuthResult", authResult, redirectUrl);

    var isNewUser = authResult.additionalUserInfo.isNewUser;
    var displayName = authResult.user.displayName;
    var photoURL = authResult.user.photoURL;

    // SNSログイン＆で登録済みであればスキップ
    if (displayName != "ゲスト" && !isNewUser) {
      return true;
    }

    switch (authResult.additionalUserInfo.providerId) {
      case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
        displayName = authResult.additionalUserInfo.profile.name;
        photoURL = authResult.additionalUserInfo.profile.picture;
        break;
      case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
        displayName = authResult.additionalUserInfo.profile.name;
        photoURL = authResult.additionalUserInfo.profile.picture.data.url;
        break;
      case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
        displayName = authResult.additionalUserInfo.profile.name;
        photoURL = authResult.additionalUserInfo.profile.profile_image_url;
        break;
      case firebase.auth.GithubAuthProvider.PROVIDER_ID:
        displayName = authResult.additionalUserInfo.profile.name;
        photoURL = authResult.additionalUserInfo.profile.avatar_url;
        break;
      default:
        displayName = "ゲスト";
        photoURL = "";
        break;
    }

    var user = {
      displayName: displayName,
      photoURL: photoURL
    };

    firebaseAuth.updateAccout(user).then(res => {
      console.log("Auth登録完了", res);
      alert("ログインしました。");
      window.location.reload();
    });
  },

  signInFailure: error => {
    console.log("signInFailure", error);
    alert(error.message);
    window.location.reload();
  },

  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

export default UIConfig;
