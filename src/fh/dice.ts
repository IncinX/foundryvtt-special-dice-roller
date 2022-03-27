import {IMonoid} from '../lang';
import {Roll} from '../roller';

export enum Dice {
    HERO,
    SUPERIOR,
    ENHANCED,
    NORMAL,
    BAD,
    TERRIBLE,
    SUPERIOR_DEFENSE,
    DEFENSE,
    GUARANTEED_WOUND,
    WOUND,
}

export enum Faces {
    CRITICAL_SUCCESS,
    DOUBLE_SUCCESS,
    SUCCESS,
    BLANK,
    FAILURE,
    DOUBLE_FAILURE,
    CRITICAL_FAILURE,
    DEFENSE,
    DOUBLE_DEFENSE,
    CRITICAL_DEFENSE,
    WOUND,
}

export const HERO_ROLL_TABLE: Faces[] = [
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.CRITICAL_SUCCESS,
    Faces.CRITICAL_SUCCESS,
];

export const SUPERIOR_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.DOUBLE_SUCCESS,
    Faces.CRITICAL_SUCCESS,
];

export const ENHANCED_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.SUCCESS,
    Faces.CRITICAL_SUCCESS,
];

export const NORMAL_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.BLANK,
    Faces.BLANK,
    Faces.SUCCESS,
    Faces.SUCCESS,
];

export const BAD_ROLL_TABLE: Faces[] = [
    Faces.CRITICAL_FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.BLANK,
    Faces.BLANK,
];

export const TERRIBLE_ROLL_TABLE: Faces[] = [
    Faces.CRITICAL_FAILURE,
    Faces.DOUBLE_FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.FAILURE,
    Faces.BLANK,
];

export const DEFENSE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.DEFENSE,
    Faces.DEFENSE,
    Faces.DEFENSE,
    Faces.CRITICAL_DEFENSE,
];

export const SUPERIOR_DEFENSE_ROLL_TABLE: Faces[] = [
    Faces.BLANK,
    Faces.BLANK,
    Faces.DEFENSE,
    Faces.DOUBLE_DEFENSE,
    Faces.CRITICAL_DEFENSE,
    Faces.CRITICAL_DEFENSE,
];

export const GUARANTEED_WOUND_ROLL_TABLE: Faces[] = [
    Faces.WOUND,
    Faces.WOUND,
    Faces.WOUND,
    Faces.WOUND,
    Faces.WOUND,
    Faces.WOUND,
];

export const WOUND_ROLL_TABLE: Faces[] = [
    Faces.WOUND,
    Faces.WOUND,
    Faces.WOUND,
    Faces.BLANK,
    Faces.BLANK,
    Faces.BLANK,
];

export class DicePool {
    constructor(
        public hero: number = 0,
        public superior: number = 0,
        public enhanced: number = 0,
        public normal: number = 0,
        public bad: number = 0,
        public terrible: number = 0,
        public superiorDefense: number = 0,
        public defense: number = 0,
        public guaranteedWound: number = 0,
        public wound: number = 0,
    ) {
    }

    public toString(): string {
        return `hero: ${this.hero}, superior: ${this.superior}, enhanced: ${this.enhanced}, normal: ${this.normal}, bad: ${this.bad}, terrible: ${this.terrible}, superiorDefense: ${this.superiorDefense}, defense: ${this.defense}, guaranteedWounds: ${this.guaranteedWound}, wounds: ${this.wound}`;
    }
}

export class RollValues {
    constructor(
        public successes: number = 0,
        public crits: number = 0,
        public wounds: number = 0,
    ) {
    }

    public toString(): string {
        return `successes: ${this.successes}, crits: ${this.crits}, wounds: ${this.wounds}`;
    }
}

