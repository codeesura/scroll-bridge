<p align="center">
<a href=https://github.com/codeesura/scroll-bridge target="_blank">
<img src='https://github.com/codeesura/scroll-bridge/assets/120671243/2bd4c135-84cc-4e84-aa4e-413f3d3acde4' width="70%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/code-size/codeesura/scroll-bridge" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/codeesura/scroll-bridge" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/codeesura/scroll-bridge" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/codeesura/scroll-bridge" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

scroll-bridge is a project that utilizes essential dependencies like dotenv, bun-types, and ethers to create a seamless scrolling experience.

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [📝 Project Summary](#project-summary)

* [💻 Stack](#stack)

* [⚙️ Setting Up](#setting-up)

* [🚀 Run Locally](#run-locally)

* [🙌 Contributors](#contributors)

* [📄 License](#license)

* [📭 Contact](#contact)

## 📁 Project Structure

```bash
├── .env
├── .gitignore
├── README.md
├── abis
│   ├── BridgeABI.json
│   └── PoolABI.json
├── config
│   └── config.js
├── jsconfig.json
├── package.json
└── src
    ├── helpers
    │   └── contractHelper.js
    └── main.js
```

## 📝 Project Summary

- [**src**](src): Contains the main source code of the JavaScript project.
- [**config**](config): Includes configuration files for the project.
- [**src/helpers**](src/helpers): Contains helper functions to assist in the main functionalities of the project.
- [**abis**](abis): Stores the Application Binary Interface (ABI) files used for interacting with smart contracts.

## 💻 Stack

- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.
- [bun-types](https://www.npmjs.com/package/bun-types): Provides a set of TypeScript type utilities to enhance type safety.
- [ethers](https://www.npmjs.com/package/ethers): A library for interacting with the Ethereum blockchain, including contract interactions and wallet management.

## ⚙️ Setting Up

#### Your Environment Variable

To properly set up the `scroll-bridge` project, follow the steps below:

### Environment Variables

The project uses environment variables to manage and keep sensitive information secure. Ensure you configure these before running the application:

- **Edit your file**: Open `.env` in your preferred editor. You'll notice several environment variables. Fill in the necessary details for each variable. 

Example:
```env
PRIVATE_KEY=your_private_key_here
```

## 🚀 Run Locally
1.Clone the scroll-bridge repository:
```sh
git clone https://github.com/codeesura/scroll-bridge
```
2.Install the dependencies with one of the package managers listed below:
```bash
bun install
```
3.Run:
```bash
bun src/main.js
```

## 🙌 Contributors
<a href="https://github.com/codeesura/scroll-bridge/graphs/contributors">
<img src="https://contrib.rocks/image?repo=codeesura/scroll-bridge" />
</a>


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📭 Contact

If you have any questions about our project, you can reach us at: [codeesura@gmail.com](mailto:codeesura@gmail.com)
