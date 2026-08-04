const ketchup = require("@/assets/images/badges/ketchupq.png");
const mustard = require("@/assets/images/badges/mustard.png");
const relish = require("@/assets/images/badges/relish.png");
const onion = require("@/assets/images/badges/onion.png");
const chili = require("@/assets/images/badges/chili.png");
const jalapeno = require("@/assets/images/badges/jalapeno.jpg");


export const achievements = [
  {
    id: "ketchup",
    name: "Ketchup",
    description: "Complete your first landmark",
    threshold: 1,
    icon: ketchup,
  },
  {
    id: "mustard",
    name: "Mustard",
    description: "Complete 5 landmarks",
    threshold: 5,
    icon: mustard,
  },
  {
    id: "relish",
    name: "Relish",
    description: "Complete 10 landmarks",
    threshold: 10,
    icon: relish,
  },
  {
    id: "onion",
    name: "Onion",
    description: "Complete 20 landmarks",
    threshold: 20,
    icon: onion,
  },
  {
    id: "chili",
    name: "Chili",
    description: "Complete 30 landmarks",
    threshold: 30,
    icon: chili,
  },
  {
    id: "jalapeno",
    name: "Jalapeno",
    description: "Complete 40 landmarks",
    threshold: 40,
    icon: jalapeno,
  },
];
