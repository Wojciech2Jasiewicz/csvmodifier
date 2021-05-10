import axios from "axios"
import * as path from "path"
import { Transform } from "stream"

import { ApiData } from "./api-data"
import { InputCsv } from "./input-csv"
import { OutputCsv } from "./output-csv"

const ac = axios.create({
    baseURL: "http://interview.wpengine.io/v1"
})

async function sleep(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs);
    });
}

export class MergeCsv extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true })
    }

    async _transform(chunk: any, encoding: string, done: any) {
        try {
            const input = new InputCsv(chunk)
            const id = input.inputObj["Account ID"]
            const data: any = (await ac.get(`accounts/${id}`)).data
            if (data?.detail === "Not found.") {
                throw new Error(`Fake account id: ${id}`)
            }
            const apiData = new ApiData(data)
            const out = new OutputCsv(input, apiData)
            this.push(out)
            done()

        } catch (error) {
            done(error)
        }
    }
}

