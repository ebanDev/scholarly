# Scholarly

A Node.js module to fetch and parse academic articles from Google Scholar.

Fork based on the original [scholarly](https://github.com/ukalwa/scholarly]) module by [Upender Kalwa](https://github.com/ukalwa), modified to use `fetch` instead of `axios`, removing citations search as it is now behind a login wall.

## Installation

```bash
npm install scholarly --save
# or
yarn add scholarly
```

## Usage

### Javascript

```javascript
use "strict";

var scholarly = require("scholarly");

// To search for a specific topic
scholarly.search("machine learning").then((data) => {
  console.log(data);
});
```

### Typescript

```typescript
import { search, user } from "scholarly";

console.log(search("machine learning"));
```

### Output

The search would result in a list of articles.

#### Search query output format

```code
[
  ...
  {
    title: 'Machine-learning research',
    url:
     'https://www.aaai.org/ojs/index.php/aimagazine/article/view/1324',
    authors: [ 'TG Dietterich' ],
    year: 1997,
    numCitations: 1826,
    description:
     'Abstract Machine-learning research has been making great progress in many directions. This article summarizes four of these directions and discusses some current open problems. The four directions are (1) the improvement of classification accuracy by learning ensembles�…',
    pdf:
     'https://www.aaai.org/ojs/index.php/aimagazine/article/view/1324/1225',
    citationUrl:
     'http://scholar.google.com/scholar?cites=10011148559927428233&as_sdt=5,26&sciodt=0,26&hl=en&oe=ASCII',
    relatedUrl:
     'http://scholar.google.com/scholar?q=related:iUQj7JK-7ooJ:scholar.google.com/&scioq=machine+learning&hl=en&oe=ASCII&as_sdt=0,26',
    urlVersionsList:
     'http://scholar.google.com/scholar?cluster=10011148559927428233&hl=en&oe=ASCII&as_sdt=0,26',
    publication: 'aaai.org'
  },
  ...
]

```

## Testing

The module can be tested by running `npm run test`

## Acknowledgements

This project was inspired from other awesome projects ([scholar.py], [google-scholar], and [google-scholar-extended])

[scholar.py]: https://github.com/ckreibich/scholar.py
[google-scholar]: https://github.com/VT-CHCI/google-scholar
[google-scholar-extended]: https://github.com/martinchapman/google-scholar-extended
