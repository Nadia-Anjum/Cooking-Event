import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import { sessionStorage } from "../services/session.server";
import mongoose from "mongoose";

export async function loader({ request }) {
  // Retrieve error message from session if present
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // Get the error message from the session
  const error = session.get("sessionErrorKey");
  return json({ error }); 
}

export default function SignUp() {
    // if i got an error it will come back with the loader dxata
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);

    return (
      <div id="sign-up-page" className="page">
        <h1>Sign Up</h1>
        <Form id="sign-up-form" method="post">
        
      <div className="input-group">
        <div className="input-field">
         <label htmlFor="name">Name</label>
         <input id="name" 
         type="text" 
         name="name" 
         aria-label="name" 
         placeholder="Type your name..." 
         required />
        </div>

        <div className="input-field">
        <label htmlFor="lastname">Last Name</label>
        <input id="lastname" 
        type="text" 
        name="lastname" 
        aria-label="lastname" 
        placeholder="Type your last name..." 
        required />
        </div>
      </div>

        <label htmlFor="mail">Mail</label>
        <input id="mail" 
        type="email" 
        name="mail" 
        aria-label="mail" 
        placeholder="Type your mail..." 
        required />

        <label htmlFor="password">Password</label>
        <input id="password" 
        type="password" 
        name="password" 
        aria-label="password" 
        placeholder="Type your password..." 
        autoComplete="current-password"/>
          
          <div className="btns">
            <button>Sign up</button>
          </div>
          <div className="error-message">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
        </Form>
        <p  style={{textAlign: 'center'}}>
        Already have an account? <NavLink to="/signin"><b>Sign in here.</b></NavLink>
      </p>
      </div>
    );
  }

  export async function action({ request }) {
    const formData = await request.formData(); 
    const newUser = Object.fromEntries(formData); // convert the form data to an object

    // Validate user input
    if (!newUser.mail || !newUser.mail.trim().includes('@') || !newUser.mail.trim().includes('.')) {
      // Store the error message in the session
      const session = await sessionStorage.getSession(request.headers.get("Cookie"));
      session.set("sessionErrorKey", { message: "Invalid email address" });
      const cookie = await sessionStorage.commitSession(session);
      return redirect("/signup", { headers: { "Set-Cookie": cookie } });
    }

    if (!newUser.password || newUser.password.trim().length < 8 || !/[a-z]/i.test(newUser.password.trim()) || !/[0-9]/.test(newUser.password.trim())) {
      // Store the error message in the session
      const session = await sessionStorage.getSession(request.headers.get("Cookie"));
      session.set("sessionErrorKey", { message: "Password must be at least 8 characters long and contain at least one letter and one number" });
      const cookie = await sessionStorage.commitSession(session);
      return redirect("/signup", { headers: { "Set-Cookie": cookie } });
    }

    const result = await mongoose.models.User.create(newUser); 

    // If the user is created successfully redirect to /signin
    if (result) {
      return redirect("/signin");
    } else {
      return redirect("/signup");
    }
  }
 
 