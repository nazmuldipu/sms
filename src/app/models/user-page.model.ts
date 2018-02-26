import { Sort } from "./sort.model";
import { User } from "./user.model";

export class UserPage {
    constructor(
        public content?: User[],
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
