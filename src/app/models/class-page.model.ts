import { Sort } from "./sort.model";
import { Class } from "./class.model";

export class ClassPage {
    constructor(
        public content?: Class[],
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