const heroImages = new Map<Faces, string>();
heroImages.set(Faces.SUCCESS, 'hero-success');
heroImages.set(Faces.SUCCESS, 'hero-success');
heroImages.set(Faces.DOUBLE_SUCCESS, 'hero-successx2');
heroImages.set(Faces.DOUBLE_SUCCESS, 'hero-successx2');
heroImages.set(Faces.CRITICAL_SUCCESS, 'hero-crit');
heroImages.set(Faces.CRITICAL_SUCCESS, 'hero-crit');

const superiorImages = new Map<Faces, string>();
superiorImages.set(Faces.BLANK, 'superior-blank');
superiorImages.set(Faces.SUCCESS, 'superior-success');
superiorImages.set(Faces.SUCCESS, 'superior-success');
superiorImages.set(Faces.SUCCESS, 'superior-success');
superiorImages.set(Faces.DOUBLE_SUCCESS, 'superior-successx2');
superiorImages.set(Faces.CRITICAL_SUCCESS, 'superior-crit');

const enhancedImages = new Map<Faces, string>();
enhancedImages.set(Faces.BLANK, 'enhanced-blank');
enhancedImages.set(Faces.BLANK, 'enhanced-blank');
enhancedImages.set(Faces.SUCCESS, 'enhanced-success');
enhancedImages.set(Faces.SUCCESS, 'enhanced-success');
enhancedImages.set(Faces.SUCCESS, 'enhanced-success');
enhancedImages.set(Faces.CRITICAL_SUCCESS, 'enhanced-crit');

const normalImages = new Map<Faces, string>();
normalImages.set(Faces.BLANK, 'normal-blank');
normalImages.set(Faces.BLANK, 'normal-blank');
normalImages.set(Faces.BLANK, 'normal-blank');
normalImages.set(Faces.BLANK, 'normal-blank');
normalImages.set(Faces.SUCCESS, 'normal-success');
normalImages.set(Faces.SUCCESS, 'normal-success');

const badImages = new Map<Faces, string>();
badImages.set(Faces.CRITICAL_FAILURE, 'bad-crit');
badImages.set(Faces.FAILURE, 'bad-fail');
badImages.set(Faces.FAILURE, 'bad-fail');
badImages.set(Faces.FAILURE, 'bad-fail');
badImages.set(Faces.BLANK, 'bad-blank');
badImages.set(Faces.BLANK, 'bad-blank');

const terribleImages = new Map<Faces, string>();
terribleImages.set(Faces.CRITICAL_FAILURE, 'terrible-crit');
terribleImages.set(Faces.DOUBLE_FAILURE, 'terrible-failx2');
terribleImages.set(Faces.FAILURE, 'terrible-fail');
terribleImages.set(Faces.FAILURE, 'terrible-fail');
terribleImages.set(Faces.FAILURE, 'terrible-fail');
terribleImages.set(Faces.BLANK, 'terrible-blank');

const defenseImages = new Map<Faces, string>();
defenseImages.set(Faces.BLANK, 'defense-blank');
defenseImages.set(Faces.BLANK, 'defense-blank');
defenseImages.set(Faces.DEFENSE, 'defense-success');
defenseImages.set(Faces.DEFENSE, 'defense-success');
defenseImages.set(Faces.DEFENSE, 'defense-success');
defenseImages.set(Faces.CRITICAL_DEFENSE, 'defense-crit');

const superiorDefenseImages = new Map<Faces, string>();
superiorDefenseImages.set(Faces.BLANK, 'superior-defense-blank');
superiorDefenseImages.set(Faces.BLANK, 'superior-defense-blank');
superiorDefenseImages.set(Faces.DEFENSE, 'superior-defense-success');
superiorDefenseImages.set(Faces.DOUBLE_DEFENSE, 'superior-defense-successx2');
superiorDefenseImages.set(Faces.CRITICAL_DEFENSE, 'superior-defense-crit');
superiorDefenseImages.set(Faces.CRITICAL_DEFENSE, 'superior-defense-crit');

