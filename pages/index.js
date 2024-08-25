// our-domain.com
import { MongoClient, ServerApiVersion } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";
function HomePage(props) {
	return (<Fragment>
		<Head>
			<title>React Meetups</title>
			<meta
				name='description'
				content='Browse a huge list of highly active React meetups!'
			/>
		</Head>
		<MeetupList meetups={props.meetups} />;
	</Fragment>);
}

// Creating a Static Site generation
// it pre-rendered the data in the server before sending it to the client
// thereby avoiding the initial rendering from showing the first data
// because our app suppose to render the data the second time it rendered

// the name of the function must be getStaticProps
// and it must be async(waiting for the promise to return)
export async function getStaticProps() {
	// fetch data from an API
	const uri =
		"mongodb+srv://emmanuel:26062001Mongodb@cluster0.0kmmz.mongodb.net/?retryWrites=true&w=majority";
	const dbName = "meetup";

	let client;
	let result = []

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

		result = await meetupsCollection.find().toArray();
		console.log("Fetch succesfully");

	} catch (error) {
		console.error("Failed to fetch meetup:", error);
	} finally {
		if (client) {
			await client.close();
		}
	}
  return {
		props: {
			meetups: result.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(), 
			})),
		},
		revalidate: 1,
	};
}

// export const getServerSideProps = async (ctx) => {
// 	// Fetch data from API
//   const res = ctx.res
//   const req = ctx.req
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// };

export default HomePage;
