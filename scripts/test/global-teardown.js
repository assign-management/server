/**
 * currently there is an issue to work with jest global setup feature and import ts module
 * into to it the next lines of compile the ts code of the external packages and disable ts validation.
 */
require('ts-node').register({ transpileOnly: true });
module.exports = async () => require('../../src/test/global-teardown').default();
