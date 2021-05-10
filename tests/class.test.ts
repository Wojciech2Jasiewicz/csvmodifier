import { processCsv } from "../src/process-csv"
import { ApiData } from "../src/api-data"
import { InputCsv } from "../src/input-csv"
import { OutputCsv } from "../src/output-csv"

import * as path from "path"

test("Api data test", () => {
    expect(() => new ApiData({ account_id: -1, created_on: "sds", status: "2011-01-12" })).toThrowError(Error)
    expect(() => new ApiData({ account_id: 0.1, created_on: "sds", status: "good" })).toThrowError(Error)
    expect(() => new ApiData({ account_id: 1, created_on: "2011-01-12", status: "good" })).not.toThrowError(Error)
})

test("Input csv test", () => {
    expect(() => new InputCsv({ "Account ID": -1, "Account Name": "dsd", "Created On": "2011-01-12", "First Name": "John" })).toThrowError(Error)
    expect(() => new InputCsv({ "Account ID": 0.1, "Account Name": "dsd", "Created On": "2011-01-12", "First Name": "John" })).toThrowError(Error)
    expect(() => new InputCsv({ "Account ID": 1, "Account Name": "", "Created On": "2011-01-12", "First Name": "John" })).toThrowError(Error)
    expect(() => new InputCsv({ "Account ID": 1, "Account Name": "dsd", "Created On": "kkkk", "First Name": "John" })).toThrowError(Error)
    expect(() => new InputCsv({ "Account ID": 1, "Account Name": "dsd", "Created On": "2011-01-12", "First Name": "" })).toThrowError(Error)
    expect(() => new InputCsv({ "Account ID": 1, "Account Name": "dsd", "Created On": "2011-01-12", "First Name": "John" })).not.toThrowError(Error)
})

test("Output csv test", () => {

    const apiData = new ApiData({
        account_id: 1, created_on: "2011-04-12", status: "good"
    })

    const inputCsv = new InputCsv({
        "Account ID": 1, "Account Name": "dsd", "Created On": "2011-01-12", "First Name": "John"
    })

    const outputCsv = new OutputCsv(inputCsv, apiData)

    expect(outputCsv.accountId).toBe(1)
    expect(outputCsv.firstName).toBe("John")
    expect(outputCsv.createdOn).toBe("2011-01-12")
    expect(outputCsv.status).toBe("good")
    expect(outputCsv.statusSetOn).toBe("2011-04-12")
})