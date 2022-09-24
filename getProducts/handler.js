"use strict";

module.exports.getProducts = async (event) => {
  const products = [
    {
      img: "./assets/keebs/keychron-k4.jpeg",
      description: "Normal profile wireless mechanical keyboard",
      price: 127,
      title: "Keychron K4",
      count: 10,
    },
    {
      img: "./assets/keebs/nuphy-air75.png",
      description: "Low profile wireless mechanical keyboard",
      price: 99,
      title: "NuPhy Air 75",
      count: 12,
    },
    {
      img: "./assets/cases/air75-case.png",
      description: "Case and mobile devices carrier",
      price: 20,
      title: "Case for NuPhy Air 75",
      count: 23,
    },
    {
      img: "./assets/cases/keychron-k4-case.jpeg",
      description: "Case for safe transportation",
      price: 30,
      title: "Case for Keychron K4",
      count: 12,
    },
    {
      img: "./assets/switches/full-profile-red.png",
      description:
        "Premium smooth and tactile typing experience for Keychrone K4. Normal profile",
      price: 19,
      title: "Gateron Phantom Switch",
      count: 1,
    },
    {
      img: "./assets/switches/full-profile-light-blue.png",
      description: "Linear and smooth switch for Keychrone K4. Normal profile",
      price: 69,
      title: "Gateron CJ Switch",
      count: 15,
    },
    {
      img: "./assets/switches/full-profile-yellow.png",
      description:
        "Switches with a shorter travel distance of 3.5mm for Keychrone K4. Normal profile",
      price: 75,
      title: "Gateron Yellow Ink V2",
      count: 23,
    },
    {
      img: "./assets/palm-rests/Keychron-K4-rest-resin.png",
      description: "Perfect for Keychrone K4",
      price: 30,
      title: "Resin palm rest",
      count: 3,
    },
    {
      img: "./assets/palm-rests/Keychron-K4-rest-wood.jpeg",
      description: "Perfect for Keychrone K4",
      price: 40,
      title: "Wood palm rest",
      count: 5,
    },
    {
      img: "./assets/palm-rests/nuphy-air75-rest.png",
      description: "Ideal for NuPhy Air 75",
      price: 20,
      title: "Resin palm rest",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-black.jpeg",
      description: "For Keychrone K4",
      price: 45,
      title: "Black PBT Keycaps",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-green-keycaps.jpeg",
      description: "For Keychrone K4",
      price: 50,
      title: "Green PBT Keycaps",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-lambda.jpg",
      description: "For Keychrone K4",
      price: 55,
      title: "Lambda PBT Keycaps",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-mint.jpeg",
      description: "For Keychrone K4",
      price: 45,
      title: "Mint PBT Keycaps",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-warm-gradient-2.jpeg",
      description: "For Keychrone K4",
      price: 35,
      title: "Gradient PBT Keycaps",
      count: 9,
    },
    {
      img: "./assets/keycaps/keychron-warm-gradient.jpg",
      description: "For Keychrone K4",
      price: 50,
      title: "Purple PBT Keycaps",
      count: 9,
    },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
