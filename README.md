# offline mode for Providence

## Introduction

This is a simple offline mode for Providence. It is designed to be used in a degraded situation where the main server is out of reach (no internet or server down). It is not a full replacement for the main server, but it should allow users to continue to use the system in a limited capacity.

## Features

- **Offline mode**: The system can be used without an internet connection.
- **Limited functionality**: Not all features are available in offline mode.
- **Data synchronization**: Data is synchronized with the main server when it is available.
- **Data storage**: Data is stored locally on the device.

## Installation

1. Clone the repository.
2. Deploy the dist folder to a web server, in a web root subfolder called "offline".
3. Deploy the offline widget to the CA Providence installation, where Providence is in a subfolder called "providence" or "gestion". The widget should be deployed in the "app/widgets" folder.
4. Deploy the offline plugin to the CA Providence installation, where Providence is in a subfolder called "providence" or "gestion". The plugin should be deployed in the "app/plugins" folder.

