type RuntimeEnv = {
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string
  SANITY_STUDIO_PROJECT_ID?: string
  SANITY_PROJECT_ID?: string
  NEXT_PUBLIC_SANITY_DATASET?: string
  SANITY_STUDIO_DATASET?: string
  SANITY_DATASET?: string
  NEXT_PUBLIC_SANITY_API_VERSION?: string
  SANITY_STUDIO_BASEPATH?: string
  NODE_ENV?: string
}

const processEnvAvailable = typeof process !== 'undefined' && typeof process.env !== 'undefined'

const importMetaEnv: RuntimeEnv = (() => {
  if (typeof import.meta !== 'undefined') {
    const meta = import.meta as { env?: RuntimeEnv }
    if (meta.env && typeof meta.env === 'object') {
      return meta.env
    }
  }
  return {}
})()

const coalesce = (...values: Array<string | null | undefined>): string | undefined => {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') {
      return value
    }
  }
  return undefined
}

const NEXT_PUBLIC_SANITY_PROJECT_ID = coalesce(
  processEnvAvailable ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID : undefined,
  importMetaEnv.NEXT_PUBLIC_SANITY_PROJECT_ID
)
const SANITY_STUDIO_PROJECT_ID = coalesce(
  processEnvAvailable ? process.env.SANITY_STUDIO_PROJECT_ID : undefined,
  importMetaEnv.SANITY_STUDIO_PROJECT_ID
)
const SANITY_PROJECT_ID = coalesce(
  processEnvAvailable ? process.env.SANITY_PROJECT_ID : undefined,
  importMetaEnv.SANITY_PROJECT_ID
)

const NEXT_PUBLIC_SANITY_DATASET = coalesce(
  processEnvAvailable ? process.env.NEXT_PUBLIC_SANITY_DATASET : undefined,
  importMetaEnv.NEXT_PUBLIC_SANITY_DATASET
)
const SANITY_STUDIO_DATASET = coalesce(
  processEnvAvailable ? process.env.SANITY_STUDIO_DATASET : undefined,
  importMetaEnv.SANITY_STUDIO_DATASET
)
const SANITY_DATASET = coalesce(
  processEnvAvailable ? process.env.SANITY_DATASET : undefined,
  importMetaEnv.SANITY_DATASET
)

const NEXT_PUBLIC_SANITY_API_VERSION = coalesce(
  processEnvAvailable ? process.env.NEXT_PUBLIC_SANITY_API_VERSION : undefined,
  importMetaEnv.NEXT_PUBLIC_SANITY_API_VERSION
)
const SANITY_STUDIO_BASEPATH = coalesce(
  processEnvAvailable ? process.env.SANITY_STUDIO_BASEPATH : undefined,
  importMetaEnv.SANITY_STUDIO_BASEPATH
)
const NODE_ENV = coalesce(processEnvAvailable ? process.env.NODE_ENV : undefined, importMetaEnv.NODE_ENV)

const requireEnv = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const projectId = requireEnv(
  'SANITY_PROJECT_ID',
  coalesce(NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_STUDIO_PROJECT_ID, SANITY_PROJECT_ID)
)

export const dataset = requireEnv(
  'SANITY_DATASET',
  coalesce(NEXT_PUBLIC_SANITY_DATASET, SANITY_STUDIO_DATASET, SANITY_DATASET)
)

export const apiVersion = NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-05-01'

export const studioBasePath = SANITY_STUDIO_BASEPATH ?? '/studio'

export const useCdn = (NODE_ENV ?? 'development') === 'production'
