# vue-fire-chat
This is a music application which can upload, manage and listen to music without interruption. 

## Demo
https://music-share-pro.netlify.app

### Testing account
- email: user1@gmail.com
- password: 123456789

## App first look

### Home Page
![image](https://github.com/kelvinho1020/Music-share/blob/master/public/music-share1.gif)
### Manage Page
![image](https://github.com/kelvinho1020/Music-share/blob/master/public/music-share2.gif)
### Content Page
![image](https://github.com/kelvinho1020/Music-share/blob/master/public/music-share3.gif)

## Project setup

### Open source and API this project have used
- Using [HOWLER.JS](https://howlerjs.com) to implement basic features about audio such as playing/pausing, scrubbing and displaying the current duration.
- Using [Vee-validate](https://vee-validate.logaretm.com/v4/) for better form validation.
- Using [Tailwindcss](https://tailwindcss.com) CSS framework to style my site in dark mode.
- Using [Vuex](https://github.com/vuejs/vuex) for state management in Vue.js.
- Using [date-fns](https://date-fns.org) to format dates.
- Using [Font Awesome](https://github.com/FortAwesome/Font-Awesome) to display beautiful icons on the website

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Store API Key in .env.local file and save
```
VUE_APP_FIREBASE_API_KEY='XXXXXXXXXXXXXXXXXXXX'
VUE_APP_FIREBASE_AUTH_DOMAIN='XXXXXXXXXXXXXXXXXXXX'
VUE_APP_FIREBASE_PROJECT_ID='XXXXXXXXXXXXXXXXXXXX'
VUE_APP_FIREBASE_STORAGE_BUCKET='XXXXXXXXXXXXXXXXXXXX'
VUE_APP_FIREBASE_MESSAGING_SENDER_ID='XXXXXXXXXXXXXXXXXXXX'
VUE_APP_FIREBASE_APP_ID='XXXXXXXXXXXXXXXXXXXX'
```

### or just update @/src/includes/firebase.js to your own account
```
apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "api-key-not-set",
authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "env-not-set",
projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "env-not-set",
storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "env-not-set",
messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "env-not-set",
appId: process.env.VUE_APP_FIREBASE_APP_ID || "env-not-set",
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
