import axios, { AxiosRequestConfig } from "axios";
import { Type } from "typescript";

type AxiosVerb = {
  url: string,
  data: Type,
  config: AxiosRequestConfig | undefined
}

const GET = async (args: AxiosVerb) => (
  await axios.get(args.url, args.config)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const POST = async (args: AxiosVerb) => (
  await axios.post(args.url, args.data, args.config)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const PATCH = async (args: AxiosVerb) => (
  await axios.post(args.url, args.data, args.config)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

const DELETE = async (args: AxiosVerb) => (
  await axios.get(args.url, args.config)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
)

export {GET, POST, PATCH, DELETE}