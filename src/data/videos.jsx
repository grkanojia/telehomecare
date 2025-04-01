// Retrieve the CloudFront domain from the environment variable
const cloudfrontDomain = process.env.REACT_APP_CLOUDFRONT_DOMAIN;

// Define your videos array with URLs constructed using the CloudFront domain
const videos = [
  {
    id: 1,
    title: "Day-to-Day Care for Diabetes",
    description: "Practical tips for managing diabetes care at home.",
    thumbnail: `${cloudfrontDomain}/thumbnails/diabetes.jpeg`,
    videoUrl: `${cloudfrontDomain}/videos/diabetes.mp4`,
  },
  {
    id: 2,
    title: "Diabetes Meal Planning",
    description: "Guide to planning healthy meals for diabetic patients.",
    thumbnail: `${cloudfrontDomain}/thumbnails/meal_planning.jpeg`,
    videoUrl: `${cloudfrontDomain}/videos/meal_planning.mp4`,
  },
  {
    id: 3,
    title: "Monitoring Blood Sugar Levels",
    description:
      "Step-by-step instructions to monitor blood sugar levels effectively.",
    thumbnail: `${cloudfrontDomain}/thumbnails/blood_sugar.jpeg`,
    videoUrl: `${cloudfrontDomain}/videos/How to test your blood glucose (sugar) levels.mp4`,
  },
  // Add more video objects as needed
];

export default videos;
