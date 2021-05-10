import * as joi from "joi"

export interface ApiDataObject {
    account_id: number
    status: string
    created_on: string
}

export class ApiData {
    private static schema = joi.object({
        account_id: joi.number().integer().min(0).required(),
        status: joi.string().required(),
        created_on: joi.date().required()
    })

    constructor(public apiObj: ApiDataObject) {
        const result = ApiData.schema.validate(apiObj)
        if (result.error !== undefined) {
            throw new Error(result.error.message);
        }
    }
}