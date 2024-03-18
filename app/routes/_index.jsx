import { redirect } from "@remix-run/node";

export const meta = () => {
  return [{ title: "Cooking classes" }];
};

export async function loader() {
  return redirect("/events");
}
