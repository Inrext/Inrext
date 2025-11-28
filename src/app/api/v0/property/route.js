
import { connectToDatabase } from "../../../../lib/mongodb";
import Property from "../../../../models/Property";

export async function GET(request) {
	await connectToDatabase();
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get('page')) || 1;
	const limit = parseInt(searchParams.get('limit')) || 100;
	const parentOnly = searchParams.get('parentOnly') === 'true';
	const search = searchParams.get('search') || "";

	const query = { isActive: true };
	if (parentOnly) query.parentId = null;
	if (search) {
		query.$or = [
			{ projectName: { $regex: search, $options: "i" } },
			{ builderName: { $regex: search, $options: "i" } },
			{ location: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } },
			{ propertyName: { $regex: search, $options: "i" } }
		];
	}
	const skip = (page - 1) * limit;
	const properties = await Property.find(query)
		.skip(skip)
		.limit(limit)
		.sort({ createdAt: -1 })
		.lean();
	const total = await Property.countDocuments(query);
	const data = {
		success: true,
		data: properties,
		pagination: {
			totalItems: total,
			currentPage: page,
			itemsPerPage: limit,
			totalPages: Math.ceil(total / limit),
			hasNextPage: page < Math.ceil(total / limit),
			hasPrevPage: page > 1
		}
	};
	return new Response(JSON.stringify(data), {
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
