import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    summary: { type: 'string', required: true },
    images: { type: 'list', of: { type: 'string' }, default: [] },
    published: { type: 'boolean', default: false },
  },
  computedFields: {
    readingTime: {
      type: 'number',
      resolve: (doc) => Math.ceil(readingTime(doc.body.raw).minutes),
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'src/content/blog',
  documentTypes: [Blog],
  disableImportAliasWarning: true,
})
