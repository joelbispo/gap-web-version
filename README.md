# GAP

Game of Altruistic Punishment: This software was developed to be used during experiments of  Altruistic Punishment by researchers.  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have node installed on your local machine
```
Node v8.11.4

```

### Installing

You need to install the dependencies

```
npm install
```

### Serve with hot reload at localhost:9080

```
npm run dev
```

### build electron application for production
```
npm run build
```

# lint all JS/Vue component files in `src/`

```
npm run lint
```
<aside class="notice">
if you get the error:  Uncaught Error: Failed to load gRPC binary module because it was not installed for the current system

just run:
``` bash
npm rebuild --runtime=electron --target=1.8.4 --disturl=https://atom.io/download/electron

```
</aside>



## Built With

* [electron-vue] - (This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[dab4535](https://github.com/SimulatedGREG/electron-vue/tree/dab4535ddea5bb2f8cb754c117d75cc1af2d1f5b) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


## Authors

* **Joel Bispo Negrão** - *Initial work* - [PurpleBooth](https://github.com/joelbisponeto)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Maressa Braga Bispo
