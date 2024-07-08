# Fee Calculator

A Node.js application to calculate transaction fees based on user transactions. The application supports cash-in and cash-out transactions, applying different commission fees for each type. The supported currency is EUR.

## Overview

This application processes a list of transactions and calculates the corresponding fees for each transaction. It supports cash-in and cash-out operations and applies different commission fees for different user types and transaction types.

## Installation

Include instructions on how to install and set up the project. List any dependencies or prerequisites that need to be installed.

1. Install node.js (version >= 11.14.0)
2. Clone the repository
3. cd fee-calculator
4. run `npm install`

## Usage

The application processes transactions from a JSON file from provided url. To run the application, use the following command:
`node app.js path_to_your_input.json`

## Testin

To test

## Configuration

The application uses a configuration file to manage API endpoints, supported currencies and string messages.
`config/config.js`

## Code Style

This project uses ESLint with the Airbnb style guide and Prettier for code formatting. Make sure your code follows these guidelines by running:
`npm run lint`

## Testing

The project uses Jest for testing. Tests are located in the tests/ directory. To run the tests, use the following command:
`npm test`
