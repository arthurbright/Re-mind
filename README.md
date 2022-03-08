# Re:mind
Your friendly neighborhood reminder bot; set reminders and recieve pings whenever you want.

## Commands
All commands must be executed in a Direct Message channel with Re:mind.
List of all commands:

`get`: view a list of all reminders that have been set

`delete n`: delete the $n^{th}$ reminder on the list provided by `get`

`set NAME [time]`: set a reminder with name `NAME` to ping in a set amount of time. `NAME` cannot contain spaces.
Example: `set getlaundry 1 hour 3 mins`

`set NAME [time] r [time2]`: set a reminder with name `NAME` to ping in a set amount of time and repeat every `time2`. `NAME` cannot contain spaces.
Example: `set WORKOUT 5 mins r 2 days`

## Time Specification
Times can be specified as pairs `number, unit`, where `unit` is in minutes, hours, or days. For example: `5 mins`
Re:mind is very flexible in reading units. For example, "m", "min", "mins", "minutes", "minute" will all be recognized)!

You can also chain together pairs to form more precise times. For example, the following are all valid time specifications:

 - `5 mins 2 hours`
 - `2 hour 5 min`
 - `5 days 4 hours 2 mins`
 - `1 hours 9 mins 8 days`
 - `10 mins 10 mins`  (will count as 20 minutes)
