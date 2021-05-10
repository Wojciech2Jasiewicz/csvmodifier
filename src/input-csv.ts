const joi = require('joi')
    .extend(require('@joi/date'));

export class InputCsv {
    private static schema = joi.object({
        "Account ID": joi.number().integer().min(0).required(),
        "Account Name": joi.string().min(2).required(),
        "First Name": joi.string().min(2).required(),
        "Created On": joi.date().format("YYYY-MM-DD").required()
    })

    constructor(public inputObj: { "Account ID": number, "Account Name": string, "First Name": string, "Created On": string }) {
        const result = InputCsv.schema.validate(inputObj)
        if (result.error !== undefined) {
            throw new Error(result.error.message);
        }
    }
}