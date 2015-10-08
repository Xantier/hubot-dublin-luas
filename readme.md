# A Hubot script for Dublin LUAS

### Install
Add `hubot-dublin-luas` to your `package.json`
```
"hubot-dublin-luas": "~1.1.0"
```
Add `lodash` and `xml2json` to your `package.json`

Add `hubot-dublin-luas` to your `external_scripts.json` and run `npm install`

### Commands

```
hubot luas stations
response is in form Shortname (Name, Irish Name) 
=> BUS (Bus Áras, Busáras), CON (Connolly, Conghaile), etc. etc. 
```

```
hubot inbound|outbound stopname
e.g. hubot luas inbound tallaght (short name, name or irish name should all work)
=> Next Two trams inbound at TAL are: 
   To The Point in 7 minutes,To The Point in 15 minutes
```
