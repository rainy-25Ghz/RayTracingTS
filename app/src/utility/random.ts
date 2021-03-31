
//Math.RANDOM从0（包括0）往上，但是不包括1（排除1）
export function random(min:number,max:number):number{
    return Math.random()*(max-min)+min;
}