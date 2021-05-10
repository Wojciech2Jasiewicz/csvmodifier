
#Introduction
This program provides you merging your input csv with the data from the following api: [acounts api](http://interview.wpengine.io/v1/accounts/). The output will be a different cvs file.

#Requirements
- Nodejs version: 12.14.1
- Npm version: 6.13.4
- OS: Windows, Linux, MacOs

#Setup
In order to do a setup, go through the fillowing seteps:
- Download the repository
- Move the repository to the most convienient loacalization
- go inside the CSVMODIFIER folder
- enter `npm install`

#How to use

`~` - directory where the CSVMODIFIER was downloaded

In order to run that program go to `~/CSVMODIFIER/` and enter the following command:
`./wpe_merge <inputfile> <outputfile>`
- ininputfile: indicates where input file is located
- outputfile: indicates where output file will becreated

The `outputfile` is optional. If you don't provide it, then your output file will have the following path `~/CSVMODIFIER/output.csv`

#Tests

`~` - directory where the CSVMODIFIER was downloaded

The tests are located in `~/CSVMODIFIER/tests`. There are 2 test files. One of them is `class.test.ts`. This one includes all test realted to modules (`InputCsv`, `OutputCsv`, `ApiData`). The file `input.test.ts` includes all tests related to invalid input files. These input files are located in `~/CSVMODIFIER/tests/data`
