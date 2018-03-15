/* global describe, it, beforeEach */

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); // creates an instance of web3 from Constructor Web3
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi']})
    .send({ from:accounts[0], gas:'1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
