var rules = [
    {
        divisor: 3,
        output: 'Fizz',
    },
    {
        divisor: 5,
        output: 'Buzz',
    }
];
function fizzbuzz(N) {
    for (var i = 1; i <= N; i++) {
        var output = '';
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (i % rule.divisor === 0) {
                output += rule.output;
            }
        }
        console.log(output !== '' ? output : i);
    }
}
fizzbuzz(20);
