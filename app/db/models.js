import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;


// ========== models ========== //

const eventSchema = new Schema(
  {
    title: String,
    date: String,
    time: String,
    location: String,
    image: String,
    caption: String,
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //New field for attendees
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {timestamps: true},
);


const userSchema = new mongoose.Schema(
  {
    image: String,
    mail: {
      type: String,
      required: true, // Ensure user emails are required
      unique: true // Ensure user emails are unique
    },
    name: String,
    lastname: String,
    title: String,
    password: {
      type: String,
      required: true, // Ensure user passwords are required
      select: false // Automatically exclude from query results
    },
    eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // New field for events attending
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true },
);

// pre save password hook
userSchema.pre("save", async function (next) {
  const user = this; // this refers to the user document

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next(); // continue
  }

  const salt = await bcrypt.genSalt(10); // generate a salt
  user.password = await bcrypt.hash(user.password, salt); // hash the password
  next(); // continue
});


// For each model you want to create, please define the model's name, the
// associated schema (defined above), and the name of the associated collection
// in the database (which will be created automatically).
export const models = [
  {
    name: "Event",
    schema: eventSchema,
    collection: "event",
  },
  {
    name: "User",
    schema: userSchema,
    collection: "user",
  },
  {
    name: "Comment",
    schema: commentSchema,
    collection: "comment",
  },
];