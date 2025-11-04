import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { dataset, projectId, studioBasePath } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  basePath: studioBasePath,
  name: 'neuland_cms',
  title: 'neuland.academy Content',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool()],
})
