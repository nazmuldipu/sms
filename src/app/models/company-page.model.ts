import { Sort } from "./sort.model";
import { Company } from "./company.model";

export class CompanyPage {
    constructor(
        public content?: Company[],
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
