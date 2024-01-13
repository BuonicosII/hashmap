import { HashMap } from "./hashmap.js"

const someHashMap = new HashMap();

someHashMap.set("Name", "Enrico");

someHashMap.set("Name", "Viola")

console.log(someHashMap.buckets)