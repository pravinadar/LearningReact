## 1. created vite-react project

## 2. installed the following

    npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

## 3. made the .env file and the .env.sample file

The .env file stores environment variables like API keys, database URLs, and other sensitive information required by the application. It's kept private and is usually added to .gitignore so it doesn't get uploaded to version control, keeping sensitive data secure.
The .env.sample file, on the other hand, is a non-sensitive template of the .env file. It contains placeholder keys but no sensitive information. This allows other developers to know what variables are needed and configure their own .env files without exposing any private data.
Important points 1. whenever we change any environment variable, we need to restart the whole app again in many cases 2. every framework has its own way of declaring and accessing environment variables i.e. react will have a different way of declaring environment variables and vite will have its own way so read documentation for each

## 4. edited .env file

    VITE_APPWRITE_URL="test" and logged it to check if it works

## 5. checkout .env file

## 6. then made the conf (config) folder in which we have the conf.js file

    this is a good practice which should be followed because, sometimes problems can occur while parsing the environment variables so we make a different conf file and have all our important id's already parsed to strings before and then use them in our .env file
    checkout the file

## 7. made the appwrite folder to keep all the appwrite related files

(checkout good practices to avoid vendor lock-in. we'll be doing some of them here)
made the auth.js file in it and made our authentication functions . check out the auth.js file

## 8. made the config.js file in the appwrite folder. check it out

config.js

```jsx
import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, feturedImage, userId, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          feturedImage,
          userId,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite service error :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, feturedImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          feturedImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    // get 1 post
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries // Ca directly use the query or queries here
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketID, fileId);
  }
}

const service = new Service();
export default service;
```

read the docs and made the methods in the class which are pretty much understandable when read

## 9. made the store folder and made store.js in it

## 10. made the authSlice.js in the store folder. Could make it in a separate folder for features.

## 11. Made Header and Footer (just skeleton) and exported them from the index file in components

## 12. Edited App.jsx :

```jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-slate-600">
      <Header />
      <main>Test</main>
      <Footer />
    </div>
  ) : null;
}

export default App;
```

## 13. Wrapped the <App/> around with the redux provider

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

## 14. Made Container.jsx in the container folder to keep everything in it. so in the future if any width or aspect ratio stuff needs to be changed it can be changed easily

## 15. Made the Logo.jsx which is imported in the footer

## 16. made the LogoutButton.jsx

```jsx
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
```

## 17. Edited the Header component

```jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.url)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
```

## 18. made a reusable button component Button.jsx

```jsx
import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 19. Made input.jsx

```jsx
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", placeholder, Classname = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`w-full`}>
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${Classname}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});
```

Below is a detailed explanation of the code snippet, focusing on how the `useId()` hook and `ref` are used, why they are important, and their connection with `useRef()`.

---

### 1. Generating Unique IDs with `useId()`

#### What is `useId()`?

- **Purpose:**  
  The `useId()` hook, introduced in React 18, is used to generate unique IDs. These IDs remain consistent across both client-side and server-side renders, making them especially useful for accessibility and avoiding conflicts.

#### How It Works in the Code:

- **Usage:**

  ```jsx
  const id = useId();
  ```

  This line creates a unique string identifier that is stored in the variable `id`.

- **Application:**  
  The generated `id` is used to link the `<label>` and `<input>` elements:

  - The `<label>` element uses `htmlFor={id}`.
  - The `<input>` element uses `id={id}`.

  This association is crucial for accessibility: when a user clicks the label, the focus automatically shifts to the associated input.

#### Benefits:

- **Accessibility:**  
  Ensures that screen readers and assistive technologies correctly associate the label with the input field.
- **Avoiding Collisions:**  
  Prevents duplicate IDs when the component is rendered multiple times, which is important for maintaining a valid HTML structure.
- **SSR Compatibility:**  
  Guarantees that the IDs match between server-rendered and client-rendered output, preventing potential hydration issues.

---

### 2. Managing Direct DOM Access with Refs

#### What is a Ref?

- **Definition:**  
  A ref in React is an object created by `useRef()` that allows you to directly reference a DOM element or React component instance.

#### How the Ref is Used in the Code:

- **Forwarding the Ref:**  
  The component is wrapped with `React.forwardRef`, which allows it to accept a `ref` from its parent:
  ```jsx
  const Input = React.forwardRef(function Input(
    { label, type = "text", placeholder, Classname = "", ...props },
    ref
  ) {
    // ...
    <input
      // ...
      ref={ref}
      id={id}
    />;
  });
  ```
  The `ref` passed to `Input` is then attached to the `<input>` element. This means that the parent component can directly interact with the DOM node of the `<input>`.

#### Why Use Refs?

- **Direct DOM Interaction:**  
  Refs allow you to bypass React's declarative model when you need to interact directly with a DOM element. For example:
  - **Focusing an Input:** A parent component might call `inputRef.current.focus()` to programmatically set focus.
  - **Scrolling or Animating:** They can be used to scroll to an element or trigger animations.
- **Accessing Child Component Methods/Properties:**  
  Although less common, refs can also be used to access methods or properties on a child component if needed.

#### Connection with `useRef()`:

- **Creating a Ref in a Parent Component:**  
  A parent component would typically create a ref like this:
  ```jsx
  const inputRef = useRef(null);
  ```
- **Passing the Ref:**  
  The ref is then passed to the `Input` component:
  ```jsx
  <Input ref={inputRef} label="Your Label" />
  ```
- **Using the Ref:**  
  Because `Input` is wrapped in `React.forwardRef`, the `inputRef` is forwarded to the `<input>` element. This means that after the component mounts, `inputRef.current` will point directly to the actual DOM node of the `<input>`. This setup is crucial for performing any imperative operations, such as:
  ```jsx
  inputRef.current.focus();
  ```

---

### 3. Summary of Key Points

- **`useId()`:**

  - Generates a unique identifier.
  - Ensures that the label is properly linked to the input for accessibility.
  - Prevents ID collisions, especially when multiple instances of the component are rendered.

- **Refs (`ref` and `useRef()`):**
  - Allow for direct manipulation of the DOM element, bypassing the typical React state and props flow.
  - Enable imperative actions like focusing an input, scrolling, or initiating animations.
  - Are created in the parent component with `useRef()`, passed to the child component via the `ref` attribute, and then forwarded to the appropriate element using `React.forwardRef`.

Together, these techniques help you create accessible, reusable components that can interact directly with the DOM when necessary, while still maintaining the benefits of React's declarative rendering model.

## 20. Made the SelectComponent.jsx

```jsx
import React from "react";

