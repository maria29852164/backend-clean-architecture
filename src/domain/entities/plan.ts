
export class Plan {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public priceCents: number,
        public durationDays: number, // duración en días
    ) {}
}
