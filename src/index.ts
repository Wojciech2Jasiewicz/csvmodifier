import * as fs from "fs"
import { processCsv } from "./process-csv"

async function sleep(timeMs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMs);
    });
}

(async function main() {

    try {
        const args = process.argv.slice(2)
        await processCsv(args)

    }
    catch (error) {
        console.log(error)
        sleep(2000)
        process.exit(1)
    }
})()


