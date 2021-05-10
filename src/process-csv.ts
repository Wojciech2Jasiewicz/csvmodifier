import * as fs from "fs"
import { join } from 'path'
import csvparser from "csv-parser"
import * as util from "util"
import { pipeline } from "stream"

import { SaveCsv } from './save-csv'
import { MergeCsv } from './merge-csv'
import { OutputCsv } from "./output-csv"

const maxnumberOfArgs = 2

const AsyncPipeline = util.promisify(pipeline)

export async function processCsv(args: string[]) {

    if (args.length > maxnumberOfArgs) {
        throw new Error("Too much arguments")
    }
    // validate input file
    const inputPath = args[0]
    if (inputPath === undefined) {
        throw new Error("Input file is required")
    }
    if (!fs.existsSync(inputPath)) {
        throw new Error(`File ${inputPath} doesn't exist`)
    }

    // handels missing output path
    let outputPath = args[1]
    if ((outputPath === undefined) || (!fs.existsSync(outputPath))) {
        outputPath = join(__dirname, '../output.csv')
    }

    await AsyncPipeline([
        fs.createReadStream(inputPath),
        csvparser(),
        new MergeCsv(),
        new SaveCsv(outputPath, OutputCsv.heder)
    ])
}