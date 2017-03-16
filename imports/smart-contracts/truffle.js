module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    jailbreakDev: {
      host: "localhost",
      port: 8545,
      network_id: 1900,
      from: "0xec5a0b5df7cc24cf669673794cbba1599c7107b4",
      gas: 3000000,
    },
    ethHarmony: {
      host: "localhost",
      port:8080,
      network_id: 1900,
      from: "0xD7D66d93688C9b67107A4A563EddC2D8AE133163",
      gas: 3000000,
    }
  }
};
