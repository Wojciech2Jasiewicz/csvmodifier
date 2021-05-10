import { Transform } from "stream"
import { createObjectCsvWriter } from "csv-writer"

export class SaveCsv extends Transform {

    private csvWriter = null as any

    constructor(outputFile: string, header: Array<{ id: string, title: string }>, options = {}) {
        super({ ...options, objectMode: true })
        this.csvWriter = createObjectCsvWriter({
            path: outputFile,
            header: header
        });
    }

    async _transform(chunk: any, encoding: string, done: any) {
        try {
            await this.csvWriter.writeRecords([chunk])
            this.push(chunk)
            done()

        } catch (error) {
            done(error)
        }
    }
}