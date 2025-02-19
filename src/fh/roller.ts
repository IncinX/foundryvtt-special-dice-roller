import Mustache from 'mustache';
import {countMatches} from '../arrays';
import {combineAll} from '../lang';
import {RandomNumberGenerator} from '../rng';
import {combineRolls, Roll, rollDie, Roller} from '../roller';
import base from '../template';
import {DieRollView} from '../view';
import {
    Dice,
    DicePool,
    dieRollImages,
    Faces,
    interpretResult,
    parseRollValues,
    RollValues,
    rollValuesMonoid,
    HERO_ROLL_TABLE,
    SUPERIOR_ROLL_TABLE,
    ENHANCED_ROLL_TABLE,
    NORMAL_ROLL_TABLE,
    BAD_ROLL_TABLE,
    TERRIBLE_ROLL_TABLE,
    SUPERIOR_DEFENSE_ROLL_TABLE,
    DEFENSE_ROLL_TABLE,
    WOUND_ROLL_TABLE,
    GUARANTEED_WOUND_ROLL_TABLE,
} from './dice';
import {SimpleParser} from './parser';
import tpl from './template';

export class FHRoller extends Roller<Dice, Faces, DicePool> {

    constructor(private rng: RandomNumberGenerator, command: string) {
        super(command, [new SimpleParser()], true, false);
    }

    public roll(pool: DicePool): Roll<Dice, Faces>[] {
        return [
            ...rollDie(pool.hero, Dice.HERO, HERO_ROLL_TABLE, this.rng),
            ...rollDie(pool.superior, Dice.SUPERIOR, SUPERIOR_ROLL_TABLE, this.rng),
            ...rollDie(pool.enhanced, Dice.ENHANCED, ENHANCED_ROLL_TABLE, this.rng),
            ...rollDie(pool.normal, Dice.NORMAL, NORMAL_ROLL_TABLE, this.rng),
            ...rollDie(pool.bad, Dice.BAD, BAD_ROLL_TABLE, this.rng),
            ...rollDie(pool.terrible, Dice.TERRIBLE, TERRIBLE_ROLL_TABLE, this.rng),
            ...rollDie(pool.superiorDefense, Dice.SUPERIOR_DEFENSE, SUPERIOR_DEFENSE_ROLL_TABLE, this.rng),
            ...rollDie(pool.defense, Dice.DEFENSE, DEFENSE_ROLL_TABLE, this.rng),
            ...rollDie(pool.guaranteedWound, Dice.GUARANTEED_WOUND, GUARANTEED_WOUND_ROLL_TABLE, this.rng),
            ...rollDie(pool.wound, Dice.WOUND, WOUND_ROLL_TABLE, this.rng),
        ];
    }

    public combineRolls(rolls: Roll<Dice, Faces>[]): RollValues {
        const results = rolls
            .map((roll) => parseRollValues(roll));
        return combineAll(results, rollValuesMonoid);
    }

    public toRoll(die: number, face: number): Roll<Dice, Faces> {
        return new Roll(die, face);
    }

    public formatRolls(rolls: Roll<Dice, Faces>[], flavorText?: string): string {
        const combinedRolls = combineRolls(rolls, parseRollValues, rollValuesMonoid);
        return Mustache.render(
            base,
            {
                system: this.command,
                canReRoll: this.canReRoll,
                canKeep: this.canKeep,
                flavorText,
                rolls: rolls.map((roll) => new DieRollView(roll, dieRollImages)),
                results: interpretResult(combinedRolls),
                rollIndex(): number {
                    return rolls.indexOf(this);
                },
            },
            {interpretation: tpl},
        );
    }

    protected toDicePool(dice: Dice[]): DicePool {
        const hero = countMatches(dice, (die) => die === Dice.HERO);
        const superior = countMatches(dice, (die) => die === Dice.SUPERIOR);
        const enhanced = countMatches(dice, (die) => die === Dice.ENHANCED);
        const normal = countMatches(dice, (die) => die === Dice.NORMAL);
        const bad = countMatches(dice, (die) => die === Dice.BAD);
        const terrible = countMatches(dice, (die) => die === Dice.TERRIBLE);
        const superiorDefense = countMatches(dice, (die) => die === Dice.SUPERIOR_DEFENSE);
        const defense = countMatches(dice, (die) => die === Dice.DEFENSE);
        const guaranteedWound = countMatches(dice, (die) => die === Dice.GUARANTEED_WOUND);
        const wound = countMatches(dice, (die) => die === Dice.WOUND);
        return new DicePool(hero, superior, enhanced, normal, bad, terrible, superiorDefense, defense, guaranteedWound, wound);
    }

}
