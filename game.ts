/**
 * Created by Igor on 24.07.2017.
 */

interface IFighter {
    setDamage:(damage: number)=>void;
    hit:(enemy: Fighter, point: number)=>void;
    doubleHit? :(enemy: Fighter, point: number) => void;
}

class Fighter implements IFighter {
    private _name: string;
    private _power: number;
    private _health: number;

    constructor(name: string, power: number = 10, health: number = 400) {
        this._name = name;
        this._power = power;
        this._health = health;
    }

    public hit(enemy: IFighter, point: number): void {
        enemy.setDamage(point * this._power);
    }

    public  setDamage(damage: number): void {
        this._health -= damage;
        let message = this._health > 0 ? `Health : ${this._health}` : `Health : ${this._health = 0}`;
        message += `  ${this._name}`;
        console.log(message);
    }

    public get name(): string {
        return this._name;
    }

    public get health(): number {
        return this._health;
    }

}

class ImprovedFighter extends Fighter {
    doubleHit(enemy: IFighter, point: number) {
        super.hit(enemy, point * 2);
    }

}

let fighter = new Fighter('Batman', 10, 700);
let improvedFighter = new ImprovedFighter('Superman', 10, 300);


class Fight {
    public fight(fighter: Fighter, improvedFighter: ImprovedFighter, ...rest: number[]): void {
        let toggle: boolean = true;
        let exit: boolean = true;
        let isAllNull = rest.every(elem => elem === 0);

        if (isAllNull) {
            return console.log('All point can`t be 0');
        }

        if (rest.length < 2) {
            rest = [10, 10,];
            console.log(`less than 2 points set : default ${rest}`);
        }

        while (exit) {
            for (let point of rest) {
                if (toggle) {
                    fighter.hit(improvedFighter, point);
                } else {
                    improvedFighter.doubleHit(fighter, point);
                }
                if (improvedFighter.health <= 0 || fighter.health <= 0) {
                    let result = toggle ? fighter.name : improvedFighter.name;
                    exit = false;
                    return console.log(result += ' has won');
                }
                toggle = !toggle;
            }
        }
    }
}

new Fight().fight(fighter, improvedFighter, 4,5,5,3,2,7);
