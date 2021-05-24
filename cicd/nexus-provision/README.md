# Nexus Provision

- [System Dependencies](#system-dependencies)
  - [Required](#required)
- [Usage](#usage)
  - [`ci`](#ci)
  - [`envfile`](#envfile)
  - [`build`](#build)
  - [`test`](#test)

## System Dependencies

### Required
* [Docker](https://www.docker.com/products/docker-desktop)
* [Compose](https://docs.docker.com/compose/install)
* [make](https://www.gnu.org/software/make)

## Usage

All targets expect the `.env` file at the root of the mono repo, run `$ make envfile` to generate one from `env.example`

### `ci`

`$ make ci`

### `envfile`

`$ make envfile`

### `build`

`$ make build`

### `test`

`$ make test`
