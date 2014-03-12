scheduledata = {}

allClasses = {
  "Spring 2014": {
    "CIS": {},
    "MAT": {
      '531': {
        "name":"MAT531",
        "number":531,
        "semester": "Spring 2014",
        "title":"2nd Course in Linear Algebra",
        "description":"an intro class on prog languages",
        "days":"TuTh",
        "loc":"Carnegie 110",
        "start":"2014-03-10T14:00:00",
        "end":"2014-03-10T15:20:00" },
    },
  },
  "Fall 2014": {
    "CIS": {
      "351": {
        "name":"CIS351",
        "number":351,
        "semester": "Fall 2014",
        "title":"Programming Language Theory",
        "description":"an intro class on prog languages",
        "days":"MoWe",
        "loc":"CST 1-231",
        "start":"2014-03-10T09:30:00",
        "end":"2014-03-10T12:00:00" },
      "453": {
        "name":"CIS453",
        "number":453,
        "semester": "Fall 2014",
        "title":"Software Spec and Design",
        "description":"part one of junior design semest",
        "days":"MoWe",
        "loc":"CST 1-231",
        "start":"2014-03-10T12:30:00",
        "end":"2014-03-10T14:00:00" },
    },
    "ECS": {
      "100": { "num":100 },
      "101": { "num":101 },
      "102": { "num":102 },
    },
    "MAT": {},
  }
}

scheduledata.getClasses = function() {
  return allClasses;
}

scheduledata.getClass = function(semester, name, number){
  course = allClasses[semester][name][number];
  return course;
}

