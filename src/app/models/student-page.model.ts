import { Sort } from "./sort.model";
import { Student } from "./student.model";

export class StudentPage {
    constructor(
        public content?: Student[],
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
