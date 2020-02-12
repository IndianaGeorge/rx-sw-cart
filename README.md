# rx-sw-cart
A Sample React app using RxJS and react-rxjs-tools (and SWAPI as a backend).

## About this code

### What does it do?
It's a shopping app for Star Wars vehicles, with a search field, a detail view and a cart. It makes calls to SWAPI for info, and the checkout button does nothing. It's not meant to be useful, unless you're studying the code.

### Why?
This shows a nice way to organize code using RxJS and react-rxjs-tools in a way that approaches MVC.

### How?
- src/Controller contains pure **business logic** classes (**state** and **methods to modify it**), so they're easier to debug and harder to break during UI refactors. These are the *controllers*.
- src/Context contains **React Contexts** to enable sharing a single instance of the controllers (**shared state**) between many UI components. This is the *glue*.
- src/UI contains **pure UI (React) components**, *whose only local state is for display purposes*. Any changes to shared state are made via calls to the controllers through the Context API, which updates the RxJS streams, which triggers a render with the new shared state via react-rxjs-tools. These are the *views*.
- The ***free SWAPI server*** is the backend, so *don't abuse it*. That's the model (though there's a phantom model between the controllers and the views).

### You could add this feature!
This project only showcases a way of working, so no features will be added unless I intend on showing how to implement them. The app itself is the simplest case for using RxJS I could imagine where it would make a difference.

### Your tests are wrong
This area is in progress. Send a PR and I'll check it out.

## Using this code

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

Launches the test runner in the interactive watch mode, with coverage reporting.<br />
This is slower than regular testing.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from the project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into the project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
