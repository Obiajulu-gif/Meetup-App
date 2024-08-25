import React, { Fragment } from "react";
import MeetUpDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import Head from "next/head";
function MeetUpID(props) {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name='description'
					content={props.meetupData.description}
				/>
			</Head>
			<MeetUpDetails
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
}
export async function getStaticPaths() {
	// fetch data from an API
	const uri =
		"mongodb+srv://emmanuel:26062001Mongodb@cluster0.0kmmz.mongodb.net/?retryWrites=true&w=majority";
	const dbName = "meetup";

	let client;
	let result = [];

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

		result = await meetupsCollection.find({}, { _id: 1 }).toArray();
		console.log("Fetch id succesfully");
	} catch (error) {
		console.error("Failed to fetch id meetup:", error);
	} finally {
		if (client) {
			await client.close();
		}
	}

	// this will generate the meetupids from the database and create the pre-rendered pages
	return {
		paths: result.map((meetup) => ({
			params: { meetupid: meetup._id.toString() },
		})),
		fallback: false,
	};
}
export async function getStaticProps(ctx) {
	const meetupId = ctx.params.meetupid;
	const uri =
		"mongodb+srv://emmanuel:26062001Mongodb@cluster0.0kmmz.mongodb.net/?retryWrites=true&w=majority";
	const dbName = "meetup";

	let client;
	let result = [];
	let selectedMeetup;

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

		selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
		console.log("Fetch details succesfully");
	} catch (error) {
		console.error("Failed to fetch details meetup:", error);
	} finally {
		if (client) {
			await client.close();
		}
	}


	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetUpID;
