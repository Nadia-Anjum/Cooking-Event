import mongoose from "mongoose";

export default async function seedDb() {
  const eventCount = await mongoose.models.Event.countDocuments();
  if (eventCount === 0) {
    console.log("Seeding database...");
    insertData();
  }
}

async function insertData() {
  const events = [
    {
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 0,
      caption: "Unlock the art of mexican cuisine at our cooking event!", 
      title: "Mexican cooking event",
      location: "Copenhagen, Denmark",
      date: new Date("2024-01-03"),
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1665394004212-0d014eb6da68?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 20,
      caption: "Experience the fusion of flavor and wellness at our gourmet cooking class for nutritious meals!", 
      title: "A healthy meal for a healthy life",
      location: "Copenhagen, Denmark",
      date: new Date("2024-01-04"),
    },
    {
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: 30,
      caption: "Brunch time! get ready to learn how to make the best brunch ever!", 
      title: "Good brunch for good people",
      location: "Copenhagen, Denmark",
      date: new Date("2024-01-06"),
    },
  ];
  await mongoose.models.Event.insertMany(events);

  const users = [
    {
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mail: "john@doe.dk",
      name: "John Doe",
      lastname: "Doe2",
      title: "Chef",
      password: "password",
    },
  ];
  await mongoose.models.User.insertMany(users);
}
