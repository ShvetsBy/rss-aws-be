"use strict";

module.exports.getProductById = async (event) => {
  const products = [
    {
      img: "./assets/keebs/keychron-k4.jpeg",
      description: "Normal profile wireless mechanical keyboard",
      price: 127,
      title: "Keychron K4",
      count: 10,
      id: 1,
    },
    {
      img: "./assets/keebs/nuphy-air75.png",
      description: "Low profile wireless mechanical keyboard",
      price: 99,
      title: "NuPhy Air 75",
      count: 12,
      id: 2,
    },
    {
      img: "./assets/cases/air75-case.png",
      description: "Case and mobile devices carrier",
      price: 20,
      title: "Case for NuPhy Air 75",
      count: 23,
      id: 3,
    },
    {
      img: "./assets/cases/keychron-k4-case.jpeg",
      description: "Case for safe transportation",
      price: 30,
      title: "Case for Keychron K4",
      count: 12,
      id: 4,
    },
    {
      img: "./assets/switches/full-profile-red.png",
      description:
        "Premium smooth and tactile typing experience for Keychrone K4. Normal profile",
      price: 19,
      title: "Gateron Phantom Switch",
      count: 1,
      id: 5,
    },
    {
      img: "./assets/switches/full-profile-light-blue.png",
      description: "Linear and smooth switch for Keychrone K4. Normal profile",
      price: 69,
      title: "Gateron CJ Switch",
      id: 6,
    },
    {
      img: "./assets/switches/full-profile-yellow.png",
      description:
        "Switches with a shorter travel distance of 3.5mm for Keychrone K4. Normal profile",
      price: 75,
      title: "Gateron Yellow Ink V2",
      count: 23,
      id: 7,
    },
    {
      img: "./assets/palm-rests/Keychron-K4-rest-resin.png",
      description: "Perfect for Keychrone K4",
      price: 30,
      title: "Resin palm rest",
      count: 3,
      id: 8,
    },
    {
      img: "./assets/palm-rests/Keychron-K4-rest-wood.jpeg",
      description: "Perfect for Keychrone K4",
      price: 40,
      title: "Wood palm rest",
      count: 5,
      id: 9,
    },
    {
      img: "./assets/palm-rests/nuphy-air75-rest.png",
      description: "Ideal for NuPhy Air 75",
      price: 20,
      title: "Resin palm rest",
      count: 9,
      id: 10,
    },
    {
      img: "./assets/keycaps/keychron-black.jpeg",
      description: "For Keychrone K4",
      price: 45,
      title: "Black PBT Keycaps",
      count: 9,
      id: 11,
    },
    {
      img: "./assets/keycaps/keychron-green-keycaps.jpeg",
      description: "For Keychrone K4",
      price: 50,
      title: "Green PBT Keycaps",
      count: 9,
      id: 12,
    },
    {
      img: "./assets/keycaps/keychron-lambda.jpg",
      description: "For Keychrone K4",
      price: 55,
      title: "Lambda PBT Keycaps",
      count: 9,
      id: 13,
    },
    {
      img: "./assets/keycaps/keychron-mint.jpeg",
      description: "For Keychrone K4",
      price: 45,
      title: "Mint PBT Keycaps",
      count: 9,
      id: 14,
    },
    {
      img: "./assets/keycaps/keychron-warm-gradient-2.jpeg",
      description: "For Keychrone K4",
      price: 35,
      title: "Gradient PBT Keycaps",
      count: 9,
      id: 15,
    },
    {
      img: "./assets/keycaps/keychron-warm-gradient.jpg",
      description: "For Keychrone K4",
      price: 50,
      title: "Purple PBT Keycaps",
      count: 9,
      id: 16,
    },
  ];

  const { id } = event.pathParameters;
  const product = products.find((item) => item.id === parseInt(id));

  console.log("====");
  console.log(product);
  console.log("====");
  //const responceBody = { id: id, name: "peter" };
  // const responceBody = {
  //   img: "./assets/keebs/keychron-k4.jpeg",
  //   description: "Normal profile wireless mechanical keyboard",
  //   price: 127,
  //   title: "Keychron K4",
  //   count: 10,
  //   id: 1,
  // };

  // const responceBody1 = product;

  // console.log(responceBody);
  // console.log("====");
  // console.log(responceBody1);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
