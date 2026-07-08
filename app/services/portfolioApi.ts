import portfolioData from './Portfolio_data.json';

const SIMULATED_DELAY = 800;

export async function getPortfolioData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(portfolioData);
    }, SIMULATED_DELAY);
  });
}