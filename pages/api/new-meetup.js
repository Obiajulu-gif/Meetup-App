import { MongoClient, ServerApiVersion } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const uri =
			"mongodb+srv://emmanuel:26062001Mongodb@cluster0.0kmmz.mongodb.net/?retryWrites=true&w=majority";
		const dbName = "meetup";

		let client;

		try {
			client = await MongoClient.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				serverApi: {
					version: ServerApiVersion.v1,
					strict: true,
					deprecationErrors: true,
				},
				connectTimeoutMS: 10000, // Timeout in milliseconds
			});

			const db = client.db(dbName);
			const meetupsCollection = db.collection("meetups");

			const result = await meetupsCollection.insertOne(data);
			console.log(result);

			res.status(201).json({ message: "Meetup inserted!" });
		} catch (error) {
			console.error("Failed to insert meetup:", error);
			res.status(500).json({ message: "Failed to insert meetup" });
		} finally {
			if (client) {
				await client.close();
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
