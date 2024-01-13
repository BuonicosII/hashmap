import { HashMap } from "./hashmap.js"

const someHashMap = new HashMap();

someHashMap.set("Name", "Enrico");

someHashMap.set("AnotherName", "Viola")

console.log(someHashMap.buckets, someHashMap.increaseBuckets(), someHashMap.buckets)