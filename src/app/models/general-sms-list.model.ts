import { GeneralSMS } from "./general-sms.model";

export class GeneralSMSList {
    constructor(
        public message: string,
        public number: number,
        public generalSMSs: GeneralSMS,
      ) { }
}
