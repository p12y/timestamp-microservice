# Node.js timestamp microservice

## How to Use

* Pass a string as a parameter, and the API with check to see if it contains either a unix timestamp or a natural language date in any format compliant with RFC-1123 or ISO-8601 (example: January 1, 2016).
* If it does, it returns both the Unix timestamp and the natural language form of that date.
* If it does not contain a date or Unix timestamp, it returns null for those properties.

## Example Usage

* `https://timestamp-node.glitch.me/December%2015,%202015`
* `https://timestamp-node.glitch.me/1450137600`
* `https://timestamp-node.glitch.me/15 dec 15`
* `https://timestamp-node.glitch.me/dec 15, 15`
* `https://timestamp-node.glitch.me/12-15-15`
* `https://timestamp-node.glitch.me/12/15/2015`


## Example Output

* `{"unix":1450137600,"natural":"Tue Dec 15 2015"}`