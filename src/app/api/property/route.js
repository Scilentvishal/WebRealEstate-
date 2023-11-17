import db from "@/lib/db";
import { varifyJwtToken } from "@/lib/jwt";
import Property from "@/models/Property";

export async function GET(res) {
  await db();

  try {
    const properties = await Property.find({})
      .limit(16)
      .populate("currentOwner");
    console.log(properties);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await db();

  const accessToken = req.headers.get("Authorization");

  console.log(accessToken)
  const token = accessToken.split(" ")[1];
  
  console.log(`token: ${token}`)
  
  const decodedToken = varifyJwtToken(token);

  console.log(decodedToken)

  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: "unauthorized request" }), {
      status: 500,
    });
  }

  try {
    const body = await req.json();
    const newProperty = await Property.create(body);

    return new Response(JSON.stringify(newProperty), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
