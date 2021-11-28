require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "h6bAt3bf04mlJXHX9WbafqyG3ZUoXpo5";

const ROPSTEN_PRIVATE_KEY = "f8b304a7ecb5b77770a323f14d7718fbb58195b8de6b7f4f6e0bbea533baed90";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
