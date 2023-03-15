import axios, { AxiosRequestConfig } from "axios";

type AxiosVerb = {
  url: string,
  data: any,
  config: AxiosRequestConfig | undefined
}

const GET = async (args: AxiosVerb) : Promise<any> => (
  await axios.get(args.url, args.config)
    .then(response => {
      console.log('GET response', response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
)

const POST = async (args: AxiosVerb) : Promise<any> => (
  await axios.post(args.url, args.data, args.config)
    .then(response => {
      console.log('POST response', response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
)

const PATCH = async (args: AxiosVerb) : Promise<any> => (
  await axios.patch(args.url, args.data, args.config)
    .then(response => {
      console.log('PATCH response', response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
)

const DELETE = async (args: AxiosVerb) : Promise<any> => (
  await axios.delete(args.url, { data: args.data })
    .then(response => {
      console.log('DELETE response', response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
)

export {GET, POST, PATCH, DELETE}