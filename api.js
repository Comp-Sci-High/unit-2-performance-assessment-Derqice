const env = require('dotenv').config({ quiet: true });
const prompt = require('prompt-sync')();
const apiKey = process.env.apiKey2

let question= prompt("Hello please enter your book search:")
let limit= prompt("How many results do you want:")
let info= prompt(  "Available fields:\n\n" +
  "key, redirects, title, subtitle, alternative_title, alternative_subtitle,\n" +
  "ebook_access, edition_count, edition_key, format, by_statement,\n" +
  "publish_date, contributor, publish_place, publisher, first_sentence,\n" +
  "author_name, author_alternative_name, subject\n" +
  "has_fulltext, title_suggest, publish_year, language, number_of_pages_median,\n" +
  "publisher_facet, author_facet, first_publish_year, ratings_count,\n" +
  "readinglog_count, want_to_read_count, currently_reading_count, already_read_count\n\n" +
  "What information do you want to show (comma-separated): ")
let requestURL="https://openlibrary.org/search.json?q="+question+"&limit="+limit+"&fields="+info
async function findBooks(url){
let response= await fetch(url)
let data= await response.json()
console.log(data.docs)
}
findBooks(requestURL)
// run your code with node api.js
// add your apiKey to .env if your API needs one, otherwise ignore
// Follow the checklist on the Performance Assessment Google Doc