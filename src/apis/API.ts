import axios, { AxiosRequestConfig } from "axios";

type AxiosVerb = {
  url: string,
  data: any,
  config: AxiosRequestConfig | undefined
}

const GET = async (args: AxiosVerb) => (
  await axios.get(args.url, args.config)
    .then(response => {
      console.log('GET response', response)
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const POST = async (args: AxiosVerb) => (
  await axios.post(args.url, args.data, args.config)
    .then(response => {
      console.log('POST response', response)
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const PATCH = async (args: AxiosVerb) => (
  await axios.post(args.url, args.data, args.config)
    .then(response => {
      console.log('PATCH response', response)
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const DELETE = async (args: AxiosVerb) => (
  await axios.delete(args.url, args.config)
    .then(response => {
      console.log('DELETE response', response)
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

export {GET, POST, PATCH, DELETE}