function SelectComponent({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      <div className={`w-full`}>
        {label && <label htmlFor={id} className=""></label>}
        <select
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          ref={ref}
          id={id}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default React.forwardRef(SelectComponent);
// method 2 for forwardRef
```

## 21. Made PostCard.jsx

```jsx
import React from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="w-full h-48 object-cover rounded-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
```

## 22. Made Login.jsx

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "../components/index.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  // understand useForm and how it works

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) {
          dispatch(authLogin(userdata));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
```

### 🔄 Overview of What's Happening

You’re using the `useForm` hook from `react-hook-form` to handle your login form in a **declarative**, **uncontrolled** (default) way, meaning React doesn’t manage the value of each field on every keystroke — it uses refs behind the scenes for better performance.

---

#### ✅ 1. `useForm()` Hook in This Component

```js
const { register, handleSubmit } = useForm();
```

##### 🔍 What it gives you:

| Property       | Purpose                                                             |
| -------------- | ------------------------------------------------------------------- |
| `register`     | Connects inputs to form state and validation                        |
| `handleSubmit` | Wraps your submit function and handles validation before calling it |

---

### ✍️ 2. Using `register(...)`

This is where the form inputs get connected to the `react-hook-form` system.

#### Example:

```jsx
<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  {...register("email", {
    required: true,
    validate: {
      matchPatern: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Email address must be a valid address",
    },
  })}
/>
```

##### ✅ What's happening here:

- `register("email", {...})`:
  - Registers the input with the name `"email"`
  - Attaches **validation rules** (`required`, `validate`)
- `...register(...)` spreads the returned props into the `<Input>` (likely includes `ref`, `onChange`, `onBlur`, etc.)
- These props allow `react-hook-form` to track the input **without requiring React state**.

### 🔒 Password field:

```jsx
<Input
  label="Password"
  type="password"
  placeholder="Enter your password"
  {...register("password", {
    required: true,
  })}
/>
```

Simple validation — password is required.

---

### 🧠 3. `handleSubmit(login)` — What's Going On?

```js
<form onSubmit={handleSubmit(login)}>
```

#### 🔍 Breakdown:

- `handleSubmit`:
  - Handles validation **before** running your `login` function.
  - If the fields fail validation → the form won’t submit.
  - If everything is valid → it passes the form values as an object to `login`.

---

### 🔐 4. The `login` Function

```js
const login = async (data) => {
    // data is the object: { email: "...", password: "..." }
```

This gets the validated input data directly from `handleSubmit`. You don't have to write `useState` for each field or manually manage `onChange` events. Super clean.

---

### 🎯 Data Flow Summary

```
User types email/password
   ↓
register(...) tracks value and validation via refs (no re-renders)
   ↓
User clicks "Sign In"
   ↓
handleSubmit(login) runs validation based on register rules
   ↓
If valid → passes form data to login()
         → handles authService login
         → dispatches login info to Redux
         → navigates to home page
```

---

### 🔍 Why use `...register()`?

Because it:

- Connects the input to `react-hook-form`'s internal form state
- Automatically handles:
  - `value`
  - `onChange`
  - `onBlur`
  - `ref`

**You don’t need to manually write:**

```jsx
value={form.email}
onChange={handleEmailChange}
ref={someRef}
```

---

### 🧼 Benefits of `useForm` Here

- 💨 **Performance:** No re-renders on each keystroke
- 🔍 **Built-in validation** support
- 🔁 **Less boilerplate**: No need for `useState` or manual validation
- 🧘🏽‍♂️ **Cleaner code**

---

### ✅ Bonus: You Could Also Access Errors

If you wanted to show error messages, you can also do:

```js
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

And then:

```jsx
{
  errors.email && <p className="text-red-500">{errors.email.message}</p>;
}
```
