# Meetup API

This project provides a simple API for creating new meetup events. It utilizes MongoDB for data storage and is designed to be deployed as part of a Next.js application.

## Features

- **Create Meetup**: Allows clients to create new meetup events by sending a POST request with the event data.

## Getting Started

### Prerequisites

- Node.js
- Nextjs
- MongoDB account and cluster

### Environment Variables

Before running the project, ensure you have the following environment variables set:

- `MONGODB_URI`: Your MongoDB connection string.
- `DB_NAME`: The name of the database you wish to use (e.g., `meetup`).

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
```
2. Install the dependencies:
```sh 
npm install
```
3. Set up your environment variables as described in the Environment Variables section.

4. Run the development server:

```sh
npm run dev
```

API Reference
POST /api/new-meetup
Creates a new meetup event.

**Request Body**
```sh
{
    "name": "Meetup Name",
    "location": "Meetup Location",
    "date": "Meetup Date",
    "description": "Meetup Description"
}
```
**Response**
201 Created on success:
```sh
{
    "message": "Meetup inserted!"
}
```
**Security Considerations**
It's important to never expose your database credentials directly in your code. Always use environment variables to store sensitive information.

**Contributing**
Contributions are welcome! Please feel free to submit a pull request.

**License**
This project is open source and available under the MIT License.

```

This README provides a basic overview of your project, including how to get started, API reference, and security considerations. Adjust the <repository-url> and any other specific details as necessary.