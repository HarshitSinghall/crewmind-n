# Verification

Run npm run typecheck and npm test for the retained source, rendering, image semantics, and filesystem helpers. Historical recruitment/catalog tests are archived outside the repository because that product is not shipped.

Run npm run build followed by npm run audit to validate all five public routes, the branded 404, anchors, local assets/CSS dependencies, disabled forms, robots restrictions, and absence of retired public output. npm run test:e2e covers responsive layouts, image decoding, navigation, menus, carousel, accordion, overflow, reduced motion, and closed requests. npm run test:visual captures five pages at four widths; screenshots do not prove exact animated fidelity.

The cleanup archive stores a SHA-256 baseline of production files before pruning. Compare the new build against that baseline, excluding the time-varying build-report.json, to prove the visitor assets are unchanged. It is local cleanup evidence and is not required for future builds.
