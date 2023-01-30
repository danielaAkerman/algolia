import algoliasearch from "algoliasearch";

const client = algoliasearch("EQY57XWFY4", "f67f9281af9a274df5bc9f58c60fcfc8");
const index = client.initIndex("products");

export { index };
