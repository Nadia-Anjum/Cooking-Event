// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export let authenticator = new Authenticator(sessionStorage, {
    sessionErrorKey: "sessionErrorKey" // keep in sync
  });

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let mail = form.get("mail");
    let password = form.get("password");
    let user = null;

    if (!mail || mail.trim().length === 0) {
      throw new AuthorizationError("Bad Credentials: Email is required");
    }

    if (!password || password.trim().length === 0) {
      throw new AuthorizationError("Bad Credentials: Password is required");
    }

    user = await verifyUser({ mail, password });
    if (!user) {
      throw new AuthorizationError("User not found");
    }
    
    console.log(user);
    return user;
  }),
  "user-pass"
);
  
  async function verifyUser({ mail, password }) {
    const user = await mongoose.models.User.findOne({ mail }).select("+password");
  if (!user) {
    throw new AuthorizationError("No user found with this email.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AuthorizationError("Invalid password.");
  }
  // Remove the password from the user object before returning it
  user.password = undefined;
  return user;

  }