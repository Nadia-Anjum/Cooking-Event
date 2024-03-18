import { Form, useLoaderData, NavLink } from "@remix-run/react";
import { json } from "@remix-run/node";
import { sessionStorage } from "../services/session.server";
import { authenticator } from "../services/auth.server";

export async function loader({ request }) {
 
  await authenticator.isAuthenticated(request, {
    successRedirect: "/events"
  });
  // Retrieve error message from session if present
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // Get the error message from the session
  const error = session.get("sessionErrorKey");
  return json({ error }); 
}

export default function SignIn() {
  // if i got an error it will come back with the loader dxata
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);

  return (
    <div id="sign-in-page" className="page">
      <h1>Sign In</h1>
      <div className="form-container">
      <Form id="sign-in-form" method="post">
        <label htmlFor="mail">Mail</label>
        <input id="mail" 
        type="email" 
        name="mail" 
        aria-label="mail" 
        placeholder="Type your mail..." 
        required />

        <label htmlFor="password">Password</label>
        <input
          id="password" 
          type="password" 
          name="password" 
          aria-label="password" 
          placeholder="Type your password..." 
          autoComplete="current-password"/>
          
        <div className="btns">
          <button className="signinbtn">Sign In</button>
        </div>
        <div className="error-message">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
      </Form>
      <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food img" />
      </div>
      
      <p style={{textAlign: 'center'}}>
        If you do not have an account then sign up here: <NavLink to="/signup"><b>Sign up here</b></NavLink>
      </p>
    </div>
  );
}


export async function action({ request }) {
  
  console.log("handle");
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/events",
    failureRedirect: "/signin"
  });
}