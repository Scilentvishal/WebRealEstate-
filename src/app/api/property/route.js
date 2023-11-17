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

  const token = accessToken.split(" ")[1];
  
  const decodedToken = varifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: "unauthorized request" }), {
      status: 500,
    });
  }

  try {
    const body = await req.json();


    const formattedData = {
      CurrentOwner: body.currentOwner, // Assuming the user ID is in the decoded token
      title: String(body.title),
      city: String(body.city),
      propertyType: String(body.propertyType),
      state: String(body.state),
      description: String(body.description),
      image: String(body.img),
      price: Number(body.price),
      size: Number(body.size),
      beds: Number(body.beds),
      phonenumber: body.phonenumber ? Number(body.phonenumber) : undefined, // Only convert if it exists
    };    

    const newProperty = await Property.create(formattedData);

    return new Response(JSON.stringify(newProperty), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
