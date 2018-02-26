import { Role } from "./role.model";
import { Sort } from "./sort.model";

export class RolesPage {
    constructor(
        public content?: Role[],
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
