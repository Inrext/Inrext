import { connectToDatabase } from "../../../../../lib/mongodb";
import Property from "../../../../../models/Property";
import mongoose from "mongoose";

export async function GET(request, context) {
  await connectToDatabase();
  const params = await context.params;
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ success: false, message: "Property id or slug is required" }), { status: 400 });
  }

  let query = [
    { slug: id },
    { name: { $regex: new RegExp(`^${id.replace(/-/g, " ")}$`, "i") } },
    { projectName: { $regex: new RegExp(`^${id.replace(/-/g, " ")}$`, "i") } }
  ];
  // Only add _id if id is a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    query.unshift({ _id: id });
  }

  // If isActive is not present in the schema, fallback to not filtering by isActive
  let property;
  try {
    // Try to filter by isActive if the field exists
    property = await Property.findOne({
      $or: query,
      isActive: true
    }).lean();
    // If not found, try without isActive filter (for legacy data)
    if (!property) {
      property = await Property.findOne({ $or: query }).lean();
    }
  } catch (e) {
    // Fallback: try without isActive filter if error
    property = await Property.findOne({ $or: query }).lean();
  }

  // If minSize/sizeUnit missing for main project, try to get from a sub-property
  if (property && (!property.minSize || !property.sizeUnit) && property._id && property.propertyType === 'project') {
    const sub = await Property.findOne({ parentId: property._id, minSize: { $exists: true, $ne: null } }, { minSize: 1, sizeUnit: 1 }).lean();
    if (sub) {
      if (!property.minSize && sub.minSize) property.minSize = sub.minSize;
      if (!property.sizeUnit && sub.sizeUnit) property.sizeUnit = sub.sizeUnit;
    }
  }

  if (!property) {
    return new Response(JSON.stringify({ success: false, message: "Property not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ success: true, data: property }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.NEXTAUTH_URL || "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }
  });
}
