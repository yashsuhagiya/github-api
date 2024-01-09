# GitHub Data API

## Description

This is a simple API that returns data from GitHub. Why? 
There is a limit of 60 requests per hour for unauthenticated requests to the GitHub API. This API caches the data for 12 hour and returns it to the user. This way, the user can make as many requests as they want to this API and the API will handle the rate limiting.
It is written in Node.js and uses the Express framework.

## Installation

1. Clone the repository

```bash
git clone https://github.com/yashsuhagiya/github-api.git
```

2. Install dependencies

```bash
npm install
```

3. Change the username in server.js

```bash
const response = await fetch("https://api.github.com/users/{your-username}/repos");
```

4. Run the server

```bash
npm run dev
```

5. For production, host the server on a cloud platform like Vercel with given vercel.json file

## Usage

The API has one endpoint:

- `/githubdata` - returns the github data for the user

## License

[MIT](/LICENCE)

## Author

[Yash Suhagiya](mailto:yash@patentassist.ai)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
