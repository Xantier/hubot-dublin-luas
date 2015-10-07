# A Hubot script for Dublin LUAS

### Install
add `hubot-dublin-luas` to your `package.json`
```
"hubot-dublin-luas": "~1.0.0"
```
Add `hubot-dublin-luas` to your `external_scripts.json` and run `npm install`

### Commands

```
hubot luas stations
=> [Shortname (Name, Irish Name)] like: BUS (Bus Áras, Busáras), CON (Connolly, Conghaile), etc. etc. 
```

```
hubot inbound|outbound stopname, e.g. hubot luas inbound tallaght (short name, name or irish name should all work)
=> Next Two trams inbound at TAL are: 
   To The Point in 7 minutes,To The Point in 15 minutes
```