const guaranteedWoundImages = new Map<Faces, string>();
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');
guaranteedWoundImages.set(Faces.WOUND, 'wound-wound');

const woundImages = new Map<Faces, string>();
woundImages.set(Faces.WOUND, 'wound-wound');
woundImages.set(Faces.WOUND, 'wound-wound');
woundImages.set(Faces.WOUND, 'wound-wound');
woundImages.set(Faces.BLANK, 'wound-blank');
woundImages.set(Faces.BLANK, 'wound-blank');
woundImages.set(Faces.BLANK, 'wound-blank');

export const dieRollImages = new Map<Dice, Map<Faces, string>>();
dieRollImages.set(Dice.HERO, heroImages);
dieRollImages.set(Dice.SUPERIOR, superiorImages);
dieRollImages.set(Dice.ENHANCED, enhancedImages);
dieRollImages.set(Dice.NORMAL, normalImages);
dieRollImages.set(Dice.BAD, badImages);
dieRollImages.set(Dice.TERRIBLE, terribleImages);
dieRollImages.set(Dice.DEFENSE, defenseImages);
dieRollImages.set(Dice.SUPERIOR_DEFENSE, superiorDefenseImages);
dieRollImages.set(Dice.GUARANTEED_WOUND, guaranteedWoundImages);
dieRollImages.set(Dice.WOUND, woundImages);

const rollToRollResultMapping = new Map<Faces, Partial<RollValues>>();
rollToRollResultMapping.set(Faces.CRITICAL_SUCCESS, {successes: 2, crits: 1});
rollToRollResultMapping.set(Faces.DOUBLE_SUCCESS, {successes: 2});
rollToRollResultMapping.set(Faces.SUCCESS, {successes: 1});
rollToRollResultMapping.set(Faces.BLANK, {successes: 0});
rollToRollResultMapping.set(Faces.FAILURE, {successes: -1});
rollToRollResultMapping.set(Faces.DOUBLE_FAILURE, {successes: -2});
rollToRollResultMapping.set(Faces.CRITICAL_FAILURE, {successes: -2, crits: -1});
rollToRollResultMapping.set(Faces.DEFENSE, {successes: 1});
rollToRollResultMapping.set(Faces.DOUBLE_DEFENSE, {successes: 2});
rollToRollResultMapping.set(Faces.CRITICAL_DEFENSE, {successes: 2, crits: 1});
rollToRollResultMapping.set(Faces.WOUND, {wounds: 1});

export function interpretResult(result: RollValues): RollValues {
    return new RollValues(
        result.successes,
        result.crits,
        result.wounds,
    );
}

export function parseRollValues(roll: Roll<Dice, Faces>): RollValues {
    const result = rollToRollResultMapping.get(roll.face);
    if (result !== undefined) {
        return toRollResult(result);
    } else {
        throw new Error(`Unhandled Face ${roll.face}`);
    }
}

function toRollResult(partial: Partial<RollValues>): RollValues {
    return Object.assign(new RollValues(), partial);
}

export const rollValuesMonoid: IMonoid<RollValues> = {
    identity: new RollValues(),
    combine: (roll1: RollValues, roll2: RollValues) => new RollValues(
        roll1.successes + roll2.successes,
        roll1.crits + roll2.crits,
        roll1.wounds + roll2.wounds,
    ),
};

export const dicePoolMonoid: IMonoid<DicePool> = {
    identity: new DicePool(),
    combine: (roll1: DicePool, roll2: DicePool) => new DicePool(
        roll1.hero + roll2.hero,
        roll1.superior + roll2.superior,
        roll1.enhanced + roll2.enhanced,
        roll1.normal + roll2.normal,
        roll1.bad + roll2.bad,
        roll1.terrible + roll2.terrible,
        roll1.superiorDefense + roll2.superiorDefense,
        roll1.defense + roll2.defense,
        roll1.guaranteedWound + roll2.guaranteedWound,
        roll1.wound + roll2.wound,
    ),
};
