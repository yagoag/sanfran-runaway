<div align="center">
  <img src="https://repository-images.githubusercontent.com/224040734/8973df00-11d5-11ea-8c36-93da73de47af" style="width: 100%; max-width: 640px;">

# San Francisco Runaway

</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/4d79bf52-b817-416b-b72e-a260e3040a7d/deploy-status)](https://app.netlify.com/sites/sanfranrunaway/deploys) | [Informações em Português](/README.pt-BR.md)

You are in San Francisco, the city with the highest number of hipsters per square feet in the world, and everyone knows that hipsters love nothing more than a good ol' cup of coffee.

To win this game, you must find five locations of the famous "Star Café" without running over the hipsters holding cups of the store in their hands.

Play it right now at https://sanfranrunaway.netlify.com

## Run locally

To run the game locally in development mode, just clone the repository and run `yarn start`

You can also use `npm`, just make sure to delete your `yarn.lock` file, otherwise you might have some complaining.

## Testing

To run all test in watch mode (they will re-run on every change), you can run `yarn test`.

## Building

To run a local production build you can run `yarn deploy`. It runs all tests and builds the application if they pass. If you want to skip the tests, you can run `yarn build` directly.

The app also has automated build & deployment using Netlify. It runs on every commit that is pushed to `master`.

To check the deployments, [click here](https://app.netlify.com/sites/sanfranrunaway/deploys) or on the build status badge at the top of this Readme.
