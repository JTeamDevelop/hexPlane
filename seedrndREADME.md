Script tag usage

<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.0/seedrandom.min.js">
</script>
// Sets Math.random to a PRNG initialized using the given explicit seed.
Math.seedrandom('hello.');
console.log(Math.random());          // Always 0.9282578795792454
console.log(Math.random());          // Always 0.3752569768646784

// Sets Math.random to an ARC4-based PRNG that is autoseeded using the
// current time, dom state, and other accumulated local entropy.
// The generated seed string is returned.
Math.seedrandom();
console.log(Math.random());          // Reasonably unpredictable.

// Seeds using the given explicit seed mixed with accumulated entropy.
Math.seedrandom('added entropy.', { entropy: true });
console.log(Math.random());          // As unpredictable as added entropy.

// Use "new" to create a local prng without altering Math.random.
var myrng = new Math.seedrandom('hello.');
console.log(myrng());                // Always 0.9282578795792454

// Use "quick" to get only 32 bits of randomness in a float.
console.log(myrng.quick());          // Always 0.3752569768112153

// Use "int32" to get a 32 bit (signed) integer
console.log(myrng.int32());          // Always 986220731
Other Fast PRNG Algorithms

The package includes some other fast PRNGs. To use Richard Brent's xorgens-4096 PRNG:

<script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.0/lib/xor4096.min.js">
</script>
// Use xor4096 for Richard Brent's xorgens-4096 algorithm.
var xorgen = new xor4096('hello.');