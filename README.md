# 🎓 @ebandev/scholarly

A library to query and parse academic articles from Google Scholar. 

A form based in the original work of ukwala's [scholarly](https://github.com/ukalwa/scholarly).

![npm](https://img.shields.io/npm/v/@ebandev/scholarly)
![MIT](https://img.shields.io/github/license/ebandev/scholarly)

## Description

This library allows you to search for academic articles on Google Scholar and parse the results. It is written in TypeScript and uses Cheerio for parsing and Axios for making HTTP requests.

## Installation

You can install this package using yarn or npm:

```bash
# Using yarn
yarn add @ebandev/scholarly

# Using npm
npm install @ebandev/scholarly
```

## Usage
Here is a basic example of how to use this library:

```typescript
import * as scholarly from "@ebandev/scholarly";

async function searchArticles() {
  const results = await scholarly.search("your search query");
  console.log(results);
}

searchArticles();
```

## Testing

This project uses Ava for testing. You can run the tests with the following command:

```bash
yarn test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.

## License

[MIT](https://choosealicense.com/licenses/mit/)