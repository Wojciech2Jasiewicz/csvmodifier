
import { ApiData } from "./api-data"
import { InputCsv } from "./input-csv"

export class OutputCsv {

    static heder = [
        { id: 'accountId', title: 'Account ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'createdOn', title: 'Created On' },
        { id: 'status', title: 'Status' },
        { id: 'statusSetOn', title: 'Status Set On' }]

    public accountId: number
    public firstName: string
    public createdOn: string
    public status: string
    public statusSetOn: string

    constructor(public inputObj: InputCsv, public apiObj: ApiData) {

        this.accountId = apiObj.apiObj.account_id
        this.firstName = inputObj.inputObj["First Name"]
        this.createdOn = inputObj.inputObj["Created On"]
        this.status = apiObj.apiObj.status
        this.statusSetOn = apiObj.apiObj.created_on
    }

}