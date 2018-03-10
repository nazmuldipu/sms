import { Sort } from "./sort.model";
import { SMS } from "./sms.model";

export class SMSPage {
    constructor(
        public content?: SMS[],
        public first?: boolean,
        public last?: boolean,
        public number?: number,
        public numberOfElements?: number,
        public size?: number,
        public sort?: Sort[],
        public totalElements?: number,
        public totalPages?: number
    ) { }
}
