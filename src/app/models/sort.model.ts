export class Sort {
    constructor(
        public ascending?: boolean,
        public descending?: boolean,
        public direction?: string,
        public ignoreCase?: boolean,
        public nullHandling?: boolean,
        public property?: string
    ) { }
}
