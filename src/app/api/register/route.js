import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcrypt';

export async function POST(req) {
  await db();
  try {
    const { username, email, password: pass } = await req.json();

    const existingEmailUser = await User.findOne({ email });
    const existingUsernameUser = await User.findOne({ username });

    if (existingEmailUser) {
      return new Response("User with the same email already exists", { status: 501 });
    }

    if (existingUsernameUser) {
      return new Response("User with the same username already exists", { status: 502 });
    }

    const hashPassword = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const { password, ...user } = newUser._doc;

    return new Response(JSON.stringify(user), { status: 201 });

  } catch (error) {
  
    return new Response("Internal Server Error", { status: 500 });
  }
}
