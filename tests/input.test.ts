import { processCsv } from "../src/process-csv"
import { join } from "path"

test("Invalid args", async () => {
    await processCsv([]).catch(e => expect(e.message).toMatch('Input file is required'))

    const in0 = ''
    await processCsv([in0]).catch(e => expect(e.message).toMatch(`File ${in0} doesn't exist`))

    const in1 = 'kfjdkfjdk/dskds'
    await processCsv([in1]).catch(e => expect(e.message).toMatch(`File ${in1} doesn't exist`))

    await processCsv(["input.csv", "output.csv", "arg1", "arg2"]).catch(e => expect(e.message).toMatch('Too much arguments'))
})

test("Too mach columns", async () => {

    await processCsv([
        join(__dirname, 'data/input0.csv'),
        join(__dirname, "data/output0.csv")
    ]).catch(e => expect(e.message).toMatch(`"Additional" is not allowed`))
})

test("Missing column", async () => {

    await processCsv([
        join(__dirname, 'data/input1.csv'),
        join(__dirname, "data/output1.csv")
    ]).catch(e => expect(e.message).toMatch(`"Account Name" is required`))
})

test("Invalid values", async () => {

    await processCsv([
        join(__dirname, 'data/input2.csv'),
        join(__dirname, "data/output2.csv")
    ]).catch(e => expect(e.message).toMatch(`"Account ID" must be an integer`))

    await processCsv([
        join(__dirname, 'data/input3.csv'),
        join(__dirname, "data/output3.csv")
    ]).catch(e => expect(e.message).toMatch(`"Account Name" length must be at least 2 characters long`))

    await processCsv([
        join(__dirname, 'data/input4.csv'),
        join(__dirname, "data/output4.csv")
    ]).catch(e => expect(e.message).toMatch(`"First Name" length must be at least 2 characters long`))

    await processCsv([
        join(__dirname, 'data/input5.csv'),
        join(__dirname, "data/output5.csv")
    ]).catch(e => expect(e.message).toMatch(`"Created On" must be in YYYY-MM-DD format`))

}, 10000)

test("Fake Account id", async () => {
    await processCsv([
        join(__dirname, 'data/input6.csv'),
        join(__dirname, "data/output6.csv")
    ]).catch(e => expect(e.message).toMatch(/(Fake account id: \d+)|(Request failed with status code \d+)/))
})

