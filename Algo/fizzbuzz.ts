interface Rule {
    divisor :  number,
    output : string,
}

const rules : Rule[] = [
    {
        divisor: 3,
        output: 'Fizz',
    },
    {
        divisor: 5,
        output: 'Buzz',
    }
];

function fizzbuzz(N:number):void {
    for( let i = 1; i <= N; i++ ) {
        let output:string = '';

        for (const rule of rules) {
            if (i % rule.divisor === 0) {
                output += rule.output;
            }
        }
        
        console.log(output !== '' ? output : i)
    }
}

fizzbuzz(20)