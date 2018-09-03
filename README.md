# Netlify Build Badges [![netlify build status](https://badges.netlify.com/api/badges.svg?branch=master)](https://app.netlify.com/sites/badges/deploys)

## usage

replace **"site-name"** with your netlify site name or domain.

#### Image URL:

```
https://badges.netlify.com/api/site-name.svg?branch=master
```

#### Markdown:

```markdown
[![Build Status](https://badges.netlify.com/api/site-name.svg?branch=master)](https://app.netlify.com/sites/site-name/deploys)
```


## troubleshooting

note that the website deploy logs **must** be [public](https://www.netlify.com/blog/2017/10/31/introducing-public-deploy-logs-for-open-source-sites/). otherwise the badge it will be stuck in "unknown" mode.

the server reads (via [public api](https://open-api.netlify.com/)) the last build of the requested branch (default: `master`).


## disclaimer
this is a **unofficial** project. it's **not** affiliated with [netlify.com](https://netlify.com/)
