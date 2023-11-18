import db from "@/lib/db";
import { varifyJwtToken } from "@/lib/jwt";
import Property from "@/models/Property";

export async function GET(req, ctx) {
  await db();

  const id = ctx.params.id;

  try {
    const property = await Property.findById(id)
    .populate({
      path: "CurrentOwner",
      select: "-password", // Exclude the 'password' field
    });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, ctx) {
  await db();

  const id = ctx.params.id;
  const accessToken = req.headers.get("Authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = varifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token" }),
      { status: 403 }
    );
  }

  try {
    const body = await resizeBy.json();

    const property = await Property.findById(id).populate("CurrentOwner");

    if (property?.currentOwner?._id.toString() != decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ error: "unauthorized (wrong or expired token" }),
        { status: 403 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await db();

  const id = ctx.params.id;
  const accessToken = req.headers.get("Authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = varifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token" }),
      { status: 403 }
    );
  }

  try {
    const property = await Property.findById(id).populate("CurrentOwner");
    if (
      property?.currentOwner?._id.toString() !== decodedToken._id.toString()
    ) {
      return new Response(
        JSON.stringify({ error: "Only owner can delete his property" }),
        { status: 403 }
      );
    }

    await Property.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Success deleted Property" }), {
      status: 200,
    });
  } catch (error) {
    return Response(JSON.stringify(null), { status: 500 });
  }
}
