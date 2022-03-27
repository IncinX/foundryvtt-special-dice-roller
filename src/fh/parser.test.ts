
import {parseFormula} from '../parser';
import {SimpleParser} from './parser';

const parsers = [new SimpleParser()];

test('it should fail to parse a roll formula', () => {
    const msg = 'Incorrect roll formula 1dx + 4ds! Usage: Any combination of the following letters: h, s, e, n, b, t, +, d, w (h = hero, s = superior, e = enhanced, n = normal, b = bad, t = terrible, + = superior defense, d = defense, w = wounds). To roll multiple dice simply add multiple letters or prepend a number, e.g.: c3ba';
    expect(() => parseFormula('1dx + 4ds', parsers)).toThrow(msg);
});
/*
test('it should parse a sky jedi roll formula', () => {
    const result = parseFormula('wwbbsrs', parsers);
    expect(result.rings).toBe(3);
    expect(result.skills).toBe(4);
});

test('it should parse a sky jedi with numbers roll formula', () => {
    const result = parseFormula('ww3bbsrs', parsers);
    expect(result.rings).toBe(5);
    expect(result.skills).toBe(4);
});

test('it should parse a sky jedi with numbers roll formula', () => {
    const result = parseFormula('30ww3bbsrs', parsers);
    expect(result.rings).toBe(5);
    expect(result.skills).toBe(33);
});
*/