var patterns = {
  "alpha":"[a-zA-Z]",
  "alpha_num":"[a-zA-Z0-9]",
  "alpha_dash":"[a-zA-Z\-]",
  "email":"^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$",
  "url":"^https?:\/\/\S+",
  "numeric":"[0-9]",
}

module.exports = patterns